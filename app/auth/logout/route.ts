import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function GET() {
  const supabase = await createClient();
  
  // Sign out on the server
  await supabase.auth.signOut();
  
  // Redirect to login page
  redirect("/auth/login");
} 