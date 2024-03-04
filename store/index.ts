import { defineStore } from 'pinia'
import type { User } from "../types/user";

export const useStore = defineStore('#app', {
  state: () => ({
    userInfo: {} as User
  }),
  actions: {
  }
})
