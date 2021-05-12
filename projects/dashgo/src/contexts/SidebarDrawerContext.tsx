import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/hooks";
import { useRouter } from "next/dist/client/router";
import { createContext, ReactNode, useContext, useEffect } from "react";


interface SidebarDrawerProviderProps {
  children: ReactNode; 
}

type sidebarDrawerContextValue = UseDisclosureReturn
const SidebarDrawerContext = createContext({} as sidebarDrawerContextValue); 

export function SidebarDrawerProvider({children}: SidebarDrawerProviderProps){
  const disclosure = useDisclosure()

  const router = useRouter(); 

  useEffect(() => {
    disclosure.onClose()
  }, [router.asPath]); // close sidebar everytime the routes change

  return(
    <SidebarDrawerContext.Provider value={disclosure}>
      {children}
    </SidebarDrawerContext.Provider>
  )
}

export function useSidebarDrawer(){
  return useContext(SidebarDrawerContext); 
}