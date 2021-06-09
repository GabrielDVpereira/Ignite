import {
  Box,
  Flex,
  Heading,
  Button,
  Icon,
  Table,
  Thead,
  Tr,
  Th,
  Checkbox,
  Tbody,
  Td,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { RiAddLine, RiPencilFill } from "react-icons/ri";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { Pagination } from "../../components/Pagination";
import { useQuery } from 'react-query'
import Link from 'next/link';
import { Loading } from "../../components/Loading";


export default function UserList() {
  // useQuery generate a cached query, using a strategy called stale while revalidate, where the browser will still make an http request but show the latest data while fetching
  // useQuery has also an feature called revalidate on focus, wich means that whenever the user access the browser, the http request will be performed
  const { data, isLoading, error } = useQuery('users', async () => { // we set a name for the query becase that's the name of the caching later, then a function that will return the data that will be stored
    const response = await fetch('http://localhost:3000/api/users');
    const data = await response.json();

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
    return users
  },{
    staleTime: 1000 * 5  // define a time for our data to be considered "stale", then the reactQuery will fetch the new info again. If not passed, every data will be considered stale as soon as it's fetched and then the reactQuery will make a request on every focus 
  })

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  });

  const renderLoading = () => (
    <Loading />
  )

  const renderUserTableOrErrorMessage = () => {

    if (error) {
      return (
        <Flex justify="center">
          <Text>Erro ao obter dados do usuário</Text>
        </Flex>
      )
    }

    return (
      <Table colorScheme="whiteAlpha">
        <Thead>
          <Tr>
            <Th ph={["4", "4", "6"]} color="gray.300" width="8">
              <Checkbox colorScheme="pink" />
            </Th>

            <Th>Usuário</Th>
            {isWideVersion && <Th>Data de cadastro</Th>}
            {isWideVersion && <Th></Th>}
          </Tr>
        </Thead>
        <Tbody>
          {data.map((user, index) => (
            <Tr key={Math.random()}>
              <Td px={["4", "4", "6"]}>
                <Checkbox colorScheme="pink" />
              </Td>
              <Td>
                <Box>
                  <Text fontWeight="bold"> {user.name} </Text>
                  <Text fontSize="sm" color="gray.300">
                    {user.email}
                    </Text>
                </Box>
              </Td>
              {isWideVersion && <Td>{user.createdAt}</Td>}
              {isWideVersion && <Td>
                <Button
                  as="a"
                  size="sm"
                  fontSize="sm"
                  colorScheme="purple"
                  leftIcon={<Icon as={RiPencilFill} fontSize="16" />}
                >
                  Editar
            </Button>
              </Td>}
            </Tr>
          ))}
        </Tbody>
      </Table>
    )
  }

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />
        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Usuários
            </Heading>
            <Link href="/users/create" passHref>
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="pink"
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
              >
                Criar Novo
              </Button>
            </Link>
          </Flex>

          {isLoading ? renderLoading() :
            renderUserTableOrErrorMessage()}

          <Pagination />
        </Box>
      </Flex>
    </Box>
  );
}
