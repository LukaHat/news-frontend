import styled from "styled-components";
import { themeColors } from "../../../theme/colors";
import { Button } from "../../atoms/Button";
import { appFonts } from "../../../theme/fonts";
import { Form } from "../../molecules/Form";
import { Label } from "../../atoms/Label";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { createPost, updateArticle } from "../../../api/news";
import { ErrorText } from "../../atoms/ErrorText";
import { useModal } from "../../hooks/useModal";
import { useAuth } from "../../hooks/useAuth";
import { FormField } from "../../molecules/FormField";

const StyledEditModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background-color: ${themeColors.secondary.expandedBlack};
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledEditModal = styled.div`
  width: 40vw;
  height: 50vh;
  background-color: ${themeColors.primary.elementaryBlue};
  color: ${themeColors.primary.elementaryWhite};
  display: flex;
  align-items: center;
  gap: 2rem;
  justify-content: center;
  flex-direction: column;
  padding-top: 4vh;
  font-size: 2rem;
  h1 {
    font-family: ${appFonts.primary.mainFont};
  }
  button {
    font-size: 1.4rem;
    color: ${themeColors.primary.elementaryWhite};
    background-color: ${themeColors.secondary.expandedGreen};
  }
  div {
    display: flex;
    align-items: center;
    width: 70%;
    justify-content: space-between;
  }
  form {
    color: ${themeColors.primary.elementaryWhite};
    width: 70%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    div {
      width: 100%;
      label {
        color: ${themeColors.primary.elementaryWhite};
      }
    }
    button {
      align-self: flex-end;
    }
  }
`;

const addSchema = z.object({
  headline: z.string().min(1, { message: "Post has to have a headline" }),
  shortDescription: z
    .string()
    .min(1, { message: "Post has to have a short description" }),
  fullDescription: z
    .string()
    .min(1, { message: "Post has to have a description" }),
  category: z
    .string()
    .min(1, { message: "Post has to have a category" })
    .max(10, { message: "Post category can have at most 10 characters" }),
  isBreakingNews: z.enum(["true", "false"]).transform((val) => val === "true"),
  imageUrl: z.any(),
});

type FormData = z.infer<typeof addSchema>;

export default function EditModal() {
  const { closeModal, editData } = useModal();
  const { token } = useAuth();

  const defaultValues = editData || {
    headline: "",
    shortDescription: "",
    fullDescription: "",
    category: "",
    isBreakingNews: false,
    imageUrl: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(addSchema), defaultValues });

  const mutation = useMutation({
    mutationFn: ({
      token,
      data,
    }: {
      token: string | undefined;
      data: FormData;
    }) => {
      if (editData) {
        return updateArticle(token, editData?.id, { ...data });
      } else {
        return createPost(token, data);
      }
    },
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error("Error creating post:", error);
    },
  });

  const onSubmit = (data: FormData) => {
    mutation.mutate({ token, data });
  };

  return (
    <StyledEditModalBackground>
      <StyledEditModal>
        <div>
          <h1>{editData ? "Edit post" : "Add new post"}</h1>
          <Button onClick={closeModal}>&times;</Button>
        </div>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormField
            label="Headline"
            error={errors.headline && errors.headline.message}
            register={register("headline")}
          />
          <FormField
            label="Short description"
            error={errors.shortDescription && errors.shortDescription.message}
            register={register("shortDescription")}
          />
          <FormField
            label="Full description"
            error={errors.fullDescription && errors.fullDescription.message}
            register={register("fullDescription")}
          />
          <FormField
            label="Category"
            error={errors.category && errors.category.message}
            register={register("category")}
          />
          <div>
            <Label>Breaking news?</Label>
            <select defaultValue="false" {...register("isBreakingNews")}>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          {errors.isBreakingNews && (
            <ErrorText>{errors.isBreakingNews.message}</ErrorText>
          )}
          <FormField
            label="Image"
            register={register("imageUrl")}
            type="file"
          />
          <Button>{editData ? "Edit Post" : "Add post"}</Button>
        </Form>
      </StyledEditModal>
    </StyledEditModalBackground>
  );
}
