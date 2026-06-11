export interface UserRole {
  role: {
    id: string;
    name: string;
    slug: string;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
  createdAt: string;
  roles: UserRole[];
}