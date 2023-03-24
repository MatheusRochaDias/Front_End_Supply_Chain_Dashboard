import { HandleError } from "@/error/HandlerError";
import axios from "axios";

interface ActivityProps {
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
    dataEvento: string,
    tipoMovimentacao: string,
    local: string,
    quantidadeMovimentada: number
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
    id: number
    local: string
    produto: {
      description: string
      id: number
      manufacturer: string
      name: string
      register_Number: number
      type: string
    }

    quantidade: number
  }],
  metaData: {
    totalCount: number,
    pageSize: number,
    currentPage: number,
    totalPages: number,
    manufacturers: string[] | string
  }
}

interface createActivityProps {
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

export async function GetActivity(
  page: number,
  productName?: string,
) {
  try {
    const { data } = await axios.get<ActivityProps>(`https://localhost:7274/api/Movimentacao?page=${page}&pageSize=10${productName && `&name=${productName}`}`);
    return data;
  } catch (error) {
    console.log();
  }
}


export async function GetActivityChart(
  page: number,
  productName?: number,
) {
  try {
    const { data } = await axios.get<ActivityProps>(`https://localhost:7274/api/Movimentacao?page=${page}${productName && `&filter=${productName}`}`);
    return data;
  } catch (error) {
    console.log();
  }
}


export async function GetActivityReport(
  page: number,
) {
  try {
    const { data } = await axios.get<ActivityProps>(`https://localhost:7274/api/Movimentacao?page=${page}`);
    return data;
  } catch (error) {
    console.log();
  }
}


export async function GetActivityReportByDate(
  page: number,
  month?: number,
  year?: number
) {
  try {
    const { data } = await axios.get<ActivityProps>(`https://localhost:7274/api/Movimentacao?page=${page}${month && `&month=${month}`}${year && `&year=${year}`}`);
    return data;
  } catch (error) {
    console.log();
  }
}

export async function GetListStocks(
  page: number,
) {
  try {
    const { data } = await axios.get<productProps>(`https://localhost:7274/api/Estoques?page=${page}`);
    return data;
  } catch (error) {
    console.log();
  }
}




export async function createActivity({
  local,
  produto,
  produtoId,
  dataEvento,
  tipoMovimentacao,
  quantidadeMovimentada
}: createActivityProps) {
  try {
    const { data } = await axios.post('https://localhost:7274/api/Movimentacao', {
      local,
      produto,
      produtoId,
      dataEvento,
      tipoMovimentacao,
      quantidadeMovimentada,
    });
    return data;
  } catch (error: any) {
    throw new HandleError(error.response);
  }
}