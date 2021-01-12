<template>
  <div>
    <Hero
      :title="title"
      subtitle="Spurningalisti"
    />
    <section class="box">
      <form @submit.prevent>
        <Notification
          :message="message"
          :success="success"
          :error="error"
        />

        <div
          v-for="answer in questionnaires"
          :key="answer.id"
          class="columns"
        >
          <Input
            v-model="answer.question"
            :disabled="working"
            :readonly="true"
            class="column is-6"
          />
          <Select
            v-model="answer.answer"
            :options="answers"
            :disabled="working"
            class="column is-2"
            @input="save(answer)"
          />
        </div>
      </form>
    </section>
  </div>
</template>

<script>
import agent from 'superagent'
import Hero from '../_components/hero'
import Select from '../_components/select'
import EditMixin from '../_mixins/edit'
import Input from '../_components/input'
import Notification from '../_components/notification'

export default {
  name: 'Questionnaire',
  components: {
    Notification,
    Input,
    Select,
    Hero
  },
  mixins: [EditMixin],
  data () {
    return {
      answersApi: {},
      questionnaires: [],
      answers: [
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
      if (this.questionnaires.length > 0) {
        return this.questionnaires[0].placeName
      }

      return ''
    }
  },
  created () {
    this.working = true
    const token = this.$route.params.token

    return agent
      .get(process.env.STUDNINGSBANKINN_API_URL + '/answers')
      .set('Authorization', 'Bearer ' + token)
      .then(res => res.body)
      .then(questionnaires => {
        this.questionnaires = questionnaires
        this.working = false
      })
      .catch(() => {
        this.error = true
        this.message = 'Villa kom upp. Spurningalisti fannst ekki.'
      })
  },
  methods: {
    save (answer) {
      console.log('hingað')
      this.working = true
      this.success = false
      this.error = false

      this.answersApi
        .upsert(answer)
        .then(answerRes => {
          if (answerRes.id) {
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
