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
  Spinner
} from "@chakra-ui/react";
import { RiAddLine, RiPencilFill } from "react-icons/ri";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { Pagination } from "../../components/Pagination";
import Link from 'next/link';
import { Loading } from "../../components/Loading";
import { useUsers } from "../../services/hooks/useUSers";
import { useState } from 'react'


export default function UserList() {
  const [page, setPage] = useState(1); 

  const { data, isLoading, error, isFetching } = useUsers(page); 

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
          {data.users.map((user, index) => (
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
              {!isLoading && isFetching && (<Spinner size="sm" color="gray.500" ml="4"/>)  /* when loading is true, fetching is true, but we just want the spinner when fetching*/ }
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

          <Pagination 
            totalCountOfRegisters={data?.totalCount}
            currentPage={page}
            onPageChange={setPage}
          />
        </Box>
      </Flex>
    </Box>
  );
}
