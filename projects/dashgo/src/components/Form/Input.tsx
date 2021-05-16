import {
  FormLabel,
  FormControl,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  FormErrorMessage
} from "@chakra-ui/react";
import {FieldError} from 'react-hook-form'


import {  forwardRef, ForwardRefRenderFunction } from 'react'; 

interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
  error?: FieldError
}


/**
 react-hooks-form use uncrontroled components, 
 wich means that control for forms is achieved by using a ref(useRef). 
 Since we are not using directely the input,we need to pass the ref sent by the lib to the input in this component. 
 That's why we use the fowardRef from react

 ForwardRefRenderFunction<HTMLInputElement, InputProps>: HTMLInputElement is the type of ref that react-hooks-form send to this component and inputProps is the rest of the props
 */

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({ name, label, error = null, ...rest }, ref) =>  {
  return (
    <FormControl isInvalid={!!error}>
      {label && <FormLabel html={name}>{label}</FormLabel>}
      <ChakraInput
        id={name}
        name={name}
        focusBorderColor="pink.500"
        bgColor="gray.900"
        variant="filled"
        _hover={{
          bgColor: "gray.900",
        }}
        size="lg"
        ref={ref}
        {...rest}
      />
     {!!error  &&  <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
}

export const Input = forwardRef(InputBase); 
