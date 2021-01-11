<template>
  <div>
    <nav class="navbar is-white">
      <div class="navbar-brand">
        <a
          class="navbar-item"
          href="#"
        >
          STUÐNINGSBANKINN
        </a>

        <a
          role="button"
          class="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </a>
      </div>

      <div class="navbar-menu">
        <LoginNavbar
          v-if="!fullView"
          :user="user"
          @login="login"
          @logout="logout"
        />
      </div>
    </nav>

    <div class="container">
      <div
        class="columns"
      >
        <div
          v-if="!fullView"
          class="column is-3"
        >
          <aside
            v-if="!loggedOut"
            class="menu"
          >
            <p class="menu-label">
              Gagnagrunnur
            </p>
            <ul class="menu-list">
              <li>
                <router-link
                  to="/places"
                  active-class="is-active"
                >
                  Staðir
                </router-link>
              </li>
              <li>
                <router-link
                  to="/questions"
                  active-class="is-active"
                >
                  Spurningar
                </router-link>
              </li>
              <li>
                <router-link
                  to="/questioncategories"
                  active-class="is-active"
                >
                  Spurningaflokkar
                </router-link>
              </li>
            </ul>
            <p class="menu-label">
              Kerfi
            </p>
            <ul class="menu-list">
              <li>
                <router-link
                  to="/answers"
                  active-class="is-active"
                >
                  Svör
                </router-link>
                <router-link
                  to="/questionnaire"
                  active-class="is-active"
                >
                  Spurningalistar
                </router-link>
              </li>
            </ul>
            <p class="menu-label">
              Notendur
            </p>
            <ul class="menu-list">
              <li>
                <router-link
                  to="/users"
                  active-class="is-active"
                >
                  Notendur
                </router-link>
              </li>
            </ul>
          </aside>
        </div>

        <div
          class="column"
          :class="{ 'is-9': !fullView , 'is-8 is-offset-2' : fullView }"
        >
          <main>
            <router-view @login="login" />
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
      user: {}
    }
  },
  computed: {
    loggedOut () {
      return this.user.name === undefined
    },
    fullView () {
      const fullViewRoutes = ['Questionnaire', 'Login']
      return fullViewRoutes.includes(this.$route.name)
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
    },
    logout () {
      this.user = {}
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
