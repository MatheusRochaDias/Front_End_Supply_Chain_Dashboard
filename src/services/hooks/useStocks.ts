import { HandleError } from "@/error/HandlerError";
import axios from "axios";

interface StockProps {
  paginatedData: [{
    id: number,
    produto: {
      id: number,
      name: string,
      register_Number: number,
      manufacturer: string,
      type: string,
      description: string
    },
    quantidade: number,
    local: string
  }],
  metaData: {
    totalCount: number,
    pageSize: number,
    currentPage: number,
    totalPages: number,
    manufacturers: string[] | string
  }
}


interface productProps {
  paginatedData: [{
    id: number,
    name: string,
    registerNumber: number,
    manufacturer: string,
    type: string,
    description: string
  }],
  metaData: {
    totalCount: number,
    pageSize: number,
    currentPage: number,
    totalPages: number,
    manufacturers: string[] | string
  }
}

interface createStocksProps {
  produtoId: number,
  produto: {
    id: number,
    name: string,
    register_Number: number,
    manufacturer: string,
    type: string,
    description: string
  },
  quantidade: number,
  local: string,
}

export async function GetStocks(
  page: number,
  productName?: string,

) {
  try {
    const { data } = await axios.get<StockProps>(`https://localhost:7274/api/Estoques?page=${page}&pageSize=10${productName && `&name=${productName}`}`);
    return data;
  } catch (error) {
    console.log();
  }
}


export async function GetListProducts(
  page: number,
) {
  try {
    const { data } = await axios.get<productProps>(`https://localhost:7274/api/Produtos?page=${page}`);
    return data;
  } catch (error) {
    console.log();
  }
}




export async function createStock({
  local,
  produto,
  produtoId,
  quantidade
}: createStocksProps) {
  try {
    const { data } = await axios.post('https://localhost:7274/api/Estoques', {
      local,
      produto,
      produtoId,
      quantidade
    });
    return data;
  } catch (error: any) {
    throw new HandleError(error.response);
  }
}