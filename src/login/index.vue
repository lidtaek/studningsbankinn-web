<template>
  <div class="navbar-end">
    <div class="navbar-item">
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

    <div class="navbar-item">
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

    <div class="navbar-item">
      <div class="field">
        <div class="control">
          <button
            class="button is-small is-primary"
            @click="login()"
          >
            Innskrá
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import agent from 'superagent'

export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login () {
      const url = process.env.STUDNINGSBANKINN_API_URL + '/login'

      return agent
        .post(url)
        .withCredentials()
        .send({
          username: this.username,
          password: this.password
        })
        .then(res => {
          console.log(res.body)
        })
    }
  }
}
</script>
