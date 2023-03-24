import { Stack, Box, Button } from "@chakra-ui/react"
interface paginationProps {
  totalCount: number,
  pageSize: number,
  currentPage: number,
  totalPages: number,
  manufacturers: string[] | string
}

interface dataProps {
  changePage: (numberPage: number) => void,
  metadata: paginationProps
}

export function Pagination({
  metadata,
  changePage
}: dataProps) {
  return (
    <Stack direction="row" mt="8" spacing="6" justify="space-between" align="center">
      <Box>
        Total de Entradas:  {metadata.totalCount}  </Box>
      <Stack direction="row" spacing="2">
        {metadata.currentPage > 1 &&
          <Button size="sm" fontSize="xs" onClick={() => changePage(metadata.currentPage - 1)} width="4" bgColor="gray.700" _hover={{ bg: "gray.500 " }}>
            {metadata.currentPage - 1}
          </Button>
        }
        <Button size="sm" fontSize="xs" width="4" colorScheme="cyan" disabled _disabled={{ bgColor: "cyan.500", cursor: "default" }}>
          {metadata.currentPage}
        </Button>
        {metadata.currentPage < metadata.totalPages &&
          <Button size="sm" fontSize="xs" onClick={() => changePage(metadata.currentPage + 1)} width="4" bgColor="gray.700" _hover={{ bg: "gray.500 " }}>
            {metadata.currentPage + 1}
          </Button>
        }

      </Stack>
    </Stack>
  )
}