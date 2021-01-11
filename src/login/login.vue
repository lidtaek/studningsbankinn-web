<template>
  <div
    class="column"
    :class="{
      'is-8 is-offset-2': user.name === undefined,
      'is-9': user.name !== undefined
    }"
  >
    <div class="box">
      <Notification
        :message="message"
        :success="success"
        :error="error"
      />
      <div v-if="user.name">
        <h1 class="title is-4">
          Velkominn í Stuðningsbankann
        </h1>
        <p>Þú ert skráður inn undir nafninu <em>{{ user.name }}</em> með notendanafninu {{ user.username }}</p>
        <button
          type="button"
          class="button is-primary mt-3"
          @click.prevent="logout()"
        >
          Útskrá
        </button>
      </div>
      <form v-else>
        <div class="field">
          <div class="control">
            <input
              v-model="username"
              class="input is-large"
              type="text"
              placeholder="Notendanafafn"
              autofocus=""
            >
          </div>
        </div>

        <div class="field">
          <div class="control">
            <input
              v-model="password"
              class="input is-large"
              type="password"
              placeholder="Lykilorð"
            >
          </div>
        </div>
        <button
          class="button is-block is-primary is-large is-fullwidth"
          @click.prevent="loginHandler"
        >
          Innskrá
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import Notification from '../_components/notification'
import LoginMixin from '../_mixins/login'
import EditMixin from '../_mixins/edit'

export default {
  name: 'Login',
  components: { Notification },
  mixins: [LoginMixin, EditMixin],
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  methods: {
    loginHandler () {
      this.login()
        .catch((e) => {
          if (e.status === 401) {
            this.error = true
            this.message = 'Rangt notendanafn eða lykilorð'
          } else {
            this.error = true
            this.message = 'Villa kom upp við innskráningu'
          }
        })
    }
  }
}
</script>
