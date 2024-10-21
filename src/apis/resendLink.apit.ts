import axios from "@/axios";

export async function resendConfirmationLinkApi(email: string) {
  return axios.post("/email/resend-confirmation-link", { email });
}
