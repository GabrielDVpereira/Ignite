import { useQuery } from "react-query";
import { api } from "../api";

type User = {
  id: string; 
  name: string; 
  email: string; 
  createdAt: string;
}

type GetUsersResponse = {
  totalCount: number; 
  users: User[]
}
export const getUsers =  async (page: number): Promise<GetUsersResponse> => { 
  try{

    const { data, headers } = await api.get('/users',{
      params: { page }
    }); 
    console.log(data)
    const totalCount = Number(headers['x-total-count'])

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
    return { users, totalCount } // data that will be saved into our code
  }catch(error){
    console.log(error.response)
  }

 
}

export function useUsers(page: number){
  // useQuery generate a cached query, using a strategy called stale while revalidate, where the browser will still make an http request but show the latest data while fetching
  // useQuery has also an feature called revalidate on focus, wich means that whenever the user access the browser, the http request will be performed
  return useQuery(['users', page] /** passing an array because we need different cache for each page */, () => getUsers(page) , { // we set a name for the query becase that's the name of the caching later, then a function that will return the data that will be stored
    staleTime: 1000 * 5  // define a time for our data to be considered "stale", then the reactQuery will fetch the new info again. If not passed, every data will be considered stale as soon as it's fetched and then the reactQuery will make a request on every focus 
  })
}