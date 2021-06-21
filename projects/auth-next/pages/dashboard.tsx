import { destroyCookie } from "nookies";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext"
import { setUpHttp } from "../services/api";
import { withSSRAuth } from "../utils/withSSRAuth";

export default function Dashboard() {



  const { user } = useAuth()
  return (
    <h1>Dashboad {user.email}</h1>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const httpClient = setUpHttp(ctx);

  const response = await httpClient.get('/me')
  const { email, permissions, roles } = response.data;

  return {
    props: {}
  }
})