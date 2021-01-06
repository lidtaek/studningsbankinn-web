<template>
  <div>
    <Hero
      title="Staðir"
      subtitle="Listi yfir alla skráða staði"
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
            v-for="place in places"
            :key="place.id"
          >
            <td>{{ place.id }}</td>
            <td>{{ place.name }}</td>
            <td class="has-text-right">
              <button
                class="button is-small"
                @click="edit(place.id)"
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
import agent from 'superagent'
import Hero from '../components/hero'

export default {
  name: 'PlacesList',
  components: {
    Hero
  },
  data () {
    return {
      places: []
    }
  },
  created () {
    const apiUrl = process.env.STUDNINGSBANKINN_API_URL

    agent.get(apiUrl + '/places').then(res => {
      this.places = res.body
    })
  },
  methods: {
    add () {
      this.$router.push({
        name: 'EditPlaces',
        params: { id: 'add' }
      })
    },
    edit (id) {
      this.$router.push({
        name: 'EditPlaces',
        params: { id }
      })
    }
  }
}
</script>
