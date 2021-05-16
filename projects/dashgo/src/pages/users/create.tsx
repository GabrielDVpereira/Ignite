import {
  Box,
  Flex,
  Heading,
  Divider,
  VStack,
  SimpleGrid,
  HStack,
  Button,
} from "@chakra-ui/react";
import { Input } from "../../components/Form/Input";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup'; 
import { yupResolver } from '@hookform/resolvers/yup' 


interface UserCreationInfo {
  name: string; 
  email: string; 
  password: string; 
  password_confirmation: string;
}


const CreateUserSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'), 
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'), 
  password: yup.string().required('Senha obrigatório').min(6, 'Senha deve ter no mínimo 6 caracteres'), 
  password_confirmation: yup.string().oneOf([null, yup.ref('password')], 'As senhas não são iguais') // it has to have the same value as password 
})

export default function CreateUser() {
  const {register, formState, handleSubmit} =  useForm({resolver: yupResolver(CreateUserSchema) }); 
  const { errors } = formState

   const onSubmit: SubmitHandler<UserCreationInfo> = async (values) => {
      await new Promise(resolve => setTimeout(resolve, 2000)); 
      console.log(values)
   }

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />
        <Box as="form" onSubmit={handleSubmit(onSubmit)} flex="1" borderRadius={8} bg="gray.800" p={["6", "8"]}>
          <Heading size="lg" fontWeight="normal">
            Criar usuário
          </Heading>
          <Divider my="6" borderColor="gray.700" />
          <VStack spacing={["6", "8"]}>
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input 
                name="name" 
                label="Nome completo"
                {...register('name')} 
                error={errors.name}
              />
              <Input 
                name="email" 
                label="E-mail" 
                type="email" 
                {...register('email')} 
                error={errors.email}
                />
            </SimpleGrid>

            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input 
                name="password" 
                type="password" 
                label="Senha" 
                {...register('password')} 
                error={errors.password}
              />
              <Input
                name="password_confirmation"
                type="password"
                label="Confirmação da senha"
                {...register('password_confirmation')} 
                error={errors.password_confirmation}
              />
            </SimpleGrid>
          </VStack>

          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/users">
                <Button colorScheme="whiteAlpha">Cancelar</Button>
              </Link>
              <Button type="submit" isLoading={formState.isSubmitting} colorScheme="pink">Salvar</Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
