import http from "./http"

export const getBooklist = async () => {
  const response = await http('get', `/Book/getBookList?page=1&limit=5`);
  return response.data;
}
