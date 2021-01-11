<template>
  <div class="column is-8 is-offset-2">
    <div class="box">
      <Notification
        :message="message"
        :success="success"
        :error="error"
      />
      <form>
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
          @click.prevent="loginhandler"
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
  methods: {
    loginhandler () {
      this.login()
        .then(user => {
          this.$router.push({
            name: 'ListPlaces'
          })
        })
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
