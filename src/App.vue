<template>
  <div>
    <nav class="navbar is-white">
      <div class="navbar-brand">
        <a
          class="navbar-item"
          href="/#/login"
        >
          STUÐNINGSBANKINN
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
      this.$router.go()
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
nav.navbar {
  border-top: 4px solid #276cda;
  margin-bottom: 1rem;
}
.navbar-item.brand-text {
  font-weight: 300;
}
.navbar-item, .navbar-link {
  font-size: 14px;
  font-weight: 700;
}
.columns {
  width: 100%;
  height: 100%;
  margin-left: 0;
}
.menu-label {
  color: #8F99A3;
  letter-spacing: 1.3;
  font-weight: 700;
}
.menu-list a {
  color: #0F1D38;
  font-size: 14px;
  font-weight: 700;
}
.menu-list a:hover {
  background-color: transparent;
  color: #276cda;
}
.menu-list a.is-active {
  background-color: transparent;
  color: #276cda;
  font-weight: 700;
}
.card {
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.18);
  margin-bottom: 2rem;
}
.card-header-title {
  color: #8F99A3;
  font-weight: 400;
}
.info-tiles {
  margin: 1rem 0;
}
.info-tiles .subtitle {
  font-weight: 300;
  color: #8F99A3;
}
.hero.welcome.is-info {
  background: #36D1DC;
  background: -webkit-linear-gradient(to right, #5B86E5, #36D1DC);
  background: linear-gradient(to right, #5B86E5, #36D1DC);
}
.hero.welcome .title, .hero.welcome .subtitle {
  color: hsl(192, 17%, 99%);
}
.card .content {
  font-size: 14px;
}
.card-footer-item {
  font-size: 14px;
  font-weight: 700;
  color: #8F99A3;
}
.card-footer-item:hover {
}
.card-table .table {
  margin-bottom: 0;
}
.events-card .card-table {
  max-height: 250px;
  overflow-y: scroll;
}
</style>
