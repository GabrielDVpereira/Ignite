import { AppProps } from 'next/app'; 
import { ChakraProvider } from '@chakra-ui/react'; 
import { theme } from '../styles/theme';
import { SidebarDrawerProvider } from '../contexts/SidebarDrawerContext';
import { makeServer } from '../services/mirage';

if(process.env.NODE_ENV === 'development'){
  makeServer() // setting up a faker server if enviroment is dev
}

function MyApp({ Component, pageProps }: AppProps) {
  return(
     <ChakraProvider theme={theme}> 
        <SidebarDrawerProvider>
          <Component {...pageProps} />
        </SidebarDrawerProvider> 
     </ChakraProvider>
  )
}

export default MyApp
