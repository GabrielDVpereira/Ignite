import { Flex , Button, Stack } from '@chakra-ui/react'; 
import { Input } from '../components/Form/Input'; 
import { useForm, SubmitHandler } from 'react-hook-form'; 
import * as yup from 'yup'; 
import { yupResolver } from '@hookform/resolvers/yup'


interface SignInFormData { 
  email: string; 
  password: string; 
}; 

const SignInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'), 
  password: yup.string().required('Senha obrigatória')
})

export default function SignIn(){
  const { handleSubmit, register, formState } = useForm({
    resolver: yupResolver(SignInFormSchema)
  }); 

  const { errors } = formState; 
  console.log(errors)

  const handleSignIn: SubmitHandler<SignInFormData> = async (values) => {
    await new Promise(resolve => setTimeout(resolve, 2000))
    console.log(values)
    
  }

  return(
    <Flex 
      w="100vw" 
      h="100vh" 
      align="center" 
      justify="center"
      onSubmit={handleSubmit(handleSignIn)}
      >

      <Flex
        as="form"
        width="100%"
        maxWidth={360}
        bg="gray.800"
        p="8" // 2rem 
        borderRadius={8}
        flexDirection="column"
      >
        <Stack spacing="4" // stack is a component to set spacement between components
        > 
          <Input name="email" label="E-mail" type="email" {...register('email')} error={errors.email}/>
          <Input name="password" label="Senha" type="password" {...register('password')} error={errors.password}/>
        </Stack>

        <Button 
            type="submit"
            mt="6"
            colorScheme="pink"
            size="lg"
            isLoading={formState.isSubmitting}
          >
            Entrar 
        </Button>

      </Flex>
    </Flex>
  )
}