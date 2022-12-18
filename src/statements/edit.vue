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
            v-model="statement.statement"
            :disabled="working"
            label="Fullyrðing"
            class="column is-12"
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
import Button from '../_components/button'
import EditMixin from '../_mixins/edit'

export default {
  name: 'StatementsEdit',
  components: {
    Input,
    Button,
    Hero,
    Notification
  },
  mixins: [EditMixin],
  data () {
    return {
      statementsApi: {},
      statement: {}
    }
  },
  computed: {
    title () {
      return this.statement.statement ? this.statement.statement : 'Fullyrðingar'
    },
    subtitle () {
      return this.isEdit ? 'Breyta fullyrðingu í álfi' : 'Skrá fullyrðingu fyrir álf.'
    }
  },
  created () {
    this.working = true
    this.statementsApi = makeAPI('statements')
    const id = this.$route.params.id

    this.statementsApi
      .getSingle(id)
      .then(statement => {
        this.statement = statement
        this.working = false
      })
      .catch(() => {
        this.error = true
        this.message = 'Villa kom upp. Fullyrðing fannst ekki.'
      })
  },
  methods: {
    save () {
      this.working = true
      this.success = false
      this.error = false

      this.statementsApi
        .upsert(this.statement)
        .then(statement => {
          if (statement.id) {
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

      this.statementsApi
        .delete(this.statement)
        .then(statement => {
          if (statement.id) {
            this.success = true
            this.message = 'Uppfærsla tókst'
            setTimeout(() => {
              this.$router.push({
                name: 'ListStatements'
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
