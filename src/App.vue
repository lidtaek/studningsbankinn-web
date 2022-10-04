<template>
  <div>
    <nav class="navbar is-white mb-5">
      <div class="navbar-brand">
        <a
          class="navbar-item"
          href="/#/login"
        >
          <span class="icon">
            <i class="fas fa-wheelchair fa-2x" />
          </span>
          <div
            class="has-text-primary"
            style="margin-left: 5px; "
          >STUÐNINGSBANKINN</div>
        </a>

        <a
          role="button"
          class="navbar-burger"
          :class="{ 'is-active': burger }"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbar"
          @click="burger = !burger"
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </a>
      </div>

      <div
        v-if="user.isAdmin || user.isOrganization"
        id="navbar"
        class="navbar-menu"
        :class="{'is-active': burger }"
      >
        <div class="navbar-start">
          <router-link
            to="/places"
            class="navbar-item"
            active-class="is-active"
          >
            Staðir
          </router-link>

          <router-link
            to="/placecategories"
            class="navbar-item"
            active-class="is-active"
          >
            Staðarflokkar
          </router-link>

          <router-link
            to="/questions"
            class="navbar-item"
            active-class="is-active"
          >
            Spurningar
          </router-link>

          <router-link
            to="/questioncategories"
            class="navbar-item"
            active-class="is-active"
          >
            Spurningaflokkar
          </router-link>

          <router-link
            to="/questionnaires"
            class="navbar-item"
            active-class="is-active"
          >
            Spurningalistar
          </router-link>

          <router-link
            to="/answers"
            class="navbar-item"
            active-class="is-active"
          >
            Svörun
          </router-link>

          <router-link
            to="/votes"
            class="navbar-item"
            active-class="is-active"
          >
            Atkvæði
          </router-link>

          <router-link
            to="/users"
            class="navbar-item"
            active-class="is-active"
          >
            Notendur
          </router-link>
        </div>
        <hr class="navbar-divider">
        <LoginNavbar
          v-if="!isQuestionnairePage && !isLoginPage"
          :user="user"
          @login="login"
          @logout="logout"
        />
      </div>
    </nav>

    <div class="container">
      <div class="columns">
        <div class="column is-8 is-offset-2">
          <main>
            <router-view
              :user="user"
              @login="login"
              @logout="logout"
            />
          </main>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import getUser from './getUser'
import EditMixin from './_mixins/edit'
import LoginNavbar from './_components/loginnavbar'

export default {
  name: 'App',
  components: { LoginNavbar },
  mixins: [EditMixin],
  data () {
    return {
      user: {},
      burger: false
    }
  },
  computed: {
    isLoggedIn () {
      return this.user.name !== undefined
    },
    isLoginPage () {
      return this.$route.name === 'Login'
    },
    isQuestionnairePage () {
      return this.$route.name === 'Questionnaire'
    }
  },
  mounted () {
    getUser()
      .then(user => {
        this.user = user
      })
      .catch(e => {
        this.user = {}
      })
  },
  methods: {
    login (user) {
      this.user = user
      this.$router.go()
    },
    logout () {
      this.user = {}
      this.$router.push({
        name: 'Login'
      })
    }
  }
}

</script>

<style>
html, body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
  font-size: 16px;
  line-height: 1.5;
  height: 100%;
  background: #ECF0F3;
}

.navbar {
  box-shadow: 0 3px 8px #888888;
}
</style>
