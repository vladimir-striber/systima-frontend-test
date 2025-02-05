import { defineStore } from 'pinia';
import axios from 'axios';
import type { User } from "@/types/userTypes.ts";

export const useUserStore = defineStore('userStore', {
  state: () => ({
    users: [] as User,
  }),

  actions: {
    async fetchUsers() {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        this.users = response.data as User;
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
  },
});
