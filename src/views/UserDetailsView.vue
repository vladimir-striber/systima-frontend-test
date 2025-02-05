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
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import AppButton from '@/components/shared/AppButton.vue';
import AppIconButton from '@/components/shared/AppIconButton.vue';

const router = useRouter();

const screenType: String = ref('');

const showSmallBackButton: Boolean = computed (() => {
  return screenType.value === 'mobile';
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

onMounted(() => {
  updateScreenType();

  window.addEventListener('resize', updateScreenType);
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
