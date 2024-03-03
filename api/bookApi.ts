const host = import.meta.env.VITE_APP_HOST;


/**
 * 模糊查询以及指定页数的书籍列表
 * @param keyword 关键字
 * @param page 页数
 * @param limit 每页数量
 * @returns
 */

export const getBookList = async (keyword: string, page: number, limit: number) => {
  const response = await useFetch(`${host}/Api/Book/getBookList`, { 
    method: "GET",
    params: {
      search: keyword,
      page: page,
      limit: limit
    }
  }) as any;
  return response.data.value;
}

/**
 * 获取热门书籍列表
 * @returns
 */
export const getHotBookList = async () => {
  const response = await useFetch(`${host}/Api/Book/getHotBookList`, {
    method: "GET",
  }) as any;
  return response.data.value;
}

/**
 * 获取新书列表
 * @returns
 */
export const getNewBookList = async () => {
  const response = await useFetch(`${host}/Api/Book/getNewBookList`, {
    method: "GET",
  }) as any;
  return response.data.value;

}

/**
 * 获取书籍指定字段名模糊查询列表
  * @param keyword 关键字
  * @param page 页数
  * @param limit 每页数量
  * @param field 字段名
  * @returns
  */
export const getBookListByField = async (keyword: string, page: number, limit: number, field: string) => {
  const response = await useFetch(`${host}/Api/Book/getBookListByField`, {
    method: "GET",
    params: {
      search: keyword,
      page: page,
      limit: limit,
      field: field
    }
  }) as any;
  return response.data.value;
}

/** 
 * 获取分类书籍量最大的分类前n项
 * @param limit 限制数量
 *  @returns
*/

export const getTopNCategories = async (limit: number) => {
  const response = await useFetch(`${host}/Api/Book/getTopNCategories`, {
    method: "GET",
    params: {
      limit: limit
    }
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
