import { Icon, Link as ChakraLink, Text, LinkProps as ChakraLinkProps } from "@chakra-ui/react"
import Link from "next/link";
import { useRouter } from "next/router";
import { ElementType } from "react"

interface NavLinkProps extends ChakraLinkProps {
  icon: ElementType;
  children: string;
  href: string;
}

export function NavLink({ icon, href, children, ...rest }: NavLinkProps) {
  const router = useRouter();
  const { asPath } = router || {};
  return (
      <ChakraLink display="flex" href={href}   alignItems="center" color={asPath === href ? "cyan" : "gray.50"} {...rest}>
        <Icon as={icon} fontSize="20" />
        <Text ml="4" fontWeight="medium">{children}</Text>
      </ChakraLink>
  )
}
