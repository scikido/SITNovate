export interface Profile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  title: string | null;
  bio: string | null;
  created_at: string;
  updated_at: string;
}

export interface UserSession {
  user: Profile | null;
  isLoading: boolean;
}