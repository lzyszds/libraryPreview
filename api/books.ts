const host = import.meta.env.VITE_APP_HOST;

// 获取书籍列表
export const getBooklist = async () => {
  const response = await useFetch(`${host}/Api/Book/getBookList?page=1&limit=5`, {
    method: "GET",
  }) as any;
  return response.data.value;
}

/**
 * 模糊查询以及指定页数的书籍列表
 * @param keyword 关键字
 * @param page 页数
 * @param limit 每页数量
 * @returns
 */

export const searchBook = async (keyword: string, page: number, limit: number) => {
  const response = await useFetch(`${host}/Api/Book/getBookList?search=${keyword}&page=${page}&limit=${limit}`, {
    method: "GET",
  }) as any;
  return response.data.value;
}


/**
 * 通过id获取书籍详情
 * @param id 书籍id
 */

export const getBookInfo = async (id: string) => {
  const response = await useFetch(`${host}/Api/Book/getBookInfo?bookId=${id}`, {
    method: "GET",
  }) as any;
  return response.data.value;
}
