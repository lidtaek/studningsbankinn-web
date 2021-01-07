<template>
  <div>
    <Hero
      title="Spurningar"
      :subtitle="subtitle"
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
          <div class="field column is-12">
            <label class="label">Spurning:</label>
            <div class="control">
              <input
                v-model="question.question"
                class="input"
                type="text"
              >
            </div>
          </div>
        </div>

        <div class="columns">
          <div class="field column is-6">
            <div class="control">
              <button
                class="button is-primary"
                @click="save()"
              >
                Vista
              </button>
            </div>
          </div>

          <div class="field column is-6 has-text-right">
            <div class="control">
              <button
                class="button is-danger is-light"
                @click="del()"
              >
                Eyða
              </button>
            </div>
          </div>
        </div>
      </form>
    </section>
  </div>
</template>

<script>
import agent from 'superagent'
import Hero from '../components/hero'
import Notification from '../components/notification'
export default {
  name: 'QuestionsEdit',
  components: {
    Hero,
    Notification
  },
  data () {
    return {
      question: {},
      message: '',
      success: false,
      error: false
    }
  },
  computed: {
    subtitle () {
      const id = this.$route.params.id
      return !isNaN(Number(id)) ? 'Breyta spurningu' : 'Skrá nýja spurningu'
    }
  },
  created () {
    const apiUrl = process.env.STUDNINGSBANKINN_API_URL + '/questions'
    const id = this.$route.params.id

    if (!isNaN(Number(id))) {
      agent
        .get(apiUrl + '/?id=' + id)
        .then(res => {
          if (res.body.length === 1) {
            this.question = res.body[0]
          } else {
            this.error = true
            this.message = 'Spurning fannst ekki'
          }
        })
        .catch(e => {
          this.error = true
          this.message = 'Spurning fannst ekki'
        })
    }
  },
  methods: {
    save () {
      this.success = false
      const apiUrl = process.env.STUDNINGSBANKINN_API_URL + '/questions'
      const method = this.question.id ? 'put' : 'post'

      agent(method, apiUrl)
        .send(this.question)
        .then(res => {
          if (res.body.id > 0) {
            this.success = true
            this.message = 'Aðgerð tókst'
          }
        })
        .catch(e => {
          this.error = true
          this.message = 'Ekki tókst að vista spurningu'
        })
    },
    del () {
      this.success = false
      const apiUrl = process.env.STUDNINGSBANKINN_API_URL + '/questions'

      agent
        .del(apiUrl)
        .send(this.question)
        .then(res => {
          if (res.body.id > 0) {
            this.success = true
            this.message = 'Aðgerð tókst'
          }
        })
        .catch(e => {
          this.error = true
          this.message = 'Ekki tókst að eyða spurningu'
        })
    }
  }
}
</script>
