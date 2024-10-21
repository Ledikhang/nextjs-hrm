import { Button, Typography, Spin } from "antd";
import { useRouter } from "next/router";
import ResendConfirmEmailButton from "./ResendConfirmEmailButton";

const { Title, Paragraph } = Typography;

interface EmailConfirmationStatusProps {
  isLoading: boolean;
  isConfirmed: boolean;
  isRegistrationComplete: boolean;
  email?: string;
  isEmailResent: boolean;
  onEmailResent: () => void;
}

export default function EmailConfirmationStatus({
  isLoading,
  isConfirmed,
  isRegistrationComplete,
  email,
  isEmailResent,
  onEmailResent,
}: EmailConfirmationStatusProps) {
  const router = useRouter();

  if (isLoading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "100px auto",
        textAlign: "center",
        color: "whitesmoke",
        backgroundColor: "rgba(37, 41, 123, 0.147)",
        padding: 20,
        borderRadius: 10,
      }}
    >
      <Title level={2}>
        {isRegistrationComplete
          ? "Xác thực tài khoản!"
          : isConfirmed
          ? "Xác nhận email thành công!"
          : isEmailResent
          ? "Email xác nhận đã được gửi lại!"
          : "Xác nhận email thất bại"}
      </Title>
      <Paragraph>
        {isRegistrationComplete ? (
          <div>
            <>
              <h4>
                Chúng tôi đã gửi một email xác nhận đến địa chỉ email của bạn.
              </h4>
              <br />
              Nếu bạn không nhận được email trong vòng vài phút, hãy kiểm tra
              thư mục spam hoặc liên hệ với chúng tôi để được hỗ trợ.
            </>
          </div>
        ) : isConfirmed ? (
          "Tài khoản của bạn đã được xác nhận. Bạn có thể đăng nhập ngay bây giờ."
        ) : isEmailResent ? (
          <>
            <p>
              Email xác nhận đã được gửi lại thành công. Vui lòng kiểm tra hộp
              thư của bạn và làm theo hướng dẫn trong email.
            </p>
            <p>
              Nếu bạn vẫn không nhận được email, hãy kiểm tra thư mục spam hoặc
              liên hệ với chúng tôi để được hỗ trợ.
            </p>
            {email && (
              <ResendConfirmEmailButton
                email={email}
                onEmailResent={onEmailResent}
                initialCooldownTime={60}
              />
            )}
          </>
        ) : (
          <>
            <p>
              Có lỗi xảy ra trong quá trình xác nhận email. Vui lòng thử lại
              hoặc liên hệ hỗ trợ.
            </p>
            {email && (
              <ResendConfirmEmailButton
                email={email}
                onEmailResent={onEmailResent}
                initialCooldownTime={60}
              />
            )}
          </>
        )}
      </Paragraph>
      <Button type="link" onClick={() => router.push("/login")}>
        Đi đến trang đăng nhập
      </Button>
    </div>
  );
}
