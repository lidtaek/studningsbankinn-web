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
            v-model="place.name"
            :disabled="working"
            label="Nafn"
            class="column is-8"
          />

          <Select
            v-model="place.categoryId"
            :disabled="working"
            :options="placeCategories"
            label="Flokkur"
            class="column is-4"
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
            v-model="place.contact"
            :disabled="working"
            label="Tengiliður"
            class="column is-6"
          />        

          <Input
            v-model="place.email"
            :disabled="working"
            label="Netfang"
            class="column is-6"
          />
        </div>

        <div class="columns">        
          <Input
            v-model="place.website"
            :disabled="working"
            label="Vefsíða"
            class="column is-3"
          />

          <Input
            v-model="place.phone"
            :disabled="working"
            label="Símanúmer"
            class="column is-3"
          />        
        
          <Input
            v-model="place.address"
            :disabled="working"
            label="Heimilisfang"
            class="column is-4"
          />

          <Input
            v-model="place.postcode"
            :disabled="working"
            label="Póstnúmer"
            class="column is-2"
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
import Textarea from '../_components/textarea'
import Button from '../_components/button'
import EditMixin from '../_mixins/edit'

export default {
  name: 'PlacesEdit',
  components: {
    Input,
    Select,
    Textarea,
    Hero,
    Notification,
    Button
  },
  mixins: [EditMixin],
  data () {
    return {
      placesApi: {},
      placeCategoriesApi: {},
      place: {},
      placeCategories: []
    }
  },
  computed: {
    title () {
      return this.place.name ? this.place.name : 'Staðir'
    },
    subtitle () {
      return this.isEdit ? 'Breyttu og lagaðu.' : 'Skráðu nýjan stað.'
    }
  },
  created () {
    this.working = true
    this.placesApi = makeAPI('places')
    this.placeCategoriesApi = makeAPI('placecategories')
    const id = this.$route.params.id

    this.placesApi
      .getSingle(id)
      .then(place => {
        this.place = place
        this.working = false
      })
      .catch(() => {
        this.error = true
        this.message = 'Villa kom upp. Staður fannst ekki.'
      })

    this.placeCategoriesApi
      .getAll()
      .then(categories => {
        this.placeCategories = categories.map(category => ({
          value: category.id,
          text: category.name
        }))
      })
      .catch(e => {
        this.error = true
        this.message = 'Villa kom upp við að sækja staði.'
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
