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
          <div class="field column is-12">
            <label class="label">Nafn:</label>
            <div class="control">
              <input
                v-model="place.name"
                class="input"
                type="text"
              >
            </div>
          </div>
        </div>

        <div class="columns">
          <div class="field column is-12">
            <label class="label">Lýsing:</label>
            <div class="control">
              <textarea
                v-model="place.description"
                class="textarea"
                placeholder="Textarea"
              />
            </div>
          </div>
        </div>

        <div class="columns">
          <div class="field column is-6">
            <label class="label">Vefsíða:</label>
            <div class="control">
              <input
                v-model="place.website"
                class="input"
                type="text"
              >
            </div>
          </div>

          <div class="field column is-6">
            <label class="label">Sími:</label>
            <div class="control">
              <input
                v-model="place.phone"
                class="input"
                type="text"
              >
            </div>
          </div>
        </div>

        <div class="columns">
          <div class="field column is-6">
            <label class="label">Heimilisfang:</label>
            <div class="control">
              <input
                v-model="place.address"
                class="input"
                type="text"
              >
            </div>
          </div>

          <div class="field column is-6">
            <label class="label">Póstnúmer:</label>
            <div class="control">
              <input
                v-model="place.postcode"
                class="input"
                type="text"
              >
            </div>
          </div>
        </div>

        <div class="columns">
          <div class="field column is-6">
            <div class="control">
              <button
                class="button is-primary"
                @click="save()"
              >
                Vista
              </button>
            </div>
          </div>

          <div class="field column is-6 has-text-right">
            <div class="control">
              <button
                class="button is-danger is-light"
                @click="del()"
              >
                Eyða
              </button>
            </div>
          </div>
        </div>
      </form>
    </section>
  </div>
</template>

<script>
import agent from 'superagent'
import Hero from '../components/hero'
import Notification from '../components/notification'
export default {
  name: 'PlacesList',
  components: {
    Hero,
    Notification
  },
  data () {
    return {
      place: {},
      message: '',
      success: false,
      error: false
    }
  },
  computed: {
    subtitle () {
      const id = this.$route.params.id
      return !isNaN(Number(id)) ? 'Breyta skráningu' : 'Skrá nýjan stað'
    }
  },
  created () {
    const apiUrl = process.env.STUDNINGSBANKINN_API_URL + '/places'
    const id = this.$route.params.id

    if (!isNaN(Number(id))) {
      agent
        .get(apiUrl + '/?id=' + id)
        .then(res => {
          if (res.body.length === 1) {
            this.place = res.body[0]
          } else {
            this.error = true
            this.message = 'Staður fannst ekki'
          }
        })
        .catch(e => {
          this.error = true
          this.message = 'Staður fannst ekki'
        })
    }
  },
  methods: {
    save () {
      this.success = false
      const apiUrl = process.env.STUDNINGSBANKINN_API_URL + '/places'
      const method = this.place.id ? 'put' : 'post'

      agent(method, apiUrl)
        .send(this.place)
        .then(res => {
          if (res.body.id > 0) {
            this.success = true
            this.message = 'Aðgerð tókst'
          }
        })
        .catch(e => {
          this.error = true
          this.message = 'Ekki tókst að vista stað'
        })
    },
    del () {
      this.success = false
      const apiUrl = process.env.STUDNINGSBANKINN_API_URL + '/places'

      agent
        .del(apiUrl)
        .send(this.place)
        .then(res => {
          if (res.body.id > 0) {
            this.success = true
            this.message = 'Aðgerð tókst'
          }
        })
        .catch(e => {
          this.error = true
          this.message = 'Ekki tókst að eyða staði'
        })
    }
  }
}
</script>
