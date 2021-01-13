<template>
  <div>
    <Hero
      title="Svör"
      subtitle="Listi yfir öll skráð svör"
    />
    <section class="box">
      <table class="table is-fullwidth">
        <thead>
          <tr>
            <th>
              #
            </th>
            <th>
              Staður
            </th>
            <th class="has-text-right">
              &nbsp;
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
import makeAPI from '../api'
import Hero from '../_components/hero'

export default {
  name: 'AnswersList',
  components: {
    Hero
  },
  data () {
    return {
      places: []
    }
  },
  created () {
    const placesAPI = makeAPI('places')

    placesAPI
      .getAll()
      .then(places => {
        this.places = places
      })
  },
  methods: {
    edit (id) {
      this.$router.push({
        name: 'EditAnswers',
        params: { id }
      })
    }
  }
}
</script>
