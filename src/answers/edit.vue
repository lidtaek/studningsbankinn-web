<template>
  <div>
    <Hero
      title="Svör"
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
          <div class="field column is-9">
            <label class="label">Staður:</label>
            <div class="control">
              <div class="select is-fullwidth">
                <select v-model="answer.placeId">
                  <option
                    v-for="place in places"
                    :key="place.id"
                    :value="place.id"
                  >
                    {{ place.name }}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div class="field column is-3">
            <label class="label">Flokkur:</label>
            <div class="control">
              <div class="select is-fullwidth">
                <select v-model="answer.categoryId">
                  <option
                    v-for="category in categories"
                    :key="category.id"
                    :value="category.id"
                  >
                    {{ category.name }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div class="columns">
          <div class="field column is-9">
            <label class="label">Spurning:</label>
            <div class="control">
              <div class="select is-fullwidth">
                <select v-model="answer.questionId">
                  <option
                    v-for="question in questions"
                    :key="question.id"
                    :value="question.id"
                  >
                    {{ question.question }}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div class="field column is-3">
            <label class="label">Svar:</label>
            <div class="control">
              <div class="select is-fullwidth">
                <select v-model="answer.answer">
                  <option :value="true">Já</option>
                  <option :value="false">Nei</option>
                </select>
              </div>
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
  name: 'AnswersEdit',
  components: {
    Hero,
    Notification
  },
  data () {
    return {
      answer: {},
      places: [],
      questions: [],
      categories: [],
      message: '',
      success: false,
      error: false
    }
  },
  computed: {
    subtitle () {
      const id = this.$route.params.id
      return !isNaN(Number(id)) ? 'Breyta skráningu' : 'Skrá nýjan svör'
    }
  },
  created () {
    const apiUrl = process.env.STUDNINGSBANKINN_API_URL
    const id = this.$route.params.id

    if (!isNaN(Number(id))) {
      agent
        .get(apiUrl + '/answers/?id=' + id)
        .then(res => {
          if (res.body.length === 1) {
            this.answer = res.body[0]
          } else {
            this.error = true
            this.message = 'Svar fannst ekki'
          }
        })
        .catch(e => {
          this.error = true
          this.message = 'Staður fannst ekki'
        })
    }

    agent
      .get(apiUrl + '/places')
      .then(res => {
        this.places = res.body
      })
      .catch(e => {
        this.error = true
        this.message = 'Villa við að sækja staði'
      })

    agent
      .get(apiUrl + '/questions')
      .then(res => {
        this.questions = res.body
      })
      .catch(e => {
        this.error = true
        this.message = 'Villa við að sækja spurningar'
      })

    agent
      .get(apiUrl + '/questioncategories')
      .then(res => {
        this.categories = res.body
      })
      .catch(e => {
        this.error = true
        this.message = 'Villa við að sækja spurningaflokka'
      })
  },
  methods: {
    save () {
      this.success = false
      const apiUrl = process.env.STUDNINGSBANKINN_API_URL + '/answers'
      const method = this.answer.id ? 'put' : 'post'

      console.log(this.answer)

      agent(method, apiUrl)
        .send(this.answer)
        .then(res => {
          if (res.body.id > 0) {
            this.success = true
            this.message = 'Aðgerð tókst'
          }
        })
        .catch(e => {
          this.error = true
          this.message = 'Ekki tókst að vista stað'
        })
    },
    del () {
      this.success = false
      const apiUrl = process.env.STUDNINGSBANKINN_API_URL + '/answers'

      agent
        .del(apiUrl)
        .send(this.answer)
        .then(res => {
          if (res.body.id > 0) {
            this.success = true
            this.message = 'Aðgerð tókst'
          }
        })
        .catch(e => {
          this.error = true
          this.message = 'Ekki tókst að eyða staði'
        })
    }
  }
}
</script>
