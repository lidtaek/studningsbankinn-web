<template>
  <div class="field">
    <label class="label">{{ label }}:</label>
    <div class="control">
      <div class="select is-fullwidth">
        <select
          :disabled="disabled"
          @change="$emit('change', $event.target.value)"
        >
          <option
            :value="undefined"
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
