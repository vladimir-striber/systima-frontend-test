<template>
  <v-container>
    <h1 class="mb-16 d-flex justify-center">
      <span>User List</span>
    </h1>
    <UserListTable
      :users="users"
      :isLoading="isLoading"
      @goToUserDetails="handleGoToUserDetails"
    />
  </v-container>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useUserStore } from '@/stores/userStore';
import { useRouter } from 'vue-router';
import UserListTable from '@/components/UserListTable.vue';
import type { User } from '@/types/userTypes.ts';

const userStore = useUserStore();
const router = useRouter();

const isLoading = ref<boolean>(false);
const timeoutId = ref<ReturnType<typeof setTimeout> | null>(null);

const users = computed<User[]>(() => {
  return userStore.users;
})

const handleFetchUsers = (): void => {
  isLoading.value = true;
  /** I wanted to show the loading state, so I used setTimeout();
   *  I wouldn't use this in a real life situation;
   */
  timeoutId.value = setTimeout( () => {
    fetchUsers();
    isLoading.value = false;
  }, 2000)
}

const fetchUsers = async (): Promise<void> => {
  await userStore.fetchUsers();
}

const handleGoToUserDetails = (userId: string): void => {
  router.push({ name: 'userDetails', params: { id: userId } });
}

onMounted( (): void => {
  handleFetchUsers();
});

onUnmounted((): void => {
  if (timeoutId.value) {
    clearTimeout(timeoutId.value);
  }
})

</script>

<style lang="scss" scoped>

</style>
