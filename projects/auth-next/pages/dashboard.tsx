import { useEffect } from "react";
import { useAuth } from "../context/AuthContext"
import { api } from "../services/api";

export default function Dashboard() {

  useEffect(() => {
      api.get('/me').then(response => {
        const {email, permissions, roles} = response.data; 
        console.log(response)
      })
  },[])
  
  const { user } = useAuth()
  return (
    <h1>Dashboad {user.email}</h1>
  )
}
