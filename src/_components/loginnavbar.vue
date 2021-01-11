<template>
  <form
    class="navbar-end"
    :class="{ 'shake': error }"
  >
    <div
      v-if="user.name"
      class="navbar-item"
    >
      {{ user.name }} ({{ user.placeName || 'stjórnandi' }})
    </div>

    <div
      v-if="user.name"
      class="navbar-item"
    >
      <div class="field">
        <div class="control">
          <button
            type="submit"
            class="button is-small is-primary"
            @click.prevent="logout()"
          >
            Útskrá
          </button>
        </div>
      </div>
    </div>

    <div
      v-if="!user.name"
      class="navbar-item"
    >
      <div class="field">
        <div class="control">
          <input
            v-model="username"
            class="input is-small"
            type="text"
            placeholder="Notendanafn"
          >
        </div>
      </div>
    </div>

    <div
      v-if="!user.name"
      class="navbar-item"
    >
      <div class="field">
        <div class="control">
          <input
            v-model="password"
            class="input is-small"
            type="password"
            placeholder="Lykilorð"
          >
        </div>
      </div>
    </div>

    <div
      v-if="!user.name"
      class="navbar-item"
    >
      <div class="field">
        <div class="control">
          <button
            type="submit"
            class="button is-small is-primary"
            @click.prevent="loginhandler"
          >
            Innskrá
          </button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import LoginMixin from '../_mixins/login'

export default {
  name: 'LoginNavbar',
  mixins: [LoginMixin],
  props: {
    user: {
      type: Object,
      required: false,
      default: () => {}
    }
  },
  data () {
    return {
      error: false
    }
  },
  methods: {
    loginhandler () {
      console.log('loginhandler')
      this.login()
        .then(user => {
          this.$router.go()
        })
        .catch(() => {
          this.error = true
          setTimeout(() => {
            this.error = false
          }, 500)
        })
    }
  }
}
</script>

<style scoped>
@keyframes shake {
  0% {
    transform: translate(0);
  }
  20% {
    transform: translate(3em);
  }
  40% {
    transform: translate(-3em);
  }
  60% {
    transform: translate(3em);
  }
  80% {
    transform: translate(-3em);
  }
  100% {
    transform: translate(0);
  }
}
form.shake {
  animation: shake 0.5s infinite;
}
</style>
