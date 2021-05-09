import { Link, Icon, Text, LinkProps } from "@chakra-ui/react";
import React, { ElementType } from "react";

interface NavLinkProps extends LinkProps {
  icon: ElementType; //component with its name
  children: string;
}

export function NavLink({ icon, children, ...rest }: NavLinkProps) {
  return (
    <Link display="flex" align="center" {...rest}>
      <Icon as={icon} fontSize="20" />
      <Text ml="4" fontWeight="medium">
        {children}
      </Text>
    </Link>
  );
}
