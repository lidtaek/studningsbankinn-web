<template>
  <div>
    <Hero
      title="Spurningalistar"
      subtitle="Listi yfir spurningalista"
    />
    <section class="box">
      <table class="table is-fullwidth">
        <thead>
          <tr>
            <th>#</th>
            <th>Nafn</th>
            <th>Staður</th>
            <th class="has-text-right">
              &nbsp;
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="user in users"
            :key="user.id"
          >
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.placeName }}</td>
            <td class="has-text-right">
              <button
                class="button is-small"
                @click="view(user.token)"
              >
                <span class="icon">
                  <i class="fas fa-eye" />
                </span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script>
import Hero from '../_components/hero'
import makeAPI from '../api'

export default {
  name: 'UsersList',
  components: {
    Hero
  },
  data () {
    return {
      users: []
    }
  },
  created () {
    const usersApi = makeAPI('users')

    usersApi.getAll().then(users => {
      this.users = users
    })
  },
  methods: {
    view (token) {
      this.$router.push({
        name: 'Questionnaire',
        params: { token }
      })
    }
  }
}
</script>
