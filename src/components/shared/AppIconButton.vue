<template>
  <v-btn
    :class="buttonClass"
    :icon="icon"
    :variant="type"
    :size="size"
    @click="handleClick"
  >
  </v-btn>
</template>

<script setup lang="ts">

const props = defineProps({
  icon: {
    icon: String,
    default: ''
  },

  size: {
    type: String,
    default: 'x-small'
  },

  type: {
    type: String,
    default: 'outlined'
  },

  buttonClass: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['onClick']);

const handleClick = () => {
  emit('onClick');
}

</script>

<style scoped lang="scss">

</style>

