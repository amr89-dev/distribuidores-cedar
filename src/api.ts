import { Product } from "./types";

const DB_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTkYz0iVYgxyWW1Tri52FoFUx2OiUHy_Z_EhwuVXJAgCMXDhsFDTXqe3XyvdvKlccA_tGuypgPa_5Ig/pub?gid=1739840490&single=true&output=csv";

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
        images: arrRow[5].split(";").map((image) => image.replace('"', "")),
      };
      return product;
    });

    return data.sort((a, b) => b.referencia.localeCompare(a.referencia));
  } catch (err) {
    console.log(err);
    return [];
  }
};
