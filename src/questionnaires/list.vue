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
            <th>&nbsp;</th>
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
import Hero from '../_components/hero'
import makeAPI from '../api'

export default {
  name: 'UsersList',
  components: {
    Hero
  },
  data () {
    return {
      placeCategories: []
    }
  },
  created () {
    const placeCategories = makeAPI('placecategories')

    placeCategories.getAll().then(categories => {
      this.placeCategories = categories
    })
  },
  methods: {
    edit (id) {
      this.$router.push({
        name: 'EditQuestionnaires',
        params: { id }
      })
    }
  }
}
</script>
