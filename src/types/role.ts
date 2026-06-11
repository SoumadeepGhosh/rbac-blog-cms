export interface Permission {
  id: string;
  name: string;
  slug: string;
}

export interface Role {
  id: string;
  name: string;
  slug: string;
  description?: string | null;

  permissions: {
    permission: Permission;
  }[];

  createdAt: string;
}