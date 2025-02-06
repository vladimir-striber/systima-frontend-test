<template>
  <v-row justify="center">
<!--    <v-col v-if="isLoading" cols="12" md="6">-->
<!--      <v-skeleton-loader-->
<!--        class="mx-auto border"-->
<!--        max-width="300"-->
<!--        type="card-avatar, actions"-->
<!--        theme="dark"-->
<!--      ></v-skeleton-loader>-->
<!--    </v-col>-->
    <v-col cols="12" lg="8">
      <v-card
        :loading="isLoading"
        :variant="'tonal'"
        class="mx-auto pa-4"
      >
        <v-card-item>
          <div>
            <div class="text-h5 mb-6">
              {{ user.name }}
            </div>
            <div
              v-for="([key, value]) in userDetailsWithoutName"
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
        </v-card-item>

      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { computed, type PropType } from 'vue';
import type { User, UserWithoutName } from '@/types/userTypes.ts';

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

const userDetailsWithoutName = computed<UserWithoutName>(() => {
  const { name, id, ...rest } = props.user;
  return Object.entries(rest);
})

const detailValue = (key, value) => {
  console.log(typeof key, key, value);

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

</style>
