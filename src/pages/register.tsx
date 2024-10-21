import { Button, Form, Input, message } from "antd";
import { useMutation } from "react-query";
import bgLogin from "@/app/public/bg-login.png";
import { registerApi, RegisterInput } from "@/apis/register.api";
import { useRouter } from "next/router";
import { useState } from "react";
import EmailConfirmationStatus from "@/components/EmailConfirmationStatus";

export default function Register() {
  const [form] = Form.useForm();
  const router = useRouter();
  const [isRegistrationComplete, setIsRegistrationComplete] = useState(false);

  const { mutate, isLoading } = useMutation({
    mutationFn: registerApi,
    onSuccess: (response) => {
      console.log("🚀 ~ response:", response);
      const email = response.data.email;
      localStorage.setItem("registeredEmail", email);
      setIsRegistrationComplete(true);
      router.push("/register-confirmation");
    },
    onError: () => {
      message.error("Đăng ký thất bại");
    },
  });

  const onFinish = (values: RegisterInput) => {
    mutate(values);
  };

  if (isRegistrationComplete) {
    return (
      <EmailConfirmationStatus
        isLoading={false}
        isConfirmed={false}
        isRegistrationComplete={true}
      />
    );
  }

  return (
    <div
      style={{
        backgroundImage: `url(${bgLogin.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          maxWidth: 400,
          width: "100%",
          margin: "100px auto",
          color: "whitesmoke",
          backgroundColor: "rgba(0, 0, 0, 0.147)",
          padding: 20,
          borderRadius: 10,
        }}
      >
        <h1>Đăng ký</h1>
        <Form form={form} size="large" onFinish={onFinish} layout="vertical">
          <Form.Item
            name="email"
            label={<span style={{ color: "white" }}>Email</span>}
            rules={[
              { required: true, message: "Vui lòng nhập Email" },
              {
                pattern:
                  /^[a-zA-Z0-9._%+-]+@(?!-)[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/,
                message: "Email không đúng định dạng",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="name"
            label={<span style={{ color: "white" }}>Tên</span>}
            rules={[{ required: true, message: "Vui lòng nhập tên" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label={<span style={{ color: "white" }}>Mật khẩu</span>}
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu" },
              {
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/,
                message:
                  "Mật khẩu phải có ít nhất 7 ký tự, bao gồm chữ cái, số và ký tự đặc biệt",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="link" onClick={() => router.push("/login")}>
              Đăng nhập
            </Button>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isLoading} block>
              Đăng ký
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
