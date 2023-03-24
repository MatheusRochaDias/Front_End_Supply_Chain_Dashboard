import { Flex, Image, Icon, Text, Input, HStack, Box } from "@chakra-ui/react";
import { RiSearchLine, RiNotificationLine } from "react-icons/ri"

export function Header() {
  return (
    <Flex as="header" w="100%" maxW="1400" h="20" mx="auto" mt="4" px="6" align="center">
      <Text fontSize="2xl" pr="8" fontWeight="bold" letterSpacing="tight" borderRightWidth={1} borderColor="gray.700" >
        SupplyChain
        <Text color="cyan.500" as="span" ml="1">.</Text>
      </Text>
      <Image pl="8" src="/assets/logo-white.png" objectFit="cover" w="200px" />
      {/* <Flex
        as="label" flex="1" py="4" px="8" mt="6" maxW="400" alignSelf="center" color="gray.200" position="relative" bg="gray.800" borderRadius="full"
      >
        <Input color="gray.500" variant="unstyled" px="4" mr="4" placeholder="Buscar na plataforma" _placeholder={{ color: "gray.400" }} />
        <Icon as={RiSearchLine} fontSize="20" />
      </Flex> */}
      <Flex align="center" ml="auto">
        <HStack mx="8" spacing="8" color="gray.300" py="1" pr="8" borderRightWidth={1} borderColor="gray.700">
          <Icon as={RiNotificationLine} fontSize="20" />
        </HStack>
        <Flex align="center">
          <Box mr="4" textAlign="right">
            <Text>
              Usuário Admin
            </Text>
            <Text color="gray.300" fontSize="small">
              admin@admin.com
            </Text>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  )
}