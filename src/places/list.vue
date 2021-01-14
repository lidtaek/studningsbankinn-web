<template>
  <div>
    <Hero
      title="Staðir"
      subtitle="Stofnaðu nýjan stað eða breyttu eldri skráningu."
    />
    <section class="box">
      <table class="table is-fullwidth">
        <thead>
          <tr>
            <th width="9%">
              #
            </th>
            <th width="50%">
              Nafn
            </th>
            <th width="40%">
              Flokkur
            </th>
            <th
              width="1%"
              class="has-text-right"
            >
              <button
                class="button is-small is-info"
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
            <td>{{ place.categoryName }}</td>
            <td class="has-text-right">
              <button
                class="button is-small is-warning"
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
import Hero from '../_components/hero'
import makeAPI from '../api'

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
    const placesApi = makeAPI('places')

    placesApi.getAll().then(places => {
      this.places = places
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
