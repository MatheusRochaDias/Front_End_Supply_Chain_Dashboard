import { Header } from "@/components/Header";
import { Loading } from "@/components/Loading";
import { Pagination } from "@/components/Pagination";
import { Sidebar } from "@/components/Sidebar";
import { GetActivity, GetActivityChart, GetActivityReport, GetActivityReportByDate } from "@/services/hooks/useActivity";
import { GetStocks } from "@/services/hooks/useStocks";
import { Flex, Box, SimpleGrid, Text, theme, Center, Stack, Button, useDisclosure, Icon, DarkMode, FormLabel, Select } from "@chakra-ui/react";
import dynamic from "next/dynamic"
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })
import moment from 'moment';
import { RiDownload2Fill } from "react-icons/ri"
import { Modal } from "@/components/Modal";
import { useForm } from "react-hook-form";
import MyPDFComponent from "./reports";




interface sumByMonthYear {
  [yearMonth: string]: number;
}
type Serie = {
  name: string;
  data: number[];
};

export default function Dashboard() {
  const [page, setPage] = useState(1)
  const [filter, setFilter] = useState("")
  const [selected, setSelected] = useState(-1)
  const [filtered, setFiltered] = useState(0)
  const [filteredMonth, setFilteredMonth] = useState(0)
  const [filteredYear, setFilteredYear] = useState(0)
  const { data, refetch, isLoading } = useQuery([filter, page, 'getAllProducts'], () => GetStocks(page, filter), {
    staleTime: 1000 * 60, // 1 minute
    refetchOnWindowFocus: true
  });

  const { isOpen, onClose, onOpen } = useDisclosure();
  const [months, setMonths] = useState<string[]>([])
  const { data: dataActivity, isLoading: isLoadingActivity } = useQuery([filtered, page, 'getAllProducts'], () => GetActivityChart(page, filtered), {
    staleTime: 1000 * 60, // 1 minute
    refetchOnWindowFocus: true
  });

  const { data: allActivity, isLoading: isLoadingAllActivity } = useQuery([filtered, page, 'getAllProducts'], () => GetActivityChart(1), {
    staleTime: 1000 * 60, // 1 minute
    refetchOnWindowFocus: true
  });

  const { data: reportActivity } = useQuery([isOpen, 'getAllProductsrEPORT'], () => GetActivityReport(1), {
    staleTime: 1000 * 60, // 1 minute
    refetchOnWindowFocus: true
  });

  const sumByMonthYear: sumByMonthYear = {};

  const [series, setSeries] = useState<Serie[]>([]);
  const [selectedDate, setSelectedDate] = useState("")
  useEffect(() => {
    const entradasByMonthYear: { [yearMonth: string]: number } = {};
    const saidasByMonthYear: { [yearMonth: string]: number } = {};
    const allYearMonths: string[] = [];

    dataActivity?.paginatedData.forEach(item => {
      const date = moment(item.dataEvento);
      const quantity = item.quantidadeMovimentada;

      const yearMonth = date.format('YYYY-MM');

      if (item.tipoMovimentacao === "Entrada") {
        if (entradasByMonthYear[yearMonth]) {
          entradasByMonthYear[yearMonth] += quantity;
        } else {
          entradasByMonthYear[yearMonth] = quantity;
        }
      } else if (item.tipoMovimentacao === "Saída") {
        if (saidasByMonthYear[yearMonth]) {
          saidasByMonthYear[yearMonth] += quantity;
        } else {
          saidasByMonthYear[yearMonth] = quantity;
        }
      }

      if (!allYearMonths.includes(yearMonth)) {
        allYearMonths.push(yearMonth);
      }
    });

    const sortedYearMonths = allYearMonths.sort();

    const categories = sortedYearMonths;
    setMeuArray(categories);

    const entradasSeries: {
      name: string;
      data: number[];
    }[] = [{ name: 'Entradas', data: categories.map(yearMonth => entradasByMonthYear[yearMonth] || 0) }];

    const saidasSeries: {
      name: string;
      data: number[];
    }[] = [{ name: 'Saídas', data: categories.map(yearMonth => saidasByMonthYear[yearMonth] || 0) }]; console.log(sortedYearMonths, [...entradasSeries, ...saidasSeries]);
    const series = [...entradasSeries, ...saidasSeries].map(series => ({
      name: series.name,
      data: series.data
    }));

    setSeries(series);

    const sumByMonthYear: { [yearMonth: string]: number } = {};
    categories.forEach(date => {
      const yearMonth = moment(date).format('YYYY-MM');
      const value = 10; // Valor da movimentação correspondente à data (substituir por sua lógica de cálculo)
      if (sumByMonthYear[yearMonth]) {
        sumByMonthYear[yearMonth] += value;
      } else {
        sumByMonthYear[yearMonth] = value;
      }
    });

    const months = Object.keys(sumByMonthYear).sort();

  }, [dataActivity]);





  useEffect(() => {
    const entradasByMonthYear: { [yearMonth: string]: number } = {};
    const saidasByMonthYear: { [yearMonth: string]: number } = {};
    const allYearMonths: string[] = [];

    reportActivity?.paginatedData.forEach(item => {
      const date = moment(item.dataEvento);
      const quantity = item.quantidadeMovimentada;

      const yearMonth = date.format('YYYY-MM');

      if (item.tipoMovimentacao === "Entrada") {
        if (entradasByMonthYear[yearMonth]) {
          entradasByMonthYear[yearMonth] += quantity;
        } else {
          entradasByMonthYear[yearMonth] = quantity;
        }
      } else if (item.tipoMovimentacao === "Saída") {
        if (saidasByMonthYear[yearMonth]) {
          saidasByMonthYear[yearMonth] += quantity;
        } else {
          saidasByMonthYear[yearMonth] = quantity;
        }
      }

      if (!allYearMonths.includes(yearMonth)) {
        allYearMonths.push(yearMonth);
      }
    });

    const sortedYearMonths = allYearMonths.sort();

    const categories = sortedYearMonths;


    const entradasSeries: {
      name: string;
      data: number[];
    }[] = [{ name: 'Entradas', data: categories.map(yearMonth => entradasByMonthYear[yearMonth] || 0) }];

    const saidasSeries: {
      name: string;
      data: number[];
    }[] = [{ name: 'Saídas', data: categories.map(yearMonth => saidasByMonthYear[yearMonth] || 0) }]; console.log(sortedYearMonths, [...entradasSeries, ...saidasSeries]);
    const series = [...entradasSeries, ...saidasSeries].map(series => ({
      name: series.name,
      data: series.data
    }));


    const sumByMonthYear: { [yearMonth: string]: number } = {};
    categories.forEach(date => {
      const yearMonth = moment(date).format('YYYY-MM');
      const value = 10; // Valor da movimentação correspondente à data (substituir por sua lógica de cálculo)
      if (sumByMonthYear[yearMonth]) {
        sumByMonthYear[yearMonth] += value;
      } else {
        sumByMonthYear[yearMonth] = value;
      }
    });

    const months = Object.keys(sumByMonthYear).sort();
    setMonths(months)

  }, [reportActivity]);


  function handleSelectedDateClick
    () {
    const date = selectedDate;
    const [firstPart, secondPart] = date.split('-').map(part => part.replace('-', ''));
    console.log(firstPart, secondPart);
    setSplitDate([firstPart, secondPart])
      
  }

  const [splitDate, setSplitDate] = useState<String[]>(["", ""])
  const { data: selectToreportActivity } = useQuery([selectedDate, handleSelectedDateClick, , 'getAllProducts'], () => GetActivityReportByDate(1, Number(splitDate[1]), Number(splitDate[0])), {
    staleTime: 1000 * 60, // 1 minute
    refetchOnWindowFocus: true
  });

  console.log(selectToreportActivity, "BV")
  const [meuArray, setMeuArray] = useState<string[] | undefined>(undefined);


  return (
    <Flex direction="column" h="100vh">
      <Header />
      <Flex w="100%" my="6" maxW="1400" mx="auto" px="6">
        <Sidebar />
        <Box w="100%">
          <Box p="8" bg="gray.800" borderRadius="8">
            <Flex justify="space-between">
              <Text fontSize="lg" mb="4">Movimentações</Text>
              {allActivity &&
                <Button as="a" color="#FFF" onClick={onOpen} fontSize="sm" bg="cyan.800" leftIcon={<Icon fontSize={20} as={RiDownload2Fill} />}>
                  Download de Relatório
                </Button>
                // <MyPDFComponent />
              }
            </Flex>
            {selected !== -1 ?
              <Chart options={{
                chart: {
                  toolbar: {
                    show: false,
                  },
                  zoom: {
                    enabled: false,
                  },
                  foreColor: theme.colors.gray[500],
                },
                grid: {
                  show: false,
                },
                dataLabels: {
                  enabled: true,
                },
                tooltip: {
                  enabled: false,
                },
                xaxis: {
                  type: "category",
                  axisBorder: {
                    color: theme.colors.gray[600]
                  },
                  axisTicks: {
                    color: theme.colors.gray[600]
                  },

                  categories: meuArray,

                },
                colors: ['#0BC5EA', '#C53030'],
              }} series={series} type="area" height={160} />
              : <Center height={160} >
                <Text fontSize="2xl"> Selecione uma mercadoria abaixo</Text> </Center>}
          </Box>
          <Box p="8" mt={4} bg="gray.800" borderRadius="8">
            <Text fontSize="lg" mb="4">Selecione Mercadoria para visualização </Text>

            <Box>
              {data && data.paginatedData ?
                <Box >
                  <SimpleGrid columns={5} gap="4" >
                    {data.paginatedData.map((item, index) => (
                      <Stack key={index} bg={selected === index ? "cyan.800" : "gray.900"} borderRadius="20" cursor="pointer" onClick={() => { setSelected(index), setFiltered(item.produto.register_Number) }} _hover={{ background: "cyan.900", transition: "background cyan.900 1s, color 1s, cyan.900 1" }} p="4">
                        <Flex justify="space-between">
                          <Text fontWeight="bold" color="gray.50">{item.produto.name}</Text>
                          <Text color="gray.50">{item.produto.register_Number}</Text>
                        </Flex>
                        <Box>
                          <Text fontWeight="bold" fontSize={12} color="gray.50">Marca</Text>
                          <Text color="gray.50">{item.produto.manufacturer}</Text>
                        </Box>

                        <Box>
                          <Text fontWeight="bold" fontSize={12} color="gray.50">Total em Estoque</Text>
                          <Text color="gray.50">{item.quantidade}</Text>
                        </Box>
                      </Stack>
                    ))
                    }


                  </SimpleGrid>
                  <Pagination metadata={data.metaData} changePage={setPage} />
                </Box>
                :
                <Center h="400px">
                  <Loading />
                </Center>}
            </Box>
          </Box>
        </Box >
      </Flex >
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Download de Relatório"
      >
        <Box>
          {months ? <Stack spacing="5">
            {/* <Input label="Nome do Produto"
              {...register('Produto')}
              error={formState?.errors?.Name} /> */}
            <DarkMode>
              <Stack>
                <FormLabel >Selecione o mês e o ano</FormLabel>
                <Select
                  placeholder='Selecione uma opção'
                  name="selectedDate"
                  value={selectedDate}
                  onChange={(event: any) => {
                    setSelectedDate(event.target.value)
                  }}
                > {months.map((item, idx) => (
                  <option key={idx} value={item}>{item}</option>
                ))}
                </Select>
              </Stack>
            </DarkMode>

            <Button size="lg" mt="6" onClick={handleSelectedDateClick} colorScheme="cyan"> Download</Button>
          </Stack> : <Center>
            <Loading />
          </Center>}

        </Box>
      </Modal >
    </Flex >
  )
}
