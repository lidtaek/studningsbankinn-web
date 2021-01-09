<template>
  <div>
    <Hero
      title="Staðir"
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
            v-model="place.name"
            :disabled="working"
            label="Nafn"
            class="column is-12"
          />
        </div>

        <div class="columns">
          <Textarea
            v-model="place.description"
            :disabled="working"
            label="Lýsing"
            class="column is-12"
          />
        </div>

        <div class="columns">
          <Input
            v-model="place.website"
            :disabled="working"
            label="Vefsíða"
            class="column is-6"
          />

          <Input
            v-model="place.phone"
            :disabled="working"
            label="Símanúmer"
            class="column is-6"
          />
        </div>

        <div class="columns">
          <Input
            v-model="place.address"
            :disabled="working"
            label="Heimilisfang"
            class="column is-6"
          />

          <Input
            v-model="place.postcode"
            :disabled="working"
            label="Póstnúmer"
            class="column is-6"
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
import Textarea from '../_components/textarea'
import Button from '../_components/button.vue'
import EditMixin from '../_mixins/edit'

export default {
  name: 'PlacesEdit',
  components: {
    Input,
    Textarea,
    Hero,
    Notification,
    Button
  },
  mixins: [EditMixin],
  data () {
    return {
      placesApi: {},
      place: {}
    }
  },
  created () {
    this.placesApi = makeAPI('places')
    const id = this.$route.params.id
    this.working = true

    this.placesApi
      .get(id)
      .then(place => {
        this.working = false
        this.place = place
      })
      .catch(() => {
        this.error = true
        this.message = 'Villa kom upp við að sækja stað'
      })
  },
  methods: {
    save () {
      this.working = true
      this.success = false
      this.error = false

      this.placesApi
        .upsert(this.place)
        .then(place => {
          if (place.id) {
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

      this.placesApi
        .delete(this.place)
        .then(place => {
          if (place.id) {
            this.success = true
            this.message = 'Uppfærsla tókst'
            setTimeout(() => {
              this.$router.push({
                name: 'ListPlaces'
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
