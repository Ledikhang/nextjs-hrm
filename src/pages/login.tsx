import { loginApi, LoginInput } from "@/apis/login.api";
import GoogleButton from "@/components/GoogleButton";
import { User } from "@/models/user.model";
import { Button, Form, Input, message } from "antd";
import { AxiosResponse } from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";
import bgLogin from "@/app/public/bg-login.png";

export default function Login() {
  const [form] = Form.useForm();
  const { replace } = useRouter();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: loginApi,
    onSuccess: (success: AxiosResponse<User>) => {
      message.success("Đăng nhập thành công");
      queryClient.setQueryData("authentication", success);
      replace("/");
    },
    onError: () => {
      message.error("Đăng nhập thất bại");
    },
  });

  const onFinish = (values: LoginInput) => {
    mutate(values);
  };

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
          backgroundColor: "rgba(37, 41, 123, 0.147)",
          padding: 20,
          borderRadius: 10,
        }}
      >
        <h1>Đăng nhập</h1>
        <Form form={form} size="large" onFinish={onFinish} layout="vertical">
          <Form.Item
            name="email"
            label={<span style={{ color: "white" }}>Email đăng nhập</span>}
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
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Link href="/register">Đăng ký</Link>
              <Link href="/forgot-password">Quên mật khẩu?</Link>
            </div>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isLoading} block>
              Đăng nhập
            </Button>
          </Form.Item>
          <Form.Item>
            <GoogleButton />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
