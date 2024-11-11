import { GetServerSideProps } from 'next'
import { prisma } from '../lib/prisma'

export default function EmployeesPage({ employees }) {
  return (
    <div className="container">
      <h1 className="text-xl font-bold">Employee List</h1>
      <table className="w-full table-auto mt-4">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Position</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.position}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const employees = await prisma.employee.findMany()

  return {
    props: {
      employees
    }
  }
}
