<template>
  <div class="field">
    <label class="label">{{ label }}:</label>
    <div class="control">
      <div class="select is-fullwidth">
        <select
          :value="value"
          :disabled="disabled"
          @change="$emit('input', $event.target.value)"
        >
          <option
            :value="null"
          >
            - Veljið
          </option>
          <option
            v-for="opt in options"
            :key="opt.value"
            :value="opt.value"
            :selected="opt.value === value"
          >
            {{ opt.text }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Select',
  props: {
    label: {
      type: String,
      required: true
    },
    options: {
      type: Array,
      default: () => []
    },
    value: {
      type: [String, Number, Boolean],
      default: ''
    },
    disabled: {
      type: Boolean,
      default: true
    }
  }
}
</script>
