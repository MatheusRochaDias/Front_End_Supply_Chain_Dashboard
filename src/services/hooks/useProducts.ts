import { HandleError } from "@/error/HandlerError";
import axios from "axios";

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

interface createProductProps {
  Name: string,
  Register_Number: number,
  Manufacturer: string,
  Type: string,
  Description: string
}

export async function GetProducts(
  page: number,
  manufacturer?: string,

) {
  try {
    const { data } = await axios.get<productProps>(`https://localhost:7274/api/Produtos?page=${page}&pageSize=10${manufacturer && `&name=${manufacturer}`}`);
    return data;
  } catch (error) {
    console.log();
  }
}


export async function createProduct({
  Name,
  Register_Number,
  Manufacturer,
  Type,
  Description,
}: createProductProps) {
  try {
    const { data } = await axios.post('https://localhost:7274/api/Produtos/produtos', {
      Name,
      Register_Number,
      Manufacturer,
      Type,
      Description,
    });
    return data;
  } catch (error: any) {
    throw new HandleError(error.response);
  }
}