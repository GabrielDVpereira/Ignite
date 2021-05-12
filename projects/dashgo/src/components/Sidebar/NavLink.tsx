import { Link as ChakraLink, Icon, Text, LinkProps } from "@chakra-ui/react";
import React, { ElementType } from "react";
import Link from 'next/link'; 

interface NavLinkProps extends LinkProps {
  icon: ElementType; //component with its name
  children: string;
  href: string
}

export function NavLink({ icon, children, href, ...rest }: NavLinkProps) {
  return (
    <Link href={href} passHref> 
      <ChakraLink display="flex" align="center" {...rest}>
        <Icon as={icon} fontSize="20" />
        <Text ml="4" fontWeight="medium">
          {children}
        </Text>
      </ChakraLink>
    </Link>
  );
}
