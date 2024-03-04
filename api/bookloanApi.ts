import { useLocalStorage } from '@vueuse/core'
import axios from 'axios'

/**
 * 根据用户id获取用户借阅书籍列表
 *  @param userId 用户id
 * @returns
 * 
*/
export const getBorrowedBooks = async () => {
  try {
    const response = await axios.get(`/admin/Api/BookLoan/getBorrowedBooks`, {
      headers: {
        'token': useLocalStorage('token', '').value
      }
    }) as any;
    return response.data.data
  } catch (e) { }
}
