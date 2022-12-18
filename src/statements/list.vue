<template>
  <div>
    <Hero
      title="Fullyrðingar"
      subtitle="Stofnaðu nýja fullyrðingu eða breyttu eldri skráningu."
    />
    <section class="box">
      <table class="table is-fullwidth">
        <thead>
          <tr>
            <th            
              class="has-text-centered has-text-grey-light"
              width="9%"
            >
              #
            </th>
            <th width="89%">
              Heiti
            </th>
            <th
              width="1%"
              class="has-text-right"
            />
            <th
              width="1%"
              class="has-text-right"
            >
              <button
                class="button is-small is-info"
                @click="add()"
              >
                <span class="icon">
                  <i class="fas fa-plus" />
                </span>
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="statement in statements"
            :key="statement.id"
          >
            <td class="has-text-centered has-text-grey-light">{{ statement.id }}</td>
            <td>{{ statement.statement }}</td>
            <td class="has-text-right">
              <button
                class="button is-small is-warning"
                @click="editQuestions(statement.id)"
              >
                <span class="icon">
                  <i class="fas fa-list" />
                </span>
              </button>
            </td>
            <td class="has-text-right">
              <button
                class="button is-small is-warning"
                @click="edit(statement.id)"
              >
                <span class="icon">
                  <i class="fas fa-pen" />
                </span>
              </button>
            </td>
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
  name: 'StatementsList',
  components: {
    Hero
  },
  data () {
    return {
      statements: []
    }
  },
  created () {
    const statementsApi = makeAPI('statements')

    statementsApi
      .getAll()
      .then(statements => {
        this.statements = statements
      })
  },
  methods: {
    add () {
      this.$router.push({
        name: 'EditStatements',
        params: { id: 'add' }
      })
    },
    edit (id) {
      this.$router.push({
        name: 'EditStatements',
        params: { id }
      })
    },
    editQuestions (id) {
      this.$router.push({
        name: 'EditStatementQuestions',
        params: { id }
      })
    }
  }
}
</script>
