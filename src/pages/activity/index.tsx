import { Sidebar } from "@/components/Sidebar"
import * as yup from 'yup';
import { Box, Flex, Select, Heading, Stack, Spinner, InputGroup, InputRightElement, Input as ChakraInput, Center, Button, Icon, Table, Thead, Tr, Th, Td, Tbody, Text, useDisclosure, useToast, DarkMode, FormLabel, RadioGroup, Radio } from "@chakra-ui/react"
import { Header } from "../../components/Header"
import { RiAddLine, RiSearchLine, RiCloseCircleLine } from "react-icons/ri"
import { useQuery } from "react-query";
import { createProduct, GetProducts } from "@/services/hooks/useProducts";
import { Loading } from "@/components/Loading";
import { Pagination } from "@/components/Pagination";
import { Modal } from "@/components/Modal";
import { Input } from "@/components/Form/Input";
import { Controller, useForm } from 'react-hook-form';
import { useEffect, useState } from "react";
import { ButtonGroup } from "@chakra-ui/core";
import { yupResolver } from '@hookform/resolvers/yup';
import { createActivity, GetActivity, GetListStocks } from "@/services/hooks/useActivity";
import { format } from 'date-fns';

interface ActivityProps {
  produtoId: number,
  produto: {
    id: number,
    name: string,
    register_Number: number,
    manufacturer: string,
    type: string,
    description: string
  },
  dataEvento: string,
  tipoMovimentacao: string,
  local: string,
  quantidadeMovimentada: number,
}

const createActivityScheme = yup.object().shape({
  quantidadeMovimentada: yup
    .number()
    .required('Quantidade obrigatória!')
    .typeError('Somente números'),
    dataEvento: yup
    .string()
    .required('Local obrigatório!'),

});

