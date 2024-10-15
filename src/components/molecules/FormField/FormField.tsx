import { UseFormRegisterReturn } from "react-hook-form";
import styled from "styled-components";
import { ErrorText } from "../../atoms/ErrorText";
import { Input } from "../../atoms/Input";
import { Label } from "../../atoms/Label";
import { mediaQueries } from "../../../theme/mediaQueries";

const StyledFormField = styled.div`
  display: flex;
  flex-direction: column;

  ${mediaQueries.xs} {
    display: flex;
    flex-direction: row;
  }
`;

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
      <StyledFormField>
        <Label>{label}</Label>
        <Input type={type} {...register} />
      </StyledFormField>
      {error && <ErrorText>{error}</ErrorText>}
    </>
  );
}
