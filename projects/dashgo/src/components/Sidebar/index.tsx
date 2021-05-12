import { Box, Drawer, useBreakpointValue, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay } from "@chakra-ui/react";
import React, { useState } from "react";
import { useSidebarDrawer } from "../../contexts/SidebarDrawerContext";
import { SidebarNav } from "./SidebarNav";

export function Sidebar() {
  const isDrawerSidebar = useBreakpointValue({
    base: true, 
    lg: false
  }); 

  const {isOpen, onClose} = useSidebarDrawer()
  if(isDrawerSidebar){
    return(
      <Drawer isOpen={isOpen} placement="left" onClose={() => {}}>
        <DrawerOverlay>
          <DrawerContent bgColor="gray.800" p="4">
            <DrawerCloseButton mt="6" onClick={onClose}/>
            <DrawerHeader>Navegação</DrawerHeader>
            <DrawerBody>
              <SidebarNav />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    )
  }
  return (
    <Box as="aside" w="64" mr="8">
      <SidebarNav />
    </Box>
  );
}
