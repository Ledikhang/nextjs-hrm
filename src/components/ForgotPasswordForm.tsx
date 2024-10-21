import { Button, Form, Input, Result } from "antd";
import { ForgotPasswordInput } from "@/apis/forgotPassword.api";
import { useForgotPassword } from "@/hooks/useForgotPassword";

export default function ForgotPasswordForm() {
  const [form] = Form.useForm();

  const { forgotPassword, isLoading, isSuccess } = useForgotPassword();

  const onFinish = (values: ForgotPasswordInput) => {
    forgotPassword(values);
    form.resetFields();
  };

  if (isSuccess) {
    return (
      <Result
        status="success"
        title="Yêu cầu đặt lại mật khẩu đã được gửi thành công."
        subTitle="Vui lòng kiểm tra email của bạn để được hướng dẫn tiếp theo."
        extra={
          <Button type="primary" href="/login">
            Đi đến trang đăng nhập
          </Button>
        }
      />
    );
  }

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item
        name="email"
        label="Email"
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
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoading} block>
          Reset Password
        </Button>
      </Form.Item>
    </Form>
  );
}
