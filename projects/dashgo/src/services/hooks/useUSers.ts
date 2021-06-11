import { useQuery } from "react-query";
import { api } from "../api";

type User = {
  id: string; 
  name: string; 
  email: string; 
  createdAt: string;
}

export const getUsers =  async (): Promise<User[]> => { 
  const { data } = await api.get('/users'); 

  const users = data.users.map(user => {
    return {
      id: user.id,
      name: user.name, 
      email: user.email, 
      createdAt: new Date(user.createdAt).toLocaleDateString('pt-BR', {
        day: '2-digit', 
        month: 'long', 
        year: 'numeric'
      })
    }
  })
  return users // data that will be saved into our code
}

export function useUsers(){
  // useQuery generate a cached query, using a strategy called stale while revalidate, where the browser will still make an http request but show the latest data while fetching
  // useQuery has also an feature called revalidate on focus, wich means that whenever the user access the browser, the http request will be performed
  return useQuery('users', getUsers , { // we set a name for the query becase that's the name of the caching later, then a function that will return the data that will be stored
    staleTime: 1000 * 5  // define a time for our data to be considered "stale", then the reactQuery will fetch the new info again. If not passed, every data will be considered stale as soon as it's fetched and then the reactQuery will make a request on every focus 
  })
}