<template>
  <div>
    <Hero
      :title="placeCategory.name || ''"
      subtitle="Spurningalisti"
    />
    <section class="box">
      <form @submit.prevent>
        <Notification
          :message="message"
          :success="success"
          :error="error"
        />
      </form>

      <table
        class="table is-fullwidth"
      >
        <thead>
          <tr>
            <th>Spurning</th>
            <th class="is-hidden-mobile">Flokkur</th>
            <th class="has-text-centered">
              Hafa á lista
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="question in questions"
            :key="question.id"
          >
            <td>{{ question.question }}</td>
            <td class="is-hidden-mobile">{{ question.categoryName }}</td>
            <td class="has-text-centered">
              <CheckboxSwitch
                :id="'q-' + question.id"
                v-model="questionnaire.questions"
                :value="question.id"
                :disabled="error"
              />
            </td>
          </tr>
        </tbody>
      </table>

      <Button
        :disabled="error"
        label="Vista"
        @click="save"
      />
    </section>
  </div>
</template>

<script>
import makeAPI from '../api'
import Hero from '../_components/hero'
import Notification from '../_components/notification'
import Button from '../_components/button'
import CheckboxSwitch from '../_components/checkboxswitch'
import EditMixin from '../_mixins/edit'

export default {
  name: 'QuestionnairesEdit',
  components: {
    Button,
    CheckboxSwitch,
    Hero,
    Notification
  },
  mixins: [EditMixin],
  data () {
    return {
      questionnairesApi: {},
      questionnaire: {
        placeCategoryId: '',
        questions: []
      },
      questionsApi: {},
      questions: [],
      placeCategory: {}
    }
  },
  created () {
    this.working = true
    this.questionsApi = makeAPI('questions')
    this.questionnairesApi = makeAPI('questionnaires')
    this.placeCategoriesApi = makeAPI('placecategories')

    const id = this.$route.params.id

    this.questionnairesApi
      .get({ placeCategoryId: id })
      .then(questionnaires => {
        this.questionnaire.placeCategoryId = id
        this.questionnaire.questions = questionnaires.map(qn => qn.questionId)
      })

    this.questionsApi
      .getAll()
      .then(questions => {
        this.questions = questions
        this.working = false
      })
      .catch(() => {
        this.error = true
        this.message = 'Villa kom upp við að sækja spurningar.'
      })

    this.placeCategoriesApi
      .getSingle(id)
      .then(category => {
        this.placeCategory = category
      })
      .catch(e => {
        this.error = true
        this.message = 'Spurningalisti fannst ekki.'
      })
  },
  methods: {
    save () {
      this.working = true
      this.success = false
      this.error = false

      this.questionnairesApi
        .update(this.questionnaire)
        .then(questionnaire => {
          if (questionnaire.id) {
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
