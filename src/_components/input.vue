<template>
  <div class="field">
    <label
      v-if="label"
      class="label"
    >
      {{ label }}:
    </label>
    <div class="control">
      <input
        :value="value"
        :disabled="disabled"
        :readonly="readonly"
        class="input"
        :class="{ 'is-static': readonly }"
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
      required: false,
      default: ''
    },
    value: {
      type: [String, Number],
      default: ''
    },
    disabled: {
      type: Boolean,
      default: true
    },
    readonly: {
      type: Boolean,
      default: false
    }
  }
}
</script>
