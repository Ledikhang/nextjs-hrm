import EmailConfirmationStatus from "@/components/EmailConfirmationStatus";

export default function RegisterConfirmation() {
  return (
    <EmailConfirmationStatus
      isLoading={false}
      isConfirmed={false}
      isRegistrationComplete={true}
      isEmailResent={false}
      onEmailResent={() => {}}
    />
  );
}
