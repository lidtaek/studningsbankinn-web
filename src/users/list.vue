<template>
  <div>
    <Hero
      title="Notendur"
      subtitle="Listi yfir alla skráða notendur"
    />
    <section class="card">
      <table class="table is-fullwidth">
        <thead>
          <tr>
            <th>
              #
            </th>
            <th>
              Nafn
            </th>
            <th class="has-text-right">
              <button
                class="button is-small"
                @click="add()"
              >
                <span class="icon">
                  <i class="fas fa-plus" />
                </span>
              </button>
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
            <td class="has-text-right">
              <button
                class="button is-small"
                @click="edit(user.id)"
              >
                <span class="icon">
                  <i class="fas fa-pen" />
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
    add () {
      this.$router.push({
        name: 'EditUsers',
        params: { id: 'add' }
      })
    },
    edit (id) {
      this.$router.push({
        name: 'EditUsers',
        params: { id }
      })
    }
  }
}
</script>
