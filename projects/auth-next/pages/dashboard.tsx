import { useAuth } from "../context/AuthContext"

export default function Dashboard() {
  const { user } = useAuth()
  return (
    <h1>Dashboad {user.email}</h1>
  )
}
