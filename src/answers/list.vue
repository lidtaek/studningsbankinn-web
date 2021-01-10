<template>
  <div>
    <Hero
      title="Svör"
      subtitle="Listi yfir öll skráð svör"
    />
    <section class="card">
      <table class="table is-fullwidth">
        <thead>
          <tr>
            <th>
              #
            </th>
            <th>
              Staður
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
            v-for="answer in answers"
            :key="answer.id"
          >
            <td>{{ answer.id }}</td>
            <td>{{ answer.placeName }}</td>
            <td>{{ answer.question }}</td>
            <td class="has-text-right">
              <button
                class="button is-small"
                @click="edit(answer.id)"
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
      answers: []
    }
  },
  created () {
    const answersApi = makeAPI('answers')

    answersApi
      .getAll()
      .then(answers => {
        this.answers = answers
      })
  },
  methods: {
    add () {
      this.$router.push({
        name: 'EditAnswers',
        params: { id: 'add' }
      })
    },
    edit (id) {
      this.$router.push({
        name: 'EditAnswers',
        params: { id }
      })
    }
  }
}
</script>
