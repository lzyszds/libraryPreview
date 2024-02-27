import http from "./http"
const host = import.meta.env.VITE_APP_HOST;

export const getBooklist = async () => {
  const response = await useFetch(`${host}/Api/Book/getBookList?page=1&limit=5`, {
    method: "GET",
  }) as any;
  return response.data.value;
}
