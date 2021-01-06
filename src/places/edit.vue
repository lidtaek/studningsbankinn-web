<template>
  <div class="pt-3 pb-2 mb-3 border-bottom">
    <h2>Staðir</h2>
    <form @submit.prevent>
      <div class="mb-3">
        <label
          for="name"
          class="form-label"
        >
          Nafn
        </label>
        <input
          id="name"
          v-model="place.name"
          type="text"
          class="form-control"
        >
      </div>
      <button
        type="submit"
        class="btn btn-primary"
        @click="save"
      >
        Vista
      </button>
    </form>
  </div>
</template>

<script>
import agent from 'superagent'

export default {
  name: 'PlacesList',
  data () {
    return {
      place: {}
    }
  },
  created () {
    const apiUrl = process.env.STUDNINGSBANKINN_API_URL + '/places'
    const id = this.$route.params.id

    if (!isNaN(Number(id))) {
      agent.get(apiUrl + '/?id=' + id).then(res => {
        this.place = res.body[0]
      })
    }
  },
  methods: {
    save () {
      const apiUrl = process.env.STUDNINGSBANKINN_API_URL + '/places'
      const method = this.place.id ? 'put' : 'post'
      console.log(this.place)
      agent(method, apiUrl)
        .send(this.place)
        .then(res => {
          console.log(res.body)
        })
    }
  }
}
</script>
