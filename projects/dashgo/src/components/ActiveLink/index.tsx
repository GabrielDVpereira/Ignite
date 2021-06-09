import { useRouter } from 'next/dist/client/router';
import Link, {LinkProps} from 'next/link'; 
import { cloneElement, ReactElement } from 'react';

interface ActiveLinkProps extends LinkProps {
  children: ReactElement // react element is only components from react
}

export function ActiveLink({children, ...rest}: ActiveLinkProps){

  let isActive = false;
  const {asPath} = useRouter(); 

  const isLinkActive = (): boolean => {
    const hasSamePath = String(asPath).includes(String(rest.href)) || String(asPath).includes(String(rest.as)); 
    const isSamePath = asPath === rest.href || asPath === rest.as; 
    return hasSamePath || isSamePath
  }
  
  if(isLinkActive()){
    isActive = true; 
  }

  return(
    <Link {...rest}>
      {cloneElement(children, {
        color: isActive ? 'pink.400' : 'gray.50'
      })}
    </Link>
  )
}