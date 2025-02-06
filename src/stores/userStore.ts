import { defineStore } from 'pinia';
import axios from 'axios';
import type { User, UserResponse } from '@/types/userTypes.ts'

export const useUserStore = defineStore('userStore', {
  state: () => ({
    users: [] as User[],
    user: {} as User,
  }),

  actions: {
    async fetchUsers() {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        this.users = response.data as UserResponse;
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },

    async fetchSingleUser(routeId: string) {
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/users/${routeId}`
        );
        this.user = response.data as User;
      } catch (error) {
        console.error('Error fetching single user:', error);
      }
    },

    resetUser() {
      this.user = {};
    }
  },
});
