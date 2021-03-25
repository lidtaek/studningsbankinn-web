<template>
  <div>
    <Hero
      :title="title"
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
        v-for="category in categories"
        :key="category"
      >

        <h3 class="title is-6">{{ category }}</h3>
        <div
          v-for="(questionnaire, index) in groupedQuestionnaires[category]"
          :key="'a' + index + '-' + questionnaire.placeId + '-' + questionnaire.questionId"
          class="columns is-gapless is-multiline is-mobile mb-0"
        >
          <div class="column is-12 mb-2">{{ questionnaire.question }}</div>
          <div class="column is-10">
            <CheckboxSwitch
              :id="'q' + index + '-' + questionnaire.placeCategoryId + '-' + questionnaire.questionId"
              v-model="questionnaire.use"
              :disabled="working"
              :value="true"
              :label="'Hafa á spurningalista'"
              @change="save(questionnaire)"
            />
          </div>
          <div class="column is-2">
            <Input
              v-model="questionnaire.ordering"
              :size="'small'"
              :disabled="error || working"
              :placeholder="'Röðun'"
              @change="save(questionnaire)"
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
import CheckboxSwitch from '../_components/checkboxswitch'
import Input from '../_components/input'
import EditMixin from '../_mixins/edit'
import groupBy from 'lodash.groupby'

export default {
  name: 'QuestionnairesEdit',
  components: {
    CheckboxSwitch,
    Hero,
    Notification,
    Input
  },
  mixins: [EditMixin],
  data () {
    return {
      questionnairesApi: {},
      questionnaires: [],
    }
  },
  computed: {
    title () {
      return this.questionnaires.length > 0 ? this.questionnaires[0].placeCategoryName : ''
    },
    categories () {
      return this.questionnaires
        .map((a) => a.questionCategoryName)
        .filter((qcn, index, self) => self.indexOf(qcn) === index)
    },
    groupedQuestionnaires () {
      return groupBy(this.questionnaires, "questionCategoryName")
    },
  },
  created () {
    this.working = true    
    this.questionnairesApi = makeAPI('questionnaires')

    const id = this.$route.params.id
    this.questionnairesApi
      .get({ placeCategoryId: id })
      .then(questionnaires => {
        this.questionnaires = questionnaires
        this.working = false
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
