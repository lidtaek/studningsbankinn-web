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
            v-model="category.name"
            :disabled="working"
            label="Heiti"
            class="column is-12"
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
import Input from '../_components/input'
import Button from '../_components/button'
import EditMixin from '../_mixins/edit'

export default {
  name: 'QuestionCategoriesEdit',
  components: {
    Input,
    Button,
    Hero,
    Notification
  },
  mixins: [EditMixin],
  data () {
    return {
      questionCategoriesApi: {},
      category: {}
    }
  },
  computed: {
    title () {
      return this.category.name ? this.category.name : 'Spurningaflokkar'
    },
    subtitle () {
      return this.isEdit ? 'Hafðu í huga að flokkurinn er nýtt á mörgum stöðum.' : 'Skráðu nýjan flokk.'
    }
  },
  created () {
    this.working = true
    this.questionCategoriesApi = makeAPI('questioncategories')
    const id = this.$route.params.id

    this.questionCategoriesApi
      .getSingle(id)
      .then(category => {
        this.category = category
        this.working = false
      })
      .catch(() => {
        this.error = true
        this.message = 'Villa kom upp. Spurningaflokkur fannst ekki.'
      })
  },
  methods: {
    save () {
      this.working = true
      this.success = false
      this.error = false

      this.questionCategoriesApi
        .upsert(this.category)
        .then(category => {
          if (category.id) {
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

      this.questionCategoriesApi
        .delete(this.category)
        .then(category => {
          if (category.id) {
            this.success = true
            this.message = 'Uppfærsla tókst'
            setTimeout(() => {
              this.$router.push({
                name: 'ListQuestionCategories'
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
