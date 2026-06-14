export interface DashboardStats {
  users: number;
  roles: number;
  posts: number;
  categories: number;
  comments: number;
}

export interface DashboardPost {
  id: string;
  title: string;
  slug: string;
  status: string;
  featuredImage?: string | null;
  createdAt: string;

  author: {
    name: string;
  };
}

export interface DashboardActivity {
  id: string;
  action: string;
  entityType: string;
  createdAt: string;
}

export interface DashboardResponse {
  stats: DashboardStats;
  recentPosts: DashboardPost[];
  recentActivities: DashboardActivity[];
}
