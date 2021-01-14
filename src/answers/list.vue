<template>
  <div>
    <Hero
      title="Svörun"
      subtitle="Svör eru flokkuð niður á staði."
    />
    <section class="box">
      <table class="table is-fullwidth">
        <thead>
          <tr>
            <th width="9%">
              #
            </th>
            <th width="90%">
              Staður
            </th>
            <th
              width="1%"
              class="has-text-right"
            />
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
