<template>
  <v-container class="user-details">
    <h1 class="user-details__heading mb-16 d-flex justify-center align-center">
      <AppIconButton
        v-if="showSmallBackButton"
        :icon="'mdi-arrow-left'"
        :button-class="'user-details__back-button'"
        @on-click="handleGoBack"
      />
      <AppButton
        v-else
        :button-text="'Back'"
        :icon="'mdi-arrow-left'"
        :button-class="'user-details__back-button'"
        @on-click="handleGoBack"
      />
      <span class="user-details__title">User Details</span>
    </h1>
  </v-container>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, shallowRef } from 'vue'
import { useUserStore } from '@/stores/userStore.ts';
import { useRoute, useRouter } from 'vue-router';
import AppButton from '@/components/shared/AppButton.vue';
import AppIconButton from '@/components/shared/AppIconButton.vue';

const userStore = useUserStore();
const router = useRouter();
const route = useRoute();

const screenType = ref<string>('');
const loading = shallowRef<boolean>(false);
const timeoutId = ref<ReturnType<typeof setTimeout> | null>(null);

const showSmallBackButton = computed<boolean>(() => {
  return screenType.value === 'mobile';
});

const routeId = computed<string>(() => {
  return route.params.id;
})

const handleGoBack = () => {
  router.back();
}

const updateScreenType = () => {
  const windowWidth = window.innerWidth;

  if (windowWidth < 678) {
    screenType.value = 'mobile';
  } else if (windowWidth < 1024) {
    screenType.value = 'tablet';
  } else {
    screenType.value = 'desktop';
  }
}

const handleFetchSingleUser = () => {
  loading.value = true;
  /** I wanted to show the loading state, so I used setTimeout();
   *  I wouldn't use this in a real life situation
   */
  timeoutId.value = setTimeout( () => {
    fetchSingleUser();
    loading.value = false;
  }, 2000)
}

const fetchSingleUser = async () => {
  await userStore.fetchSingleUser(routeId.value);
}

onMounted(async () => {
  updateScreenType();

  if (routeId.value) {
    handleFetchSingleUser();
  }

  window.addEventListener('resize', updateScreenType);
})

onUnmounted(() => {
  if (timeoutId.value) {
    clearTimeout(timeoutId.value);
  }

  window.removeEventListener('resize', updateScreenType);
})
</script>

<style lang="scss" scoped>
.user-details {
  &__heading {
    position: relative;
  }
  &__back-button {
    position: absolute;
    left: 0;
  }
}
</style>
