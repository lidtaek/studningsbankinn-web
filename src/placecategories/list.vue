<template>
  <div>
    <Hero
      title="Staðarflokkar"
      subtitle="Listi yfir allar skráða flokka"
    />
    <section class="box">
      <table class="table is-fullwidth">
        <thead>
          <tr>
            <th>
              #
            </th>
            <th>
              Heiti
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
            v-for="category in placeCategories"
            :key="category.id"
          >
            <td>{{ category.id }}</td>
            <td>{{ category.name }}</td>
            <td class="has-text-right">
              <button
                class="button is-small"
                @click="edit(category.id)"
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
  name: 'PlaceCategoriesList',
  components: {
    Hero
  },
  data () {
    return {
      placeCategories: []
    }
  },
  created () {
    const placeCategoriesApi = makeAPI('placecategories')

    placeCategoriesApi
      .getAll()
      .then(categories => {
        this.placeCategories = categories
      })
  },
  methods: {
    add () {
      this.$router.push({
        name: 'EditPlaceCategories',
        params: { id: 'add' }
      })
    },
    edit (id) {
      this.$router.push({
        name: 'EditPlaceCategories',
        params: { id }
      })
    }
  }
}
</script>
