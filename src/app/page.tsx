import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/auth";

export default function HomePage() {
  // Check if user is authenticated
  const cookieStore = cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (token) {
    const user = verifyToken(token);

    if (user) {
      // Redirect to dashboard if authenticated
      redirect("/dashboard");
    }
  }

  // Redirect to login if not authenticated
  redirect("/login");
}
