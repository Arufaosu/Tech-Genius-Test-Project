import { getSession } from "next-auth/react";
import { GetServerSideProps } from "next";

export default function EmployeeList() {
  return <h1>Employee List Page</h1>;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};

