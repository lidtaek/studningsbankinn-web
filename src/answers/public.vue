<template>
  <div>
    <Hero
      :title="title"
      :subtitle="subtitle"
      :x="false"
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
          v-for="category in categories"
          :key="category"
        >

        <h3 class="title is-6">{{ category }}</h3>
        <div
          v-for="(answer, index) in groupedAnswers[category]"
          :key="'a' + index + '-' + answer.placeId + '-' + answer.questionId"
          class="columns is-gapless is-multiline is-mobile mb-0"
        >
          <div class="column is-12 mb-2">{{ answer.question }}</div>                      
          <div class="column is-4">            
            <CheckboxSwitch              
              :id="'a' + index + '-' + answer.placeId + '-' + answer.questionId"
              v-model="answer.answer"
              :disabled="working"
              :value="true"
              :label="'Já'"
              @change="save(answer)"
            />
          </div>
          <div class="column is-8">
            <Input
              v-model="answer.comment"
              :size="'small'"
              :disabled="working"
              :placeholder="'Nánar'"
              
            />
          </div>
          <div class="column is-12"><hr /></div>
        </div>         
      </form>
    </section>
  </div>
</template>

<script>
import agent from 'superagent'
import Hero from '../_components/hero'
import Notification from '../_components/notification'
import CheckboxSwitch from '../_components/checkboxswitch'
import Input from '../_components/input'
import EditMixin from '../_mixins/edit'
import groupBy from 'lodash.groupby'

export default {
  name: 'Answer',
  components: {
    Hero,
    Notification,
    CheckboxSwitch,
    Input
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
      return 'Vinsamlegast svaraðu eftirfarandi spurningum.'
    },
    categories () {
      return this.answers
        .map((a) => a.questionCategoryName)
        .filter((qcn, index, self) => self.indexOf(qcn) === index)
    },
    groupedAnswers () {
      return groupBy(this.answers, "questionCategoryName")
    },
  },
  created () {    
    this.fetch()
  },
  methods: {
    fetch () {
      this.working = true    
      const token = this.$route.params.token
      return agent      
        .get(process.env.STUDNINGSBANKINN_API_URL + '/answers')
        .set('Authorization', 'Bearer ' + token)
        .then(res => {
          this.answers = res.body
          this.working = false

          if (this.answers.length === 0) {
            this.warning = true
            this.message = 'Engar spurningar fundust. Ertu viss um að þú sért með réttan hlekk?'
          }
      })
      .catch(() => {
        this.error = true
        this.message = 'Engar spurningar fundust. Ertu viss um að þú sért með réttan hlekk?'
      })
    },
    save (answer) {
      this.working = true
      this.success = false
      this.error = false

      const token = this.$route.params.token        
      const method = Boolean(answer.id) ? 'PUT' : 'POST'
    
      agent(method, process.env.STUDNINGSBANKINN_API_URL + '/answers')
        .set('Authorization', 'Bearer ' + token)
        .send(answer)
        .then(res => {
          if (!res.body.id) {
            this.error = true
            this.message = 'Tókst ekki að vista svar.'
          }

          return this.fetch()          
        })
        .catch(() => {
          this.error = true
          this.message = 'Villa kom upp. Vinsamlegast reyndur aftur.'
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
