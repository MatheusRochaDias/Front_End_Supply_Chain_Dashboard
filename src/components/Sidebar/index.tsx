import { Box, Text, Stack, Link, Icon } from "@chakra-ui/react";
import { RiDashboardLine, RiPlayListAddFill, RiExchangeBoxLine, RiFileListLine, RiArchiveLine } from "react-icons/ri"
import { NavLink } from "../NavLink";

export function Sidebar() {
  return (
    <Box as="aside" w="64" mr="8">
      <Stack spacing="12" align="flex-start">
        <Box>
          <Text fontWeight="bold" color="gray.400" fontSize="small">Geral</Text>
          <Stack spacing="4" mt="8" align="stretch">
            <NavLink href="/dashboard"  icon={RiDashboardLine}>Dashboard</NavLink>
            <NavLink href="/activity" icon={RiExchangeBoxLine}>Movimentações</NavLink>
            <NavLink href="/stock" icon={RiArchiveLine}>Estoque</NavLink>
            <NavLink href="/products" icon={RiFileListLine}>Produtos</NavLink>
          </Stack>
        </Box>
      </Stack>
    </Box>
  )
}