export default function Activity() {
  const [page, setPage] = useState(1)
  const [filter, setFilter] = useState("")
  const toast = useToast();
  const [loading, setLoading] = useState(false)
  const [quantidade, setQuantidade] = useState(0)
  const { data, refetch, isLoading } = useQuery([filter, page, 'getAllProducts'], () => GetActivity(page, filter), {
    staleTime: 1000 * 60, // 1 minute
    refetchOnWindowFocus: true
  });

  const { data: dataAllProducts, isLoading: isLoadingAllProducts } = useQuery(['GetListProducts'], () => GetListStocks(page), {
    staleTime: 1000 * 60, // 1 minute
  });
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { register, watch, handleSubmit, formState, setValue, getValues } = useForm<ActivityProps>({
    resolver: yupResolver(createActivityScheme),
  });
  const [selectedProduct, setSelectedProduct] = useState(0);
  const [selectedValue, setSelectedValue] = useState("1");

  const handleChange = (value: string) => {
    setSelectedValue(value);
  };

  async function onSubmit(data: ActivityProps) {
    setLoading(true)
    if (selectedValue === "1") {
      setValue("tipoMovimentacao", "Entrada")
    }
    else {
      setValue("tipoMovimentacao", "Saída")
    }
      try {
      const response = await createActivity(data)
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
            ? "Esse produto Já foi adicionado ao estoque. Na aba movimentações você conseguirá operar o volume"
            // : "Não foi possível cadastrar o produto",
            : error.message === "https://tools.ietf.org/html/rfc7231#section-6.5.1" ?
              "Selecione um Produto"
              : "Não foi possível cadastrar o produto",
        status: 'error',
        variant: 'solid',
        isClosable: true,
      })
      setLoading(false)
    }

  }


  useEffect(() => {
    const matchingProduct = dataAllProducts?.paginatedData.find(product => product.produto.register_Number === Number(getValues("produto.register_Number")));
    if (matchingProduct) {
      setValue("produtoId", matchingProduct.id)
      setValue("produto.id", matchingProduct.produto.id)
      setValue("produto.name", matchingProduct.produto.name)
      setValue("produto.register_Number", matchingProduct.produto.register_Number)
      setValue("produto.type", matchingProduct.produto.type)
      setValue("produto.description", matchingProduct.produto.description)
      setValue("produto.manufacturer", matchingProduct.produto.manufacturer)
      setValue("local", matchingProduct.local)
      setQuantidade(matchingProduct.quantidade)
    }
  }, [dataAllProducts?.paginatedData, getValues, selectedProduct, setValue]);

  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" maxW={1400} mx="auto" px="6">
        <Sidebar />
        <Box flex="1" borderRadius="8" bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal"> Movimentação de Produtos</Heading>
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
                    placeholder="Buscar por nome"
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
                <Table colorScheme="whiteAlpha" >
                  <Thead>
                    <Tr>
                      <Th>Nº de Registro</Th>
                      <Th>Nome</Th>
                      <Th>Marca</Th>
                      <Th>Tipo</Th>
                      <Th>Data e hora</Th>
                      <Th>Quantidade</Th></Tr>
                  </Thead>
                  <Tbody>
                    {data.paginatedData.map((item, index) => (
                      <>
                        <Tr key={index}>
                          <Td>{item.produto.register_Number}</Td>
                          <Td><Text fontWeight="bold">{item.produto.name}</Text></Td>
                          <Td>{item.produto.manufacturer}</Td>
                          <Td fontWeight="bold" color={item.tipoMovimentacao === "Entrada" ? "green.500" : "red.600"}>{item.tipoMovimentacao}</Td>
                          <Td>{format(new Date(item.dataEvento), 'dd/MM/yyyy HH:mm:ss')}</Td>
                          <Td color={item.tipoMovimentacao === "Entrada" ? "green.500" : "red.600"} >{item.quantidadeMovimentada}</Td>
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
        title="Cadastrar Movimentação"
      >
        <Box as="form" onSubmit={handleSubmit(onSubmit)}>
          {dataAllProducts ? <Stack spacing="5">
            {/* <Input label="Nome do Produto"
              {...register('Produto')}
              error={formState?.errors?.Name} /> */}
            <DarkMode>
              <Stack>
                <FormLabel >Selecione o Produto</FormLabel>
                <Select
                  placeholder='Selecione uma opção'
                  name="produto.registerNumber"
                  value={selectedProduct}
                  onChange={(event: any) => {
                    setSelectedProduct(event.target.value),
                      setValue('produto.register_Number', event.target.value)
                  }}
                > {dataAllProducts.paginatedData.map((item, idx) => (
                  <>
                    <option key={idx} value={item.produto.register_Number}>{item.produto.name} - {item.produto.manufacturer} - {item.local}</option>
                  </>))}
                </Select>
              </Stack>
            </DarkMode>
            <Input label="Data e hora" type="datetime-local" id="numero"
              {...register('dataEvento')}
              error={formState?.errors?.dataEvento} />
            <Stack direction="row" justify="space-between">
              <Stack>{watch("dataEvento")}
                <FormLabel >Selecione o Tipo de Movimentação</FormLabel>
                <RadioGroup
                  name="tipoMovimento"
                  defaultValue={selectedValue}
                  onChange={(value) => handleChange(value)}
                >
                  <Stack spacing={10} direction="row">
                    <Radio colorScheme="cyan" value="1">
                      Entrada
                    </Radio>
                    <Radio colorScheme="cyan" value="2">
                      Saída
                    </Radio>
                  </Stack>
                </RadioGroup>
              </Stack>
              <Stack>
                {quantidade !== 0 && <>
                  <Text fontSize="14px" color="gray.400">Quantidade Total</Text>
                  <Text fontSize="12px" textAlign="right" color="gray.400">{quantidade}</Text>
                </>}
              </Stack>
            </Stack>
            <Input label="Quantidade" type="text" id="numero"
              {...register('quantidadeMovimentada')}
              error={formState?.errors?.quantidadeMovimentada} />

            <Button type="submit" size="lg" mt="6" colorScheme="cyan"> Cadastrar</Button>
          </Stack> : <Center><Loading /></Center>}

        </Box>
      </Modal >
    </Box >
  )
}