import { Label } from "../../atoms/Label";
import { Input } from "../../atoms/Input";
import { ErrorText } from "../../atoms/ErrorText";
import { UseFormRegisterReturn } from "react-hook-form";

interface FormFieldProps {
  label: string;
  register: UseFormRegisterReturn;
  error?: string;
  type?: string;
}

export default function FormField({
  label,
  register,
  error,
  type,
}: FormFieldProps) {
  return (
    <>
      <div>
        <Label>{label}</Label>
        <Input type={type} {...register} />
      </div>
      {error && <ErrorText>{error}</ErrorText>}
    </>
  );
}
