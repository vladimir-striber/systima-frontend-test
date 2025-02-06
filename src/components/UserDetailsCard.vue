<template>
  <v-row justify="center">
    <v-col cols="12" lg="8">
      <v-card
        class="mx-auto pa-4 bg-grey-darken-4"
      >
        <v-card-item>
          <template v-if="isLoading">
            <v-skeleton-loader
              class="mx-0 mb-4"
              type="text"
              height="42px"
              width="33%"
            >
            </v-skeleton-loader>

            <div v-for="index in 6" :key="index" class="mb-2 d-flex">
              <v-skeleton-loader
                type="text"
                height="42px"
                width="20%"
                class="mb-1 mr-8"
              >
              </v-skeleton-loader>
              <v-skeleton-loader
                type="text"
                height="42px"
                width="50%"
              >
              </v-skeleton-loader>
            </div>
          </template>

          <template v-else>
            <div>
              <div class="text-h5 mb-6">
                {{ user.name }}
              </div>
              <div
                v-for="([key, value]) in reducedUserDetails"
                :key="key"
                class="text-body-1 mb-4 d-flex align-baseline flex-column flex-sm-row"
              >
              <span class="text-overline w-sm-25 d-inline-block">
                {{ key }}:
              </span>
                <span class="text-body-1">
                {{ detailValue(key, value) }}
              </span>
              </div>
            </div>
          </template>
        </v-card-item>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { computed, type PropType } from 'vue';
import type { User, UserKeyValue } from '@/types/userTypes.ts'

const props = defineProps({
  user: {
    type: Object as PropType<User>,
    default: () => ({})
  },

  isLoading: {
    type: Boolean,
    default: false
  }
});

const reducedUserDetails = computed<UserKeyValue[]>(() => {
  const userCopy = { ...props.user };

  delete userCopy.name;
  delete userCopy.id;

  return Object.entries(userCopy);
})

const detailValue = (key: string, value: unknown): string => {
  if (key === 'address') {
    return `${value.street}, ${value.suite}, ${value.city}, ${value.zipcode}`;
  } else if (key === 'company') {
    return `${value.name}, ${value.catchPhrase}`
  } else {
    return value;
  }
}
</script>

<style scoped lang="scss">

:deep(.v-skeleton-loader__text) {
  margin: 0 !important;
}

</style>
