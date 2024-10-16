import styled from "styled-components";
import { themeColors } from "../../../theme/colors";
import { Button } from "../../atoms/Button";
import { Form } from "../../molecules/Form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost, updateArticle } from "../../../api/news";
import { useAuth } from "../../../lib/hooks/useAuth";
import { FormField } from "../../molecules/FormField";
import { EditDataInterface } from "../../../types/NewsTypes";
import {
  flexContainer,
  flexContainerColumn,
} from "../../../styles/utils/mixins";
import ReactDOM from "react-dom";
import { typography } from "../../../theme/typography";
import { mediaQueries } from "../../../theme/mediaQueries";
import { spacings } from "../../../theme/spacings";
import toast from "react-hot-toast";

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
  width: 90vw;
  height: 70vh;
  background-color: ${themeColors.primary.elementaryBlue};
  color: ${themeColors.primary.elementaryWhite};
  ${flexContainerColumn}
  gap: ${spacings.gaps.lg};
  padding-top: ${spacings.paddings.sm};
  h2 {
    font-family: ${typography.baseFonts.primary.mainFont};
    ${typography.headings.md};
  }
  button {
    ${typography.text.md}
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
    width: 90%;
    ${flexContainer};
    justify-content: space-evenly;
    div {
      width: 100%;
      label {
        color: ${themeColors.primary.elementaryWhite};
      }
    }
  }

  ${mediaQueries.xs} {
    width: 70vw;
    height: 60vh;

    button {
      align-self: flex-end;
    }
  }

  ${mediaQueries.md} {
    width: 50vw;
    height: 50vh;

    ${typography.text.lg}
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

interface ModalProps {
  editData?: EditDataInterface | null;
  closeModal: () => void;
  setEditData: (data: EditDataInterface | null) => void;
}

export default function EditModal({
  editData,
  closeModal,
  setEditData,
}: ModalProps) {
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
      if (editData) {
        toast.success("Article updated");
      }
      if (!editData) {
        toast.success("Article created");
      }
      closeModal();
      setEditData(null);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data: FormData) => {
    mutation.mutate({ token, data });
  };

  const modalPortal = document.getElementById("edit-modal");
  if (!modalPortal) return null;

  return ReactDOM.createPortal(
    <StyledEditModalBackground>
      <StyledEditModal>
        <div>
          <h2>{editData ? "Edit post" : "Add new post"}</h2>
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
    </StyledEditModalBackground>,
    modalPortal
  );
}
