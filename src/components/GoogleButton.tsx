import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import useGoogleAuthentication from "@/hooks/useGoogleAuthentication";
import { Button } from "antd";

function GoogleButton() {
  const { handleSuccess } = useGoogleAuthentication();

  const login = useGoogleLogin({
    onSuccess: handleSuccess,
    onError: () => {
      console.error("Google login failed");
    },
  });

  return (
    <Button
      type="dashed"
      style={{ color: "#a91010" }}
      htmlType="submit"
      onClick={() => login()}
      block
    >
      Đăng nhập với Google
    </Button>
  );
}

export default GoogleButton;
