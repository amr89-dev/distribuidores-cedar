import { Product } from "./types";

const DB_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ6V1hruH3Z6k7GDwY-p8exNH71Yf-XVagsD9tQPLT96YrzQPJZxz2iLgNuhSSohGIneMi-ocnZJavo/pub?gid=1968686925&single=true&output=csv";

export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(DB_URL);
    const resText = await response.text();
    const arrProduct = resText.split("\r\n").slice(1);

    const data: Product[] = arrProduct.map((row) => {
      const arrRow = row.split(",");
      const product: Product = {
        referencia: arrRow[0].trim(),
        descripcion: arrRow[1].trim(),
        precio: Number(arrRow[2]),
        saldo: Number(arrRow[3]),
        marca: arrRow[4].trim(),
        images: arrRow[5].split(","),
      };

      return product;
    });
    return data;
  } catch (err) {
    console.log(err);
    return [];
  }
};
