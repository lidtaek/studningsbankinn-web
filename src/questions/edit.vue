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
          <Input
            v-model="question.question"
            :disabled="working"
            class="column is-12"
            label="Spurning"
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
  name: 'QuestionsEdit',
  components: {
    Input,
    Button,
    Hero,
    Notification
  },
  mixins: [EditMixin],
  data () {
    return {
      questionApi: {},
      question: {}
    }
  },
  computed: {
    subtitle () {
      const id = this.$route.params.id
      return !isNaN(Number(id)) ? 'Breyta spurningu' : 'Skrá nýja spurningu'
    }
  },
  created () {
    this.questionApi = makeAPI('questions')

    const id = this.$route.params.id

    this.questionApi
      .get(id)
      .then(question => {
        this.question = question
      })
  },
  methods: {
    save () {
      this.working = true
      this.success = false
      this.error = false

      this.questionApi
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

      this.questionApi
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
