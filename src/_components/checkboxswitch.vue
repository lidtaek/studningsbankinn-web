<template>
  <div class="field">
    <input
      :id="id"
      :value="value"
      :checked="isChecked"
      :disabled="disabled"
      type="checkbox"
      class="switch is-rounded"
      @change="updateInput"
    >
    <label :for="id" />
  </div>
</template>

<script>
export default {
  name: 'CheckboxSwitch',
  model: {
    prop: 'modelValue',
    event: 'change'
  },
  props: {
    id: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    value: {
      type: [String, Number, Boolean],
      required: true
    },
    modelValue: {
      type: [Array, String, Number, Boolean],
      required: true
    },
    label: {
      type: [Array, String],
      required: false,
      default: undefined
    }
  },
  computed: {
    isChecked () {
      if (Array.isArray(this.modelValue)) {
        return this.modelValue.includes(this.value)
      }

      return this.modelValue === this.value
    }
  },
  methods: {
    updateInput (event) {
      const isChecked = event.target.checked
      const value = event.target.value

      if (Array.isArray(this.modelValue)) {
        const newModelValue = [...this.modelValue]

        if (isChecked) {
          newModelValue.push(value)
        } else {
          newModelValue.splice(newModelValue.indexOf(value), 1)
        }
        this.$emit('change', newModelValue)
      } else {
        this.$emit('change', isChecked)
      }
    }
  }
}
</script>

<style scoped>
@import '../../node_modules/bulma-switch/dist/css/bulma-switch.min.css';
</style>
