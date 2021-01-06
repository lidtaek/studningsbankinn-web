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
        <div class="field">
          <label class="label">Nafn</label>
          <div class="control">
            <input
              v-model="place.name"
              class="input"
              type="text"
            >
          </div>
        </div>

        <div class="field is-grouped">
          <div class="control">
            <button
              class="button is-primary"
              @click="save()"
            >
              Vista
            </button>
          </div>
          <div class="control">
            <button
              class="button is-danger is-light"
              @click="del()"
            >
              Eyða
            </button>
          </div>
        </div>
      </form>
    </section>
  </div>
</template>

<script>
import agent from 'superagent'
import Hero from '../components/hero'
export default {
  name: 'PlacesList',
  components: {
    Hero
  },
  data () {
    return {
      place: {}
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
      agent.get(apiUrl + '/?id=' + id).then(res => {
        console.log(res.body)
        if (res.body.length === 1) {
          this.place = res.body[0]
        }
      })
    }
  },
  methods: {
    save () {
      const apiUrl = process.env.STUDNINGSBANKINN_API_URL + '/places'
      const method = this.place.id ? 'put' : 'post'
      agent(method, apiUrl)
        .send(this.place)
        .then(res => {
          console.log(res.body)
        })
    },
    del () {
      const apiUrl = process.env.STUDNINGSBANKINN_API_URL + '/places'
      agent
        .del(apiUrl)
        .send(this.place)
        .then(res => {
          console.log(res.body)
        })
    }
  }
}
</script>
