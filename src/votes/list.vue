<template>
  <div>
    <Hero
      title="Atkvæði"
      subtitle="Var notandinn sammála eða ósammála svari?"
    />
    <section class="box">
      <table class="table is-fullwidth">
        <thead>
          <tr>
            <th width="9%">
              #
            </th>
            <th width="28%">
              Staður
            </th>
            <th width="28%">
              Spurning
            </th>
            <th
              class="has-text-centered"
              width="15%"
            >
              Atkvæði
            </th>
            <th width="20%">
              IP tala
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="vote in votes"
            :key="vote.id"
          >
            <td>{{ vote.id }}</td>
            <td>{{ vote.placeName }}</td>
            <td>{{ vote.question }}</td>
            <td class="has-text-centered">
              <i
                v-if="vote.vote > 0"
                class="fas fa-thumbs-up has-text-success"
              />

              <i
                v-if="vote.vote < 0"
                class="fas fa-thumbs-down has-text-danger"
              />
            </td>
            <td>{{ vote.ipAddress }}</td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script>
import makeAPI from '../api'
import Hero from '../_components/hero'

export default {
  name: 'VotesList',
  components: {
    Hero
  },
  data () {
    return {
      votes: []
    }
  },
  created () {
    const votesApi = makeAPI('votes')

    votesApi
      .getAll()
      .then(votes => {
        this.votes = votes
      })
  },
  methods: {
    add () {
      this.$router.push({
        name: 'EditVotes',
        params: { id: 'add' }
      })
    },
    edit (id) {
      this.$router.push({
        name: 'EditVotes',
        params: { id }
      })
    }
  }
}
</script>
