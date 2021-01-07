<template>
  <div>
    <Hero
      title="Spurningar"
      subtitle="Listi yfir allar skráðar spurningar"
    />
    <section class="card">
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
import agent from 'superagent'
import Hero from '../components/hero'

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
    const apiUrl = process.env.STUDNINGSBANKINN_API_URL

    agent.get(apiUrl + '/questions').then(res => {
      this.questions = res.body
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
