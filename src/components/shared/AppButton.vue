<template>
  <v-btn
    :class="buttonClass"
    :variant="type"
    @click="handleClick"
  >
    <v-icon
      v-if="icon"
      class="mr-2"
    >
      {{ icon }}
    </v-icon>
    {{ buttonText }}
  </v-btn>
</template>

<script setup lang="ts">

defineProps({
  buttonText: {
    type: String,
    default: ''
  },

  type: {
    type: String,
    default: 'outlined'
  },

  icon: {
    type: String,
    default: ''
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
