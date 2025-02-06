<template>
  <v-card>
    <template v-slot:text>
      <v-text-field
        v-model="search"
        label="Search"
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        hide-details
        single-line
      >
      </v-text-field>
    </template>

    <v-data-table
      :headers="tableHeaders"
      :items="users"
      :loading="isLoading"
      :search="search"
      hide-default-footer
      item-key="id"
      class="users-table elevation-2"
    >
      <template v-slot:loading>
        <v-skeleton-loader type="table-row-divider@10">
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
  </v-card>
</template>

<script setup lang="ts">
import type { User, TableHeader } from '@/types/userTypes.ts';
import { type PropType, ref } from 'vue';

defineProps({
  users: {
    type: Array as PropType<User[]>,
    default: () => []
  },

  isLoading: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['goToUserDetails']);

const search = ref<string>('');

const tableHeaders = ref<TableHeader[]>([
  { title: 'Name', align: 'start', key: 'name' },
  { title: 'Email', align: 'start', key: 'email' },
  { title: 'Phone', align: 'start', key: 'phone' },
  { title: 'Company', align: 'start', key: 'company.name' },
])

const handleRowClick = (userId: number): void => {
  emit('goToUserDetails', userId);
};

</script>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;

.users-table {
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
