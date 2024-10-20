import styled from "styled-components";
import { Button } from "../../atoms/Button";
import { themeColors } from "../../../theme/colors";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../../lib/hooks/useAuth";
import {
  flexContainer,
  flexContainerColumn,
} from "../../../styles/utils/mixins";
import { typography } from "../../../theme/typography";
import menuIcon from "../../../assets/images/mobile-menu.svg";
import { colors } from "../../../theme/colors/colors";
import React from "react";
import { mediaQueries } from "../../../theme/mediaQueries";
import { spacings } from "../../../theme/spacings";
import { Modal } from "../../atoms/Modal";
import { Form } from "../../molecules/Form";
import { FormField } from "../../molecules/FormField";
import { createPost } from "../../../api/news";
import toast from "react-hot-toast";
import placeholder from "../../../assets/images/placeholder.jpg";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const StyledNavbar = styled.nav`
  height: 8vh;
  width: 100%;
  background-color: ${themeColors.primary.elementaryBlue};
  ${flexContainer}
  justify-content: space-between;
  font-family: ${typography.baseFonts.primary.mainFont};
  color: ${themeColors.primary.elementaryWhite};
  .mobile-menu {
    display: flex;

    .link-list {
      background-color: ${colors.primary.elementaryBlue};
      position: absolute;
      width: 30vw;
      top: 7.5vh;
      left: 70vw;
    }

    .closed {
      display: none;
    }

    .open {
      ${flexContainerColumn}
      gap: ${spacings.sm};
    }

    button {
      color: ${colors.primary.elementaryWhite};

      img {
        width: 3rem;
        height: 3rem;
      }
    }
  }
  a {
    ${typography.headings.lg};
    color: inherit;
    text-decoration: none;
    padding-left: ${spacings.sm};
  }
  .menu {
    display: none;
  }

  ${mediaQueries.xs} {
    .menu {
      ${flexContainer}
      justify-content: space-between;
      margin-right: ${spacings.md};
    }

    .mobile-menu {
      display: none;
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

export default function Navbar() {
  const { removeToken, token } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(formSchema) });

  const mutation = useMutation({
    mutationFn: async ({ token, data }: { token: string; data: FormData }) => {
      const formData = new FormData();

      formData.append("headline", data.headline);
      formData.append("shortDescription", data.shortDescription);
      formData.append("fullDescription", data.fullDescription);
      formData.append("category", data.category);
      formData.append("isBreakingNews", data.isBreakingNews.toString());

      if (data.imageUrl) {
        formData.append("image", data.imageUrl[0]);
      } else {
        formData.append("image", placeholder);
      }
      console.log(formData);
      return await createPost(token, formData);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["frontPageNews"] });
      toast.success("Article created");
      setIsModalOpen(false);
      reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data: FormData) => {
    mutation.mutate({ token, data });
  };

  return (
    <StyledNavbar>
      <NavLink to="/">News</NavLink>
      <div className="menu">
        <Button
          onClick={() => {
            removeToken();
          }}
        >
          Logout
        </Button>
        <Button onClick={() => setIsModalOpen(true)}>New Post</Button>
      </div>
      <div className="mobile-menu">
        <Button onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}>
          <img src={menuIcon} alt="mobile-menu" />
        </Button>
        <ul className={`link-list ${isMobileMenuOpen ? "open" : "closed"}`}>
          <li>
            <Button
              onClick={() => {
                setIsMobileMenuOpen((isOpen) => !isOpen);
                removeToken();
              }}
            >
              Logout
            </Button>
          </li>
          <li>
            <Button
              onClick={() => {
                setIsMobileMenuOpen((isOpen) => !isOpen);
                setIsModalOpen(true);
              }}
            >
              New Post
            </Button>
          </li>
        </ul>
      </div>

      {isModalOpen && (
        <Modal>
          <div>
            <h2>Add new post</h2>
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
            <Button>Add post</Button>
          </Form>
        </Modal>
      )}
    </StyledNavbar>
  );
}
