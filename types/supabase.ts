export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      products: {
        Row: {
          id: number;
          source_id: string | null;
          name: string;
          price: number;
          category: string;
          image_url: string | null;
          description: string | null;
          badge: string | null;
          in_stock: boolean;
          created_at: string;
        };
        Insert: {
          id?: number;
          source_id?: string | null;
          name: string;
          price: number;
          category: string;
          image_url?: string | null;
          description?: string | null;
          badge?: string | null;
          in_stock?: boolean;
          created_at?: string;
        };
        Update: {
          id?: number;
          source_id?: string | null;
          name?: string;
          price?: number;
          category?: string;
          image_url?: string | null;
          description?: string | null;
          badge?: string | null;
          in_stock?: boolean;
          created_at?: string;
        };
        Relationships: [];
      };
      messages: {
        Row: {
          id: string;
          name: string;
          email: string | null;
          phone: string | null;
          subject: string | null;
          message: string;
          is_read: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email?: string | null;
          phone?: string | null;
          subject?: string | null;
          message: string;
          is_read?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string | null;
          phone?: string | null;
          subject?: string | null;
          message?: string;
          is_read?: boolean;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
