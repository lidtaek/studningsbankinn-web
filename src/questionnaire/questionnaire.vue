<template>
  <div>
    <Hero
      :title="title"
      subtitle="Spurningalisti"
    />
    <section class="card">
      <form
        class="card-content"
        @submit.prevent
      >
        <Notification
          :message="message"
          :success="success"
          :error="error"
        />

        <div class="columns">
          {{ questionnaires }}
        </div>
      </form>
    </section>
  </div>
</template>

<script>
import agent from 'superagent'
import Hero from '../_components/hero'
import Notification from '../_components/notification'
import Select from '../_components/select'
import Button from '../_components/button.vue'
import EditMixin from '../_mixins/edit'

export default {
  name: 'Questionnaire',
  components: {
    Select,
    Button,
    Hero,
    Notification
  },
  mixins: [EditMixin],
  data () {
    return {
      answersApi: {},
      questionnaires: [],
      answers: [
        {
          value: undefined,
          text: ''
        },
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
    console.log(token)
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
    save () {
      this.working = true
      this.success = false
      this.error = false

      this.answersApi
        .upsert(this.answer)
        .then(answer => {
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
