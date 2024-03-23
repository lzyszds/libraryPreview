import { useLocalStorage } from '@vueuse/core'
import axios from 'axios'

const headers = {
  'token': useLocalStorage('token', '').value
}
console.log(`lzy  headers:`, headers)

/**
 * 根据用户id获取用户借阅书籍列表
 *  @param userId 用户id
 * @returns
 * 
*/
export const getBorrowedBooks = async () => {
  try {
    const response = await axios.get(`/admin/Api/BookLoan/getBorrowedBooks`, {
      headers
    }) as any;
    return response.data.data
  } catch (e) { }
}

/**
 * 根据用户id获取用户借阅书籍详情
 *  @param userId 用户id
 * @returns
 * 
*/
export const getBookLoanByUserId = async () => {
  try {
    const response = await axios.get(`/admin/Api/BookLoan/getBookLoanByUserId`, {
      headers
    }) as any;
    return response.data.data
  } catch (e) { }
}


/**
 * 借书接口
 * @param bookId 书籍id
 * @param copyId 书籍副本id
 * @returns
*/
export const borrowBook = async (bookId: number) => {
  try {
    const response = await axios.post(`/admin/Api/BookLoan/borrowingBook`, {
      bookId
    }, {
      headers
    }) as any;
    return response.data
  } catch (e) { }
}
