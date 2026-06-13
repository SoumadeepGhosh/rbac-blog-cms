export type PostStatus =
  | "DRAFT"
  | "PUBLISHED"
  | "ARCHIVED";

export interface Post {
  id: string;

  title: string;
  slug: string;

  excerpt?: string | null;

  content: string;

  featuredImage?: string | null;

  status: PostStatus;

  categoryId: string;
  authorId: string;

  category: {
    id: string;
    name: string;
  };

  author: {
    id: string;
    name: string;
  };

  createdAt: string;
  updatedAt: string;
}