import styled from "styled-components";

import { Form } from "../../molecules/Form";
import { Label } from "../../atoms/Label";
import { Input } from "../../atoms/Input";

const StyledWrapper = styled.div`
  display: flex;
`;

export default function SignUp() {
  return (
    <StyledWrapper>
      <h1>Sign up</h1>
      <Form>
        <Label>Email</Label>
        <Input type="text" />
        <Label>Password</Label>
        <Input type="text" />
      </Form>
    </StyledWrapper>
  );
}
