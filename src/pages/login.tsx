import { loginApi, LoginInput } from "@/apis/login.api";
import GoogleButton from "@/components/GoogleButton";
import { User } from "@/models/user.model";
import { Button, Form, Input, message } from "antd";
import { AxiosResponse } from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import bgLogin from "@/app/public/bg-login.png";

export default function Login() {
  const [form] = Form.useForm();
  const { replace } = useRouter();

  const { mutate, isLoading } = useMutation({
    mutationFn: loginApi,
    onSuccess: (success: AxiosResponse<User>) => {
      console.log("🚀 ~ success:", success);
      message.success("Đăng nhập thành công");
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
          maxWidth: 300,
          margin: "100px auto",
          color: "whitesmoke",
          backgroundColor: "rgba(0, 0, 0, 0.147)",
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
              { required: true, message: "Vui lòng nhập Email đăng nhập" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label={<span style={{ color: "white" }}>Mật khẩu</span>}
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
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
