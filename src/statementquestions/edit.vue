<template>
  <div>
    <Hero
      :title="title"
      subtitle="Veldu vægi spurningarinnar við fullyrðinguna"
      :x="true"
    />
    <section class="box">
      <form @submit.prevent>
        <Notification
          :message="message"
          :success="success"
          :error="error"
        />
      </form>

      <div
        v-for="category in categories"
        :key="category"
      >

        <h3 class="title is-4">{{ category }}</h3>
        <div
          v-for="(statementquestion, index) in groupedQuestions[category]"
          :key="'a' + index + '-' + statementquestion.questionId + '-' + statementquestion.statementId"
          class="columns is-gapless is-multiline is-mobile mb-0"
        >
          <div class="column is-10 mt-2">{{ statementquestion.question }}</div>
          <div class="column is-2">
            <Select
              v-model="statementquestion.weight"
              :disabled="working"
              :options="weights"
              @input="save(statementquestion)"
            />
          </div>          
          <div class="column is-12"><hr /></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import makeAPI from '../api'
import Hero from '../_components/hero'
import Notification from '../_components/notification'
import Select from '../_components/select'
import Input from '../_components/input'
import EditMixin from '../_mixins/edit'
import groupBy from 'lodash.groupby'

export default {
  name: 'StatementQuestionsEdit',
  components: {
    Select,
    Hero,
    Notification,
    Input
  },
  mixins: [EditMixin],
  data () {
    return {
      statementQuestionsApi: {},     
      statementQuestions: [],
      statementsApi: {},
      statement: {},
      weights: [        
        {          
          text: 1,
          value: 1
        },
        {
          text: 2,
          value: 2
        },
        {
          text: 3,
          value: 3
        }
      ]
    }
  },
  computed: {
    title () {
      return this.statement.statement ? this.statement.statement : ''
    },
    categories () {
      return this.statementQuestions
        .map((a) => a.questionCategoryName)
        .filter((qcn, index, self) => self.indexOf(qcn) === index)
    },
    groupedQuestions () {
      return groupBy(this.statementQuestions, "questionCategoryName")
    },
  },
  created () {
    this.working = true    
    this.statementQuestionsApi = makeAPI('statementquestions')
    this.statementsApi = makeAPI('statements')

    const id = this.$route.params.id
    this.statementQuestionsApi
      .get({ statementId: id })
      .then(statementQuestions => {
        this.statementQuestions = statementQuestions
        this.working = false
      })
     
    this.statementsApi
      .getSingle(id)
      .then(statement => {
        this.statement = statement
        this.working = false
      })
      
      
   
  },
  methods: {
    save (statementQuestion) {
      console.log(statementQuestion)
      this.working = true
      this.success = false
      this.error = false

      const statementId = this.$route.params.id      
      statementQuestion.statementId = statementId // set for inserts

      this.statementQuestionsApi
        .upsert(statementQuestion)
        .then(statementQuestion => {
          if (!statementQuestion.id) {
            this.error = true
            this.message = 'Tókst ekki að vista.'
          }

          // Sækja aftur
          return this.statementQuestionsApi
            .get({ statementId })
            .then(statementQuestions => {
              this.statementQuestions = statementQuestions
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
