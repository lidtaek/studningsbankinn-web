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
        :class="classList"
        type="text"
        @input="$emit('input', $event.target.value)"
        :placeholder="placeholder"
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'Input',
  props: {
    size: {
      type: String,
      required: false,
      default: 'normal'
    },
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
    },
    placeholder: {
      type: String,
      required: false,
      default: ''
    }
  },
  computed: {
    classList () {      
      const size =  'is-' + this.size
      const isStatic = this.readonly ? 'is-static' : ''

      return [size, isStatic]
    }
  }
}
</script>
 