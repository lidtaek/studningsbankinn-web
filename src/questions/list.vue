<template>
  <div>
    <Hero
      title="Spurningar"
      subtitle="Listi yfir allar skráðar spurningar"
    />
    <section class="box">
      <table class="table is-fullwidth">
        <thead>
          <tr>
            <th>
              #
            </th>
            <th>
              Spurning
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
            v-for="question in questions"
            :key="question.id"
          >
            <td>{{ question.id }}</td>
            <td>{{ question.question }}</td>
            <td class="has-text-right">
              <button
                class="button is-small"
                @click="edit(question.id)"
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
  name: 'QuestionsList',
  components: {
    Hero
  },
  data () {
    return {
      questions: []
    }
  },
  created () {
    const questionsApi = makeAPI('questions')

    questionsApi
      .getAll()
      .then(questions => {
        this.questions = questions
      })
  },
  methods: {
    add () {
      this.$router.push({
        name: 'EditQuestions',
        params: { id: 'add' }
      })
    },
    edit (id) {
      this.$router.push({
        name: 'EditQuestions',
        params: { id }
      })
    }
  }
}
</script>
