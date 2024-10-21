import ForgotPasswordForm from "@/components/ForgotPasswordForm";
import { Typography } from "antd";

const { Title } = Typography;

const ForgotPassword = () => {
  return (
    <div style={{ maxWidth: 500, margin: "200px auto" }}>
      <Title level={2}>Quên mật khẩu</Title>
      <ForgotPasswordForm />
    </div>
  );
};

export default ForgotPassword;
