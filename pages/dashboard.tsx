import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect to login if not authenticated
  if (status === "loading") return <p>Loading...</p>;
  if (!session) {
    router.push("/login");
    return null;
  }

  return (
    <div>
      <h1>Welcome to your Dashboard</h1>
      <p>Email: {session.user?.email}</p>
      <p>Role: {session.user?.role}</p>

      {/* Conditional rendering based on the user's role */}
      {session.user?.role === "HR_ADMIN" && <p>You have admin access</p>}
      {session.user?.role === "MANAGER" && <p>You are a manager</p>}
      {/* Add more role-based UI elements */}
    </div>
  );
};

export default Dashboard;
