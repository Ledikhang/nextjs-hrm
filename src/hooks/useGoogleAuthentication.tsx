import { useCallback } from "react";
import axios from "@/axios";
import { TokenResponse } from "@react-oauth/google";
import { useRouter } from "next/router";

function useGoogleAuthentication() {
  const router = useRouter();
  const handleSuccess = useCallback(async (tokenResponse: TokenResponse) => {
    try {
      await axios.post("/google-authentication", {
        token: tokenResponse.access_token,
      });
      router.push("/");
    } catch (error) {
      console.error("Google authentication failed:", error);
    }
  }, []);

  return {
    handleSuccess,
  };
}

export default useGoogleAuthentication;
