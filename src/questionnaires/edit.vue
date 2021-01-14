<template>
  <div>
    <Hero
      :title="placeCategory.name || ''"
      subtitle="Hakaðu við þær spurningar sem þú vilt hafa á spurningalistanum."
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
        v-for="(questionnaire, index) in questionnaires"
        :key="'q' + index + '-' + questionnaire.placeCategoryId + '-' + questionnaire.questionId"
        class="columns"
      >
        <div class="column is-12">
          <CheckboxSwitch
            :id="'q' + index + '-' + questionnaire.placeCategoryId + '-' + questionnaire.questionId"
            v-model="questionnaire.use"
            :value="true"
            :disabled="error || working"
            :label="questionnaire.question"
            @change="save(questionnaire)"
          />
        </div>
      </div>
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
  name: 'QuestionnairesEdit',
  components: {
    CheckboxSwitch,
    Hero,
    Notification
  },
  mixins: [EditMixin],
  data () {
    return {
      questionnairesApi: {},
      questionnaires: [],
      questionsApi: {},
      questions: [],
      placeCategory: {}
    }
  },
  computed: {
    title () {
      return this.questionnaires.length > 0 ? this.questionnaires[0].placeCategoryName : ''
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
        this.questionnaires = questionnaires
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
    save (questionnaire) {
      this.working = true
      this.success = false
      this.error = false

      const id = this.$route.params.id

      this.questionnairesApi
        .upsert(questionnaire)
        .then(questionnaire => {
          if (!questionnaire.id) {
            this.error = true
            this.message = 'Tókst ekki að vista.'
          }

          // Sækja aftur
          return this.questionnairesApi
            .get({ placeCategoryId: id })
            .then(questionnaires => {
              this.questionnaires = questionnaires
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
