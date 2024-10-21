import { useRouter } from "next/router";
import { Button, Typography } from "antd";
import ResetPasswordForm from "@/components/ResetPasswordForm";

const { Title } = Typography;

export default function ConfirmEmail() {
  const router = useRouter();
  const { token } = router.query;

  if (!token || typeof token !== "string") {
    return <div>Invalid or missing token</div>;
  }

  return (
    <div style={{ maxWidth: 300, margin: "100px auto" }}>
      <Title level={2}>Reset Password</Title>
      <ResetPasswordForm token={token} />
      <Button type="link" href="/login" block>
        Đăng nhập
      </Button>
    </div>
  );
}
