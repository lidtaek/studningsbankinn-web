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
          <Select
            v-model="answer.placeId"
            :options="places"
            :disabled="working"
            label="Staður"
            class="column is-9"
          />

          <Select
            v-model="answer.categoryId"
            :options="categories"
            :disabled="working"
            label="Flokkur"
            class="column is-3"
          />
        </div>

        <div class="columns">
          <Select
            v-model="answer.questionId"
            :options="questions"
            :disabled="working"
            label="Spurning"
            class="column is-9"
          />

          <Select
            v-model="answer.answer"
            :options="answers"
            :disabled="working"
            label="Svar"
            class="column is-3"
          />
        </div>

        <div class="columns">
          <Button
            :disabled="working"
            label="Vista"
            class="column is-6"
            @click="save()"
          />

          <Button
            v-if="isEdit"
            :disabled="working"
            type="danger"
            label="Eyða"
            class="column is-6 has-text-right"
            @click="del()"
          />
        </div>
      </form>
    </section>
  </div>
</template>

<script>
import makeAPI from '../api'
import Hero from '../_components/hero'
import Notification from '../_components/notification'
import Select from '../_components/select'
import Button from '../_components/button.vue'
import EditMixin from '../_mixins/edit'

export default {
  name: 'AnswersEdit',
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
      placesApi: {},
      questionsApi: {},
      categoriesApi: {},
      answer: {},
      places: [],
      questions: [],
      categories: [],
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
  created () {
    this.working = true
    this.answersApi = makeAPI('answers')
    this.placesApi = makeAPI('places')
    this.questionsApi = makeAPI('questions')
    this.categoriesApi = makeAPI('questioncategories')

    const id = this.$route.params.id

    this.answersApi
      .get(id)
      .then(answer => {
        this.answer = answer
        this.working = false
      })
      .catch(() => {
        this.error = true
        this.message = 'Villa kom upp. Skráð svar fannst ekki.'
      })

    this.placesApi
      .getAll()
      .then(places => {
        this.places = places.map(place => ({
          value: place.id,
          text: place.name
        }))
      })
      .catch(e => {
        this.error = true
        this.message = 'Villa kom upp við að sækja staði'
      })

    this.questionsApi
      .getAll()
      .then(questions => {
        this.questions = questions.map(question => ({
          value: question.id,
          text: question.question
        }))
      })
      .catch(e => {
        this.error = true
        this.message = 'Villa kom upp við að sækja spurningar'
      })

    this.categoriesApi
      .getAll()
      .then(categories => {
        this.categories = categories.map(category => ({
          value: category.id,
          text: category.name
        }))
      })
      .catch(e => {
        this.error = true
        this.message = 'Villa kom upp við að sækja spurningaflokka'
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
    },
    del () {
      this.working = true
      this.success = false
      this.error = false

      this.answersApi
        .delete(this.answer)
        .then(answer => {
          if (answer.id) {
            this.success = true
            this.message = 'Uppfærsla tókst'
            setTimeout(() => {
              this.$router.push({
                name: 'ListAnswers'
              })
            }, 2500)
          } else {
            this.error = true
            this.message = 'Tókst ekki að eyða'
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
