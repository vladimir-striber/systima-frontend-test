<template>
  <v-container>
    <h1 class="mb-16 d-flex justify-center">
      <span>User List</span>
    </h1>
    <v-card>
      <v-data-table
        :headers="tableHeaders"
        :items="users"
        :loading="loading"
        hide-default-footer
        item-key="id"
        class="users-table elevation-2"
      >
        <template v-slot:loading>
          <v-skeleton-loader
            type="table-row-divider@10"
          >
          </v-skeleton-loader>
        </template>

        <template v-slot:item="{ item }">
          <tr
            class="users-table__row"
            @click="handleRowClick(item)"
          >
            <td class="users-table__cell">
              {{ item.name }}
            </td>
            <td class="users-table__cell">
              {{ item.email }}
            </td>
            <td class="users-table__cell">
              {{ item.phone }}
            </td>
            <td class="users-table__cell">
              {{ item.company.name }}
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, shallowRef } from 'vue'
import { useUserStore } from '@/stores/userStore';
import { type TableHeader, User } from '@/types/userTypes';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();

const loading = shallowRef<boolean>(false);
const timeoutId = ref<ReturnType<typeof setTimeout> | null>(null);

const users = computed(() => {
  return userStore.users;
})

const tableHeaders: TableHeader[] = [
  { title: 'Name', align: 'start', key: 'name' },
  { title: 'Email', align: 'start', key: 'email' },
  { title: 'Phone', align: 'start', key: 'phone' },
  { title: 'Company', align: 'start', key: 'company.name' },
]

const handleRowClick = (user: User) => {
  router.push({ name: 'userDetails', params: { id: user.id } });
};

const handleFetchUsers = async () => {
  loading.value = true;
  /** I wanted to show the loading state, so I used setTimeout();
   *  I wouldn't use this in a real life situation
   */
  timeoutId.value = setTimeout( () => {
    fetchUsers();
    loading.value = false;
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
@use "@/assets/styles/variables" as *;

.users-table {
  :deep(thead) {
    background-color: $dark-grey !important;
  }
  &__row {
    &:hover {
      background-color: $light-grey;
    }
    &:active {
      background-color: $grey;
    }
  }
  &__cell {
    cursor: pointer;
  }
}

</style>
