import { resendConfirmationLinkApi } from "@/apis/resendLink.apit";
import { Button, message } from "antd";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";

interface ResendConfirmEmailButtonProps {
  email: string;
  onEmailResent: () => void;
  initialCooldownTime: number;
}

export default function ResendConfirmEmailButton({
  email,
  onEmailResent,
  initialCooldownTime,
}: ResendConfirmEmailButtonProps) {
  const [cooldownTime, setCooldownTime] = useState(0);
  const { mutate, isLoading } = useMutation(
    () => resendConfirmationLinkApi(email),
    {
      onSuccess: (data) => {
        message.success(
          data.data.message || "Gửi lại email xác nhận thành công"
        );
        onEmailResent();
        setCooldownTime(initialCooldownTime);
      },
      onError: (error: any) => {
        if (error.response?.status === 400) {
          message.error(
            error.response.data.message || "Email đã được xác nhận"
          );
        } else {
          message.error("Có lỗi xảy ra khi gửi lại email xác nhận");
        }
      },
    }
  );

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (cooldownTime > 0) {
      timer = setInterval(() => {
        setCooldownTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [cooldownTime]);

  const onFinish = () => {
    mutate();
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={onFinish}
        loading={isLoading}
        block
        disabled={cooldownTime > 0}
      >
        {cooldownTime > 0
          ? `Gửi lại sau ${cooldownTime}s`
          : "Gửi lại email xác nhận"}
      </Button>
    </div>
  );
}
