// src/types/comment.ts

export interface Comment {
  id: string;
  name: string;
  email: string;
  content: string;
  isApproved: boolean;
  createdAt: string;
  
  post: {
    id: string;
    title: string;
  };
}