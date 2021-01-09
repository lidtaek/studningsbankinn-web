<template>
  <div class="field">
    <div class="control">
      <button
        :disabled="disabled"
        :class="'is-' + type"
        class="button"
        @click="$emit('click')"
      >
        {{ label }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Button',
  props: {
    type: {
      type: String,
      required: false,
      default: 'primary'
    },
    label: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: true
    }
  }
}
</script>
