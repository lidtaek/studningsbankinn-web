<template>
  <section class="hero is-primary">
    <div class="hero-body">
      <div class="container">
        <button
          v-if="x"
          class="delete is-large"
          @click="close"
        />
        <h1 class="title">
          {{ title }}
        </h1>
        <h2
          v-if="subtitle"
          class="subtitle"
        >
          {{ subtitle }}
        </h2>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Hero',
  props: {
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      required: false,
      default: undefined
    },
    x: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  methods: {
    close () {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
button.delete {
  position: absolute;
  right : 0;
  top: -30px;
}
</style>
