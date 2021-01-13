<template>
  <div>
    <Hero
      :title="title"
      subtitle="Svör"
    />
    <section class="box">
      <form @submit.prevent>
        <Notification
          :message="message"
          :success="success"
          :error="error"
        />

        <table class="table is-fullwidth">
          <thead>
            <tr>
              <th>Spurning</th>
              <th class="has-text-centered">
                Nei/Já
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="answer in answers"
              :key="answer.placeId + '-' + answer.questionId"
            >
              <td>{{ answer.question }}</td>
              <td class="has-text-centered">
                <CheckboxSwitch
                  :id="'a-' + answer.placeId + '-' + answer.questionId"
                  v-model="answer.answer"
                  :value="true"
                />
              </td>
            </tr>
          </tbody>
        </table>

        <Button
          :disabled="false"
          label="Vista"
          @click="save"
        />
      </form>
    </section>
  </div>
</template>

<script>
import makeAPI from '../api'
import Hero from '../_components/hero'
import Notification from '../_components/notification'
import Button from '../_components/button.vue'
import CheckboxSwitch from '../_components/checkboxswitch'
import EditMixin from '../_mixins/edit'

export default {
  name: 'AnswersEdit',
  components: {
    Button,
    Hero,
    Notification,
    CheckboxSwitch
  },
  mixins: [EditMixin],
  data () {
    return {
      answersApi: {},
      answers: [],
      questionsApi: {},
      questions: [],
      answerOptions: [
        {
          value: true,
          text: 'Já'
        },
        {
          value: false,
          text: 'Nei'
        }
      ]
    }
  },
  computed: {
    title () {
      return this.answers.length > 0 ? this.answers[0].placeName : ''
    }
  },
  created () {
    this.working = true
    this.answersApi = makeAPI('answers')
    this.placesApi = makeAPI('places')
    this.questionsApi = makeAPI('questions')

    const id = this.$route.params.id

    this.answersApi
      .get({ placeId: id })
      .then((answers) => {
        this.answers = answers
        this.working = false
      })
      .catch(() => {
        this.error = true
        this.message = 'Villa kom upp. Skráð svar fannst ekki.'
      })
  },
  methods: {
    save () {
      this.working = true
      this.success = false
      this.error = false

      this.answersApi
        .update(this.answers)
        .then((answer) => {
          if (answer.id) {
            this.success = true
            this.message = 'Uppfærsla tókst'
          } else {
            this.error = true
            this.message = 'Tókst ekki að vista'
          }
        })
        .catch(() => {
          this.error = true
          this.message = 'Villa kom upp við aðgerð'
        })
        .finally(() => {
          this.working = false
        })
    }
  }
}
</script>

<style scoped>
.table td {
  vertical-align: middle;
}
</style>
