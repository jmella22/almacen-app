import axios from "axios";
import Papa from "papaparse";
import { INFORMATION } from "../app/constans";

import { Product } from "./types";

export default {
  list: async (): Promise<Array<Product>> => {
    return axios
      .get(`${process.env.DB_URL}`, {
        responseType: "blob",
      })
      .then(
        (response) =>
          new Promise<Array<Product>>((resolve, reject) => {
            Papa.parse(response.data, {
              header: true,
              complete: (results) => {
                const products = results.data as Product[];
                resolve(
                  products.map((product) => ({
                    ...product,
                    price: Number(product.price),
                  }))
                );
              },
              error: (error) => reject(error.message),
            });
          })
      );
  },
};
