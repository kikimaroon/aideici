export interface Need {
  id: string;
  title: string;
  summary: string | null;
  source_url: string;
  category: string | null;
  location: string | null;
  verified_at: string | null;
  expires_at: string | null;
  status: "draft" | "verified" | "expired" | "rejected";
}
