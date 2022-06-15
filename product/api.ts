import axios from "axios";
import Papa from "papaparse";

import { Product } from "./types";

export default {
  list: async (): Promise<Array<Product>> => {
    return axios
      .get(
        "https://docs.google.com/spreadsheets/d/e/2PACX-1vT511xYEJYa8zW63XMWp-gP6CpqJs0jUGIzK-DW6HesAjNwneTyAiIe9ILHFW7e7EWxCXnClQq5pNQd/pub?gid=0&single=true&output=csv",
        {
          responseType: "blob",
        }
      )
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
