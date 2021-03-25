<template>
  <div>
    <Hero
      :title="title"
      :subtitle="subtitle"
      :x="true"
    />
    <section class="box">
      <form @submit.prevent>
        <Notification
          :message="message"
          :success="success"
          :error="error"
        />

        <div class="columns">
          <Input
            v-model="question.question"
            :disabled="working"
            class="column is-8"
            label="Spurning"
          />

          <Select
            v-model="question.categoryId"
            :disabled="working"
            :options="questionCategories"
            label="Flokkur"
            class="column is-4"
          />
        </div>

        <div class="columns">          
          <Button
            v-if="isEdit"
            :disabled="working"
            type="danger"
            label="Eyða"
            class="column is-6"
            @click="del()"
          />

          <Button
            :disabled="working"
            label="Vista"
            class="column is-6 has-text-right"
            @click="save()"
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
import Input from '../_components/input'
import Select from '../_components/select'
import Button from '../_components/button'
import EditMixin from '../_mixins/edit'

export default {
  name: 'QuestionsEdit',
  components: {
    Input,
    Select,
    Button,
    Hero,
    Notification
  },
  mixins: [EditMixin],
  data () {
    return {
      questionsApi: {},
      question: {},
      questionCategoriesApi: {},
      questionCategories: []
    }
  },
  computed: {
    title () {
      return this.question.question ? this.question.question : 'Spurning'
    },
    subtitle () {
      return this.isEdit ? 'Hafðu í huga að spurningin gæti verið notuð á mörgum stöðum.' : 'Skráðu nýja spurningu.'
    }
  },
  created () {
    this.working = true
    this.questionsApi = makeAPI('questions')
    this.questionCategoriesApi = makeAPI('questioncategories')
    const id = this.$route.params.id

    this.questionsApi
      .getSingle(id)
      .then(question => {
        this.question = question
        this.working = false
      })
      .catch(() => {
        this.error = true
        this.message = 'Villa kom upp. Spurning fannst ekki.'
      })

    this.questionCategoriesApi
      .getAll()
      .then(categories => {
        this.questionCategories = categories.map(category => ({
          value: category.id,
          text: category.name
        }))
      })
      .catch(() => {
        this.error = true
        this.message = 'Villa kom upp. Flokkar fundust ekki.'
      })
  },
  methods: {
    save () {
      this.working = true
      this.success = false
      this.error = false

      this.questionsApi
        .upsert(this.question)
        .then(question => {
          if (question.id) {
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

      this.questionsApi
        .delete(this.question)
        .then(question => {
          if (question.id) {
            this.success = true
            this.message = 'Uppfærsla tókst'
            setTimeout(() => {
              this.$router.push({
                name: 'ListQuestion'
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
