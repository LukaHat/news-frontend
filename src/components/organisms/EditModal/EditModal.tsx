import styled from "styled-components";
import { themeColors } from "../../../theme/colors";
import { Button } from "../../atoms/Button";
import { appFonts } from "../../../theme/fonts";
import { Form } from "../../molecules/Form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost, updateArticle } from "../../../api/news";
import { useModal } from "../../hooks/useModal";
import { useAuth } from "../../hooks/useAuth";
import { FormField } from "../../molecules/FormField";
import {
  flexContainer,
  flexContainerColumn,
} from "../../../styles/utils/mixins";

const StyledEditModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background-color: ${themeColors.secondary.expandedBlack};
  width: 100%;
  height: 100vh;
  ${flexContainer}
`;

const StyledEditModal = styled.div`
  width: clamp(80%, 80vw, 30%);
  height: 50vh;
  background-color: ${themeColors.primary.elementaryBlue};
  color: ${themeColors.primary.elementaryWhite};
  ${flexContainerColumn}
  gap: 2rem;
  padding-top: 4vh;
  h3 {
    font-family: ${appFonts.primary.mainFont};
    font-size: ${appFonts.fontSizes.headings.h3};
  }
  button {
    font-size: 1.4rem;
    color: ${themeColors.primary.elementaryWhite};
    background-color: ${themeColors.secondary.expandedGreen};
  }
  div {
    ${flexContainer}
    min-width: 70%;
    justify-content: space-between;
  }
  form {
    color: ${themeColors.primary.elementaryWhite};
    width: clamp(90%, 70%, 60%);
    ${flexContainer};
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
  @media (min-width: 768px) and (max-width: 1100px) {
    width: clamp(70vw, 50vw, 40vw);
    form {
      width: clamp(85%, 70%, 60%);
    }
  }
  @media (min-width: 1101px) {
    width: clamp(50vw, 40vw, 35%);

    form {
      width: clamp(80%, 60%, 40%);
    }
  }
`;

const formSchema = z.object({
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
  isBreakingNews: z.boolean(),
  imageUrl: z.any().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function EditModal() {
  const { closeModal, editData } = useModal();
  const { token } = useAuth();
  const queryClient = useQueryClient();

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
  } = useForm<FormData>({ resolver: zodResolver(formSchema), defaultValues });

  const mutation = useMutation({
    mutationFn: ({
      token,
      data,
    }: {
      token: string | undefined;
      data: FormData;
    }) => {
      if (editData) {
        return updateArticle(token, editData?.id, data);
      } else {
        return createPost(token, data);
      }
    },
    onSuccess: () => {
      if (editData) {
        queryClient.invalidateQueries({
          queryKey: ["newsDetails", editData.id],
        });
      } else {
        queryClient.invalidateQueries({ queryKey: ["frontPageNews"] });
      }
      closeModal();
    },
  });

  const onSubmit = (data: FormData) => {
    mutation.mutate({ token, data });
  };

  return (
    <StyledEditModalBackground>
      <StyledEditModal>
        <div>
          <h3>{editData ? "Edit post" : "Add new post"}</h3>
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
          <FormField
            label="Breaking news?"
            error={errors.isBreakingNews && errors.isBreakingNews.message}
            type="checkbox"
            register={register("isBreakingNews")}
          />
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
