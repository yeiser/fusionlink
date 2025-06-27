import Alert from "../ui/alert/Alert";

interface ErrorAlertProps {
  message: string;
  variant?: "success" | "error" | "warning" | "info";
  title?: string;
}

export function ErrorAlert({ message, variant, title }: ErrorAlertProps) {
  if (!message) return null;

  return (
    <Alert
      variant={variant ? variant : "error"}
      title={title ? title : "Error"}
      message={message}
      showLink={false}
    />
  );
}