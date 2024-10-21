import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { message, Spin } from "antd";
import { confirmEmailApi } from "@/apis/authentication.api";
import EmailConfirmationStatus from "@/components/EmailConfirmationStatus";

export default function ConfirmEmail() {
  const router = useRouter();
  const { token } = router.query;
  const [isLoading, setIsLoading] = useState(true);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isEmailResent, setIsEmailResent] = useState(false);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const storedEmail = localStorage.getItem("registeredEmail");

    if (storedEmail) {
      setEmail(storedEmail);
    }

    if (token) {
      confirmEmail(token as string);
    }
  }, [token]);

  const confirmEmail = async (confirmationToken: string) => {
    try {
      await confirmEmailApi(confirmationToken);
      setIsConfirmed(true);
      message.success("Email đã được xác nhận thành công!");
      localStorage.removeItem("registeredEmail");
      setTimeout(() => router.push("/login"), 5000);
    } catch (error: any) {
      console.error("Lỗi xác nhận email:", error);
      if (
        error.response?.status === 400 &&
        error.response.data.message === "Email confirmation token expired"
      ) {
        message.error(
          "Token xác nhận email đã hết hạn. Vui lòng yêu cầu gửi lại email xác nhận."
        );
        setIsEmailResent(true);
      } else {
        message.error("Xác nhận email thất bại. Vui lòng thử lại.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailResent = () => {
    setIsEmailResent(true);
  };

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  return (
    <EmailConfirmationStatus
      isLoading={isLoading}
      isConfirmed={isConfirmed}
      isRegistrationComplete={false}
      email={email || undefined}
      isEmailResent={isEmailResent}
      onEmailResent={handleEmailResent}
    />
  );
}
