<template>
  <div class="pt-3 pb-2 mb-3 border-bottom">
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1 class="h2">
        Staðir
      </h1>
      <div class="btn-toolbar mb-2 mb-md-0">
        <button
          type="button"
          class="btn btn-sm btn-outline-secondary"
          @click="add()"
        >
          <span data-feather="plus" />
          Stofna nýtt
        </button>
      </div>
    </div>

    <div class="table-responsive">
      <table class="table align-middle">
        <thead>
          <tr>
            <th scope="col">
              #
            </th>
            <th scope="col">
              Nafn
            </th>
            <th scope="col">
              &nbsp;
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="place in places"
            :key="place.id"
          >
            <td>{{ place.id }}</td>
            <td>{{ place.name }}</td>
            <td class="text-end">
              <button
                type="button"
                class="btn btn-sm btn-outline-secondary"
                @click="edit(place.id)"
              >
                <span data-feather="edit-2" />
                Breyta
              </button>
            </td>
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
  },
  methods: {
    add () {
      this.$router.push({
        name: 'EditPlaces',
        params: { id: 'add' }
      })
    },
    edit (id) {
      this.$router.push({
        name: 'EditPlaces',
        params: { id }
      })
    }
  }
}
</script>
