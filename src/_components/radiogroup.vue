<template>
<div class="field">
  <div class="control">
    <div v-if="label" class="mb-2">
      {{ label }}
    </div>
    <label class="radio">
      <input
        type="radio"
        :value="true"
        :checked="modelValue === true"
        @change="changeInput"
      />
      Já
    </label>
    <label class="radio">
      <input
        type="radio"        
        :value="false"
        :checked="modelValue === false"
        @change="changeInput"
      />
      Nei
    </label>
    <label class="radio">
      <input
        type="radio"        
        :value="undefined"
        :checked="modelValue === undefined || modelValue === null"
        @change="changeInput"
      />      
      Á ekki við
    </label>
  </div>
</div>
</template>

<script>
export default {
  name: 'RadioGroup',
  model: {
    prop: 'modelValue',
    event: 'change'
  },
  props: {
    modelValue: {
      type: [Boolean, undefined],
      required: false
    },
    disabled: {
      type: Boolean,
      default: true
    },
    label: {
      type: [String],
      required: false,
      default: ''
    }
  },
  methods: {
    changeInput(event) {
      console.log(event.target._value)
      this.$emit('change', event.target._value)
    }
  }
}
</script>


