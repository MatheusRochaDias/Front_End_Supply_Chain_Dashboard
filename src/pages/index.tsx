import { Input } from "@/components/Form/Input";
import { Flex, Image, Center, Button, Stack, Box, Link } from "@chakra-ui/react";

export default function Home() {
  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Box>
        <Center pb="30px">
          <Image pl="8" src="/assets/logo-white.png" objectFit="cover" w="400px" />
        </Center>
        <Flex mt="50px" as="form" flexDir="column" width="100%" maxW="400" bg="gray.800" padding={8} borderRadius={8}>
          <Stack spacing={4}>
            <Input name="email" type="email" label="E-mail" />
            <Input name="password" type="password" label="Senha" />
          </Stack>
          <Link href="/dashboard">
            <Button w="100%" type="submit" size="lg" mt="6" colorScheme="cyan"> Entrar</Button>
          </Link>

        </Flex>
      </Box>
    </Flex >)
}
