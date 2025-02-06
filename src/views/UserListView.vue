<template>
  <v-container>
    <h1 class="mb-16 d-flex justify-center">
      <span>User List</span>
    </h1>
    <v-card>
      <UserListTable
        :users="users"
        :isLoading="isLoading"
      />
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, shallowRef } from 'vue'
import { useUserStore } from '@/stores/userStore';
import UserListTable from '@/components/UserListTable.vue';
import type { User } from '@/types/userTypes.ts';

const userStore = useUserStore();

const isLoading = shallowRef<boolean>(false);
const timeoutId = ref<ReturnType<typeof setTimeout> | null>(null);

const users = computed<User[]>(() => {
  return userStore.users;
})

const handleFetchUsers = async () => {
  isLoading.value = true;
  /** I wanted to show the loading state, so I used setTimeout();
   *  I wouldn't use this in a real life situation
   */
  timeoutId.value = setTimeout( () => {
    fetchUsers();
    isLoading.value = false;
  }, 2000)
}

const fetchUsers = async () => {
  await userStore.fetchUsers();
}

onMounted( () => {
  handleFetchUsers();
});

onUnmounted(() => {
  if (timeoutId.value) {
    clearTimeout(timeoutId.value);
  }
})

</script>

<style lang="scss" scoped>

</style>
