interface FormErrorProps {
  message?: string;
}
export const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;
  return <p className="text-red-500 mt-3">{message}</p>;
};
