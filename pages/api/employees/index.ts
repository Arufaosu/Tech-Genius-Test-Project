import { getSession } from "next-auth/react";
import { prisma } from "@/lib/prisma"; // Prisma client setup
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const userRole = session.user?.role;

  // RBAC logic based on roles
  if (userRole === "HR_ADMIN") {
    // HR Admin can see all employees
    const employees = await prisma.employee.findMany();
    return res.json(employees);
  } else if (userRole === "MANAGER") {
    // Manager can see only employees in their department
    const managerId = session.user?.employeeId;
    const employees = await prisma.employee.findMany({
      where: { managerId },
    });
    return res.json(employees);
  } else if (userRole === "EMPLOYEE") {
    // Employees can only see their own data
    const employeeId = session.user?.employeeId;
    const employee = await prisma.employee.findUnique({
      where: { id: employeeId },
    });
    return res.json(employee);
  } else {
    return res.status(403).json({ error: "Forbidden" });
  }
}

