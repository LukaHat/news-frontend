import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import {
  deleteArticle,
  getNewsArticleById,
  updateArticle,
} from "../../api/news";
import placeholder from "../../assets/images/placeholder.jpg";
import { Button } from "../../components/atoms/Button";
import { ErrorText } from "../../components/atoms/ErrorText";
import { Loader } from "../../components/atoms/Loader";
import { CommentSection } from "../../components/organisms/CommentSection";
import { formatDate } from "../../lib/helper/helper";
import { useAuth } from "../../lib/hooks/useAuth";
import { flexContainer, flexContainerColumn } from "../../styles/utils/mixins";
import { themeColors } from "../../theme/colors";
import { mediaQueries } from "../../theme/mediaQueries";
import { spacings } from "../../theme/spacings";
import { typography } from "../../theme/typography";
import React from "react";
import { Modal } from "../../components/atoms/Modal";
import { Form } from "../../components/molecules/Form";
import { FormField } from "../../components/molecules/FormField";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const StyledNewsDetail = styled.div`
  ${flexContainerColumn}
  align-items: center;
  justify-content: flex-start;
  background-color: ${themeColors.primary.elementaryBlack};
  min-height: 91vh;

  .image-container {
    width: 100%;
    color: ${themeColors.primary.elementaryWhite};
    height: auto;

    img {
      width: 100%;
      height: 15rem;
      object-fit: cover;
      object-position: top;
    }
  }

  .text-content {
    width: 80%;
    color: ${themeColors.primary.elementaryWhite};
    p {
      ${typography.text.md};
    }

    h2 {
      ${typography.headings.md};
      font-weight: bold;
      font-family: ${typography.baseFonts.secondary.secondaryFont};
    }

    h3 {
      ${typography.headings.sm};
      padding: ${spacings.sm};
      margin: ${spacings.xs} 0;
      background-color: ${themeColors.secondary.expandedGreen};
      color: ${themeColors.primary.elementaryWhite};
      font-family: ${typography.baseFonts.secondary.secondaryFont};
    }
  }

  .buttons {
    ${flexContainer}
    gap: ${spacings.sm};
  }

  ${mediaQueries.xs} {
    padding: ${spacings.xs} 0;
    .text-content {
      width: 70%;
    }
    .image-container {
      width: 80%;
      height: auto;
      img {
        width: 100%;
        max-height: 40rem;
      }
    }
  }

  ${mediaQueries.sm} {
    .image-container {
      width: 70%;
      img {
        width: 100%;
        height: 40rem;
      }
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

export default function NewsDetail() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editData, setEditData] = React.useState({
    headline: "",
    shortDescription: "",
    fullDescription: "",
    category: "",
    isBreakingNews: false,
    imageUrl: "",
  });
  const { token, user } = useAuth();
  const { id } = useParams() as { id: string };
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: article,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["newsDetails", id],
    queryFn: async () => await getNewsArticleById(token, id),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      headline: article?.headline || editData.headline,
      shortDescription: article?.shortDescription || editData.shortDescription,
      fullDescription: article?.fullDescription || editData.fullDescription,
      category: article?.category || editData.category,
      isBreakingNews: article?.isBreakingNews || editData.isBreakingNews,
      imageUrl: article?.imageUrl || editData.imageUrl,
    },
  });

  const mutation = useMutation({
    mutationFn: async ({ token, data }: { token: string; data: FormData }) => {
      if (article) {
        return await updateArticle(token, id, data);
      }
    },
    onSuccess: () => {
      toast.success("Article updated");
      queryClient.invalidateQueries({
        queryKey: ["newsDetails", id],
      });

      setIsModalOpen(false);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data: FormData) => {
    mutation.mutate({ token, data });
  };

  if (isLoading) return <Loader />;
  if (error) return <ErrorText>{error.message}</ErrorText>;

  return (
    <StyledNewsDetail>
      <div className="image-container">
        <img
          src={
            article?.imageUrl !==
            "https://cobe-backend.s3.eu-central-1.amazonaws.com/no-image-available.png"
              ? article?.imageUrl
              : placeholder
          }
          alt={article?.headline}
        />
      </div>
      <div className="text-content">
        <p>
          Written by: {article?.createdBy} | {formatDate(article?.createdAt)}
        </p>
        <p>
          Last edited by: {article?.lastEditedBy} |{" "}
          {formatDate(article?.lastEditedAt)}
        </p>
        <p>Viewed {article?.__v} times</p>
      </div>
      {user?.fullName === article?.createdBy && (
        <div className="buttons">
          <Button
            onClick={() => {
              setIsModalOpen(true);
              setEditData({
                headline: article?.headline || "",
                shortDescription: article?.shortDescription || "",
                fullDescription: article?.fullDescription || "",
                category: article?.category || "",
                isBreakingNews: article?.isBreakingNews || false,
                imageUrl: article?.imageUrl || "",
              });
            }}
          >
            Edit
          </Button>
          <Button
            onClick={async () => {
              await deleteArticle(token, id);
              toast.success("Article deleted");
              navigate(-1);
            }}
          >
            Delete
          </Button>
        </div>
      )}
      <div className="text-content">
        <h3>{article?.category.toUpperCase()}</h3>
        <h2>{article?.headline}</h2>
        <p>{article?.fullDescription}</p>
      </div>
      <CommentSection id={id} />

      {isModalOpen && (
        <Modal>
          <div>
            <h2>Edit post</h2>
            <Button onClick={() => setIsModalOpen(false)}>&times;</Button>
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
            <Button>Edit post</Button>
          </Form>
        </Modal>
      )}
    </StyledNewsDetail>
  );
}
