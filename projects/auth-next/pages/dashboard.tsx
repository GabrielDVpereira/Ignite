import { useEffect } from "react";
import { useAuth } from "../context/AuthContext"
import { api } from "../services/api";
import { withSSRAuth } from "../utils/withSSRAuth";

export default function Dashboard() {

  useEffect(() => {
    api.get('/me').then(response => {
      const { email, permissions, roles } = response.data;
      console.log(response)
    }).catch(() => {
      console.log("cdkcmlkcmdkl")
    })
  }, [])

  const { user } = useAuth()
  return (
    <h1>Dashboad {user.email}</h1>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  return {
    props: {}
  }
})