<template>
  <div
    v-if="show"
    class="notification"
    :class="classes"
  >
    <button
      class="delete"
      @click="close()"
    />
    {{ message }}
  </div>
</template>

<script>
export default {
  name: 'Notification',
  props: {
    message: {
      type: String,
      required: false,
      default: ''
    },
    success: {
      type: Boolean,
      required: false,
      default: false
    },
    error: {
      type: Boolean,
      required: false,
      default: false

    }
  },
  data () {
    return {
      successNotification: this.success,
      errorNotification: this.error
    }
  },
  computed: {
    classes () {
      return {
        'is-success': this.success,
        'is-danger': this.error
      }
    },
    show () {
      return this.successNotification || this.errorNotification
    }
  },
  watch: {
    error (val) {
      this.errorNotification = val
    },
    success (val) {
      this.successNotification = val

      if (val) {
        setTimeout(() => {
          this.close()
        }, 2000)
      }
    }
  },
  methods: {
    close () {
      this.successNotification = false
      this.errorNotification = false
    }
  }
}
</script>
