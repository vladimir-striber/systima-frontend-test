<template>
  <v-data-table
    :headers="tableHeaders"
    :items="users"
    :loading="isLoading"
    hide-default-footer
    item-key="id"
    theme="dark"
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
        @click="handleRowClick(item.id)"
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
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import type { User, TableHeader } from '@/types/userTypes.ts';
import type { PropType } from 'vue';

const props = defineProps({
  users: {
    type: Array as PropType<User[]>,
    default: () => []
  },

  isLoading: {
    type: Boolean,
    default: false
  }
});

const router = useRouter();

const tableHeaders: TableHeader[] = [
  { title: 'Name', align: 'start', key: 'name' },
  { title: 'Email', align: 'start', key: 'email' },
  { title: 'Phone', align: 'start', key: 'phone' },
  { title: 'Company', align: 'start', key: 'company.name' },
]

const handleRowClick = (userId: number) => {
  router.push({ name: 'userDetails', params: { id: userId } });
};

</script>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;

.users-table {
  :deep(thead) {
    background-color: $dark-grey !important;
  }
  &__row {
    &:hover {
      background-color: $dark-grey-mute;
    }
    &:active {
      background-color: $dark-grey-hover;
    }
  }
  &__cell {
    cursor: pointer;
  }
}
</style>
