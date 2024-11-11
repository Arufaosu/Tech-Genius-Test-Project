import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function EditEmployee() {
  const { data: session } = useSession();
  const router = useRouter();
  const { id } = router.query;

  const [employeeData, setEmployeeData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    status: "ACTIVE",
    // Other fields as needed
  });

  useEffect(() => {
    if (id) {
      // Fetch the employee data using the ID and populate the form
      // You can fetch the employee data here
    }
  }, [id]);

  if (!session || !(session.user?.role === "HR_ADMIN" || session.user?.role === "MANAGER")) {
    router.push("/login"); // Redirect to login if not authorized
    return null; // Prevent rendering the form while redirecting
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmployeeData({
      ...employeeData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission to update employee
  };

  return (
    <div>
      <h1>Edit Employee</h1>
      <form onSubmit={handleSubmit}>
        <label>First Name:</label>
        <input
          type="text"
          name="firstName"
          value={employeeData.firstName}
          onChange={handleInputChange}
        />
        {/* Add other input fields for last name, email, etc. */}
        <button type="submit">Update Employee</button>
      </form>
    </div>
  );
}

