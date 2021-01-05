<template>
  <div class="pt-3 pb-2 mb-3 border-bottom">
    <h2>Staðir</h2>
    <div class="table-responsive">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Nafn</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="place in places"
            :key="place.id"
          >
            <td>{{ place.id }}</td>
            <td>{{ place.name }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import agent from 'superagent'

export default {
  name: 'PlacesList',
  data () {
    return {
      places: []
    }
  },
  created () {
    const apiUrl = process.env.STUDNINGSBANKINN_API_URL

    agent.get(apiUrl + '/places').then(res => {
      this.places = res.body
    })
  }
}
</script>
