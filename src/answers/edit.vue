<template>
  <div>
    <Hero
      :title="title"
      :subtitle="subtitle"
      :x="true"
    />
    <section class="box">
      <form @submit.prevent>
        <Notification
          :message="message"
          :success="success"
          :warning="warning"
          :error="error"
        />

        <div
          v-for="(answer, index) in answers"
          :key="'a' + index + '-' + answer.placeId + '-' + answer.questionId"
          class="columns"
        >
          <div class="column is-12">
            <CheckboxSwitch
              :id="'a' + index + '-' + answer.placeId + '-' + answer.questionId"
              v-model="answer.answer"
              :disabled="working"
              :value="true"
              :label="answer.question"
              @change="save(answer)"
            />
          </div>
        </div>
      </form>
    </section>
  </div>
</template>

<script>
import makeAPI from '../api'
import Hero from '../_components/hero'
import Notification from '../_components/notification'
import CheckboxSwitch from '../_components/checkboxswitch'
import EditMixin from '../_mixins/edit'

export default {
  name: 'AnswersEdit',
  components: {
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
    },
    subtitle () {
      return 'Skráð svör frá viðkomandi aðila - þú getur breytt þeim.'
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

        if (this.answers.length === 0) {
          this.warning = true
          this.message = 'Engin svör fundust. Ertu viss um það sé til spurningalisti?'
        }
      })
      .catch(() => {
        this.error = true
        this.message = 'Villa kom upp. Skráð svar fannst ekki.'
      })
  },
  methods: {
    save (answer) {
      this.working = true
      this.success = false
      this.error = false

      const id = this.$route.params.id
      this.answersApi
        .upsert(answer)
        .then((answer) => {
          if (!answer.id) {
            this.error = true
            this.message = 'Tókst ekki að vista.'
          }

          return this.answersApi
            .get({ placeId: id })
            .then((answers) => {
              this.answers = answers
              this.working = false
            })
        })
        .catch(() => {
          this.error = true
          this.message = 'Villa kom upp.'
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
