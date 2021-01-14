<template>
  <div>
    <Hero
      title="Spurningaflokkar"
      subtitle="Stofnaðu nýjan flokk eða breyttu eldri skráningu."
    />
    <section class="box">
      <table class="table is-fullwidth">
        <thead>
          <tr>
            <th width="9%">
              #
            </th>
            <th width="90%">
              Heiti
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
            v-for="category in questionCategories"
            :key="category.id"
          >
            <td>{{ category.id }}</td>
            <td>{{ category.name }}</td>
            <td class="has-text-right">
              <button
                class="button is-small is-warning"
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
  name: 'QuestionCategoriesList',
  components: {
    Hero
  },
  data () {
    return {
      questionCategories: []
    }
  },
  created () {
    const questionCategoriesApi = makeAPI('questioncategories')

    questionCategoriesApi
      .getAll()
      .then(categories => {
        this.questionCategories = categories
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
