import { Product } from "./types";

const DB_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vR1uamd5qFtbymbC2jekhhXyTBDw_sBUwoerUvNz_UBlLKhKBE-eGbWQfBetSeESATX8Tiw3kYZG2sz/pub?gid=941749917&single=true&output=csv";

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
        marca: arrRow[4].trim().toUpperCase(),
        images: arrRow[5].split(",").map((image) => image.replace('"', "")),
      };

      return product;
    });

    return data;
  } catch (err) {
    console.log(err);
    return [];
  }
};
