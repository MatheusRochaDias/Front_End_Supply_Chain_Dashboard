import { Input } from "@/components/Form/Input";
import { Flex, Button,  Stack } from "@chakra-ui/react";

export default function Home() {
  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Flex as="form" flexDir="column" width="100%" maxW="400" bg="gray.800" padding={8} borderRadius={8}>
        <Stack spacing={4}>
        <Input name="email" type="email" label="E-mail"  />
        <Input name="password" type="password" label="Senha"  />
        </Stack>
        <Button type="submit" size="lg" mt="6" colorScheme="cyan"> Entrar</Button>

      </Flex>
    </Flex >)
}
