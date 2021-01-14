<template>
  <div class="field">
    <label class="label">{{ label }}:</label>
    <div class="control">
      <textarea
        :value="value"
        :disabled="disabled"
        class="textarea"
        rows="2"
        @input="$emit('input', $event.target.value)"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Textarea',
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
