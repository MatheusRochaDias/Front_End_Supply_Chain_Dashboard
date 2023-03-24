import { Sidebar } from "@/components/Sidebar"
import * as yup from 'yup';
import { Box, Flex, Heading, Stack, Spinner, InputGroup, InputRightElement, Input as ChakraInput, Center, Button, Icon, Table, Thead, Tr, Th, Td, Tbody, Text, useDisclosure, useToast } from "@chakra-ui/react"
import { Header } from "../../components/Header"
import { RiAddLine, RiSearchLine, RiCloseCircleLine } from "react-icons/ri"
import { useQuery } from "react-query";
import { createProduct, GetProducts } from "@/services/hooks/useProducts";
import { Loading } from "@/components/Loading";
import { Pagination } from "@/components/Pagination";
import { Modal } from "@/components/Modal";
import { Input } from "@/components/Form/Input";
import { useForm } from 'react-hook-form';
import { useEffect, useState } from "react";
import { ButtonGroup } from "@chakra-ui/core";
import { yupResolver } from '@hookform/resolvers/yup';


interface ProductProps {
  Name: string,
  Register_Number: number,
  Manufacturer: string,
  Type: string,
  Description: string
}
const createProductScheme = yup.object().shape({
  Register_Number: yup
    .number()
    .required('Número de registro obrigatório!')
    .typeError('Somente números'),
  Manufacturer: yup
    .string()
    .required('Marca obrigatória!'),
  Name: yup
    .string()
    .required('Nome obrigatório!'),
  Type: yup
    .string()
    .required('Tipo obrigatório!'),
  Description: yup
    .string()
    .required('Descrição obrigatória!'),
});

export default function Products() {
  const [page, setPage] = useState(1)
  const [filter, setFilter] = useState("")
  const toast = useToast();
  const [loading, setLoading] = useState(false)

  const { data, isLoading, refetch } = useQuery([filter, page, 'getAllProducts'], () => GetProducts(page, filter), {
    staleTime: 1000 * 60, // 1 minute
    refetchOnWindowFocus: true
  });
  const { isOpen, onClose, onOpen } = useDisclosure();

  const { register, handleSubmit, formState, setValue } = useForm<ProductProps>({
    resolver: yupResolver(createProductScheme),
  });

  async function onSubmit(data: ProductProps) {
    setLoading(true)
    try {
      const response = await createProduct(data)
      console.log(response)
      toast({
        title: 'Produto cadastrado com sucesso!',
        status: 'success',
        variant: 'solid',
        isClosable: true,
      });
      setLoading(false)
      onClose()
      refetch()
    } catch (error: any) {
      toast({
        title:
          error.message
            === 'J'
            ? "Já existe um produto com esse número de registro"
            : "Não foi possível cadastrar o produto",
        status: 'error',
        variant: 'solid',
        isClosable: true,
      })
      setLoading(false)
    }
  }
  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" maxW={1400} mx="auto" px="6">
        <Sidebar />
        <Box flex="1" borderRadius="8" bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal"> Produtos Cadastrados</Heading>
            <Stack spacing="4" direction="row">
              <Flex
                as="label" align="center" justify="space-between" gap={3} flex="1" py="4" px="8" mt="6" alignSelf="center" color="gray.200" position="relative" bg="gray.800" borderRadius="full"
              >
                <InputGroup w="100%" justifyContent="space-between">
                  <ChakraInput
                    w="250px"
                    size="sm"
                    fontSize="sm"
                    colorScheme="cyan"
                    borderRadius="8"
                    borderColor="cyan"
                    type="text"
                    placeholder="Buscar por marca"
                    onChange={(e) => {
                      setFilter(e.target.value);
                    }}
                    value={filter}
                  />
                  <InputRightElement >
                    <Center>
                      {filter ? (
                        <Icon
                          color="cyan"
                          mt="-4px"
                          fontSize={20}
                          cursor="pointer"
                          onClick={() => {
                            setFilter("");
                          }}
                          as={RiCloseCircleLine}
                        />
                      ) : (
                        <Icon
                          fontSize={20}
                          mt="-4px"
                          color="cyan"
                          cursor="pointer"
                          as={RiSearchLine}
                        />
                      )}
                    </Center>
                  </InputRightElement>
                </InputGroup>

                <Button as="a" onClick={onOpen} w="100%" size="sm" fontSize="sm" colorScheme="cyan" leftIcon={<Icon fontSize={20} as={RiAddLine} />}>
                  Cadastrar novo
                </Button>
              </Flex>

            </Stack>
          </Flex>
          {data && data.paginatedData ?
            <Box minH="400px">
              <Box minH="350px">
                <Table colorScheme="whiteAlpha">
                  <Thead>
                    <Tr>
                      <Th>Número de Registro</Th>
                      <Th>Nome</Th>
                      <Th>Marca</Th>
                      <Th>Tipo</Th>
                      <Th>Descrição</Th></Tr>
                  </Thead>
                  <Tbody>
                    {data.paginatedData.map((item, index) => (
                      <>
                        {console.log(item.name)}
                        <Tr key={index}>
                          <Td>{item.registerNumber}</Td>
                          <Td><Text fontWeight="bold">{item.name}</Text></Td>
                          <Td>{item.manufacturer}</Td>
                          <Td>{item.type}</Td>
                          <Td>{item.description}</Td>
                        </Tr></>
                    ))}

                  </Tbody>
                </Table>
              </Box>
              <Pagination metadata={data.metaData} changePage={setPage} />
            </Box>
            :
            <Center h="400px">
              <Loading />
            </Center>}
        </Box>
      </Flex>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Cadastrar Produto"
      >
        <Box as="form" onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing="5">
            <Input label="Nome do Produto"
              {...register('Name')}
              error={formState?.errors?.Name} />
            <Input label="Marca"
              {...register('Manufacturer')}
              error={formState?.errors?.Manufacturer} />
            <Stack direction="row" spacing="3">
              <Input label="Número de Registro" type="text" id="numero"
                {...register('Register_Number')}
                error={formState?.errors?.Register_Number} />
              <Input label="Tipo"
                {...register('Type')}
                error={formState?.errors?.Type} />
            </Stack>
            <Input label="Descrição"
              {...register('Description')}
              error={formState?.errors?.Description} />
            <Button type="submit" isLoading={loading} size="lg" mt="6" colorScheme="cyan"> Cadastrar</Button>
          </Stack>
        </Box>
      </Modal>
    </Box>
  )
}