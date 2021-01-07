<template>
  <div>
    <Hero
      title="Spurningaflokkar"
      subtitle="Listi yfir allar skráða flokka"
    />
    <section class="card">
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
            v-for="category in categories"
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
import agent from 'superagent'
import Hero from '../components/hero'

export default {
  name: 'QuestionCategoriesList',
  components: {
    Hero
  },
  data () {
    return {
      categories: []
    }
  },
  created () {
    const apiUrl = process.env.STUDNINGSBANKINN_API_URL

    agent.get(apiUrl + '/questioncategories').then(res => {
      this.categories = res.body
    })
  },
  methods: {
    add () {
      this.$router.push({
        name: 'EditQuestionCategories',
        params: { id: 'add' }
      })
    },
    edit (id) {
      this.$router.push({
        name: 'EditQuestionCategories',
        params: { id }
      })
    }
  }
}
</script>
