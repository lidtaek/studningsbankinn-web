<template>
  <div class="field">
    <label class="label">{{ label }}</label>
    <div class="control">
      <input
        :value="value"
        :disabled="disabled"
        class="input"
        type="text"
        @input="$emit('input', $event.target.value)"
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'Input',
  props: {
    label: {
      type: String,
      required: true
    },
    value: {
      type: [String, Number],
      default: ''
    },
    disabled: {
      type: Boolean,
      default: true
    }
  }
}
</script>
