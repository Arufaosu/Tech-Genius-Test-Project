import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function CreateEmployee() {
  const { data: session } = useSession();
  const router = useRouter();

  // HR Admins or Managers can create/edit employees
  if (!session || !(session.user?.role === "HR_ADMIN" || session.user?.role === "MANAGER")) {
    router.push("/login"); // Redirect to login if not authorized
    return null; // Prevent rendering the page content while redirecting
  }

  return (
    <div>
      <h1>Create/Edit Employee</h1>
      {/* Render the form to create/edit employee */}
    </div>
  );
}

