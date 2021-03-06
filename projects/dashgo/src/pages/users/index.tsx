import { useState } from 'react'
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
  Spinner, 
  Link
} from "@chakra-ui/react";
import NextLink from 'next/link';

import { queryClient } from '../../services/queryClient';

import { RiAddLine, RiPencilFill } from "react-icons/ri";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { Pagination } from "../../components/Pagination";
import { Loading } from "../../components/Loading";
import { getUsers, GetUsersResponse, useUsers } from "../../services/hooks/useUSers";
import { api } from '../../services/api';
import { GetServerSideProps } from 'next';

export default function UserList({ users, totalCount }: GetUsersResponse) {
  const [page, setPage] = useState(1); 

  const { data, isLoading, error, isFetching } = useUsers(page, {
    initialData: { users, totalCount }
  }); 

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  });

  async function handlePrefetchUser(userId: number){
    await queryClient.prefetchQuery(['user', userId], async () => {
      const response = await api.get(`users/${userId}`)
      console.log(response.data)
    },{ staleTime: 1000* 60*10 })
  }

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
          {data?.users?.map((user, index) => (
            <Tr key={Math.random()}>
              <Td px={["4", "4", "6"]}>
                <Checkbox colorScheme="pink" />
              </Td>
              <Td>
                <Box>
                  <Link color="purple.500" onMouseEnter={() => handlePrefetchUser(Number(user.id))}>
                    <Text fontWeight="bold"> {user.name} </Text>
                  </Link>
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
            <NextLink href="/users/create" passHref>
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="pink"
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
              >
                Criar Novo
              </Button>
            </NextLink>
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

export const getServerSideProps: GetServerSideProps = async () => {
  const {users, totalCount} = await getUsers(1); 

  return {
    props: {
      users,
      totalCount
    }
  }
}