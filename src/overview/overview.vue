<template>
  <div>
    <Hero
      :title="title"
      :subtitle="subtitle"
      :x="false"
    />
    <section class="box">
      <form @submit.prevent>        
        <div class="columns">
          <div class="column is-12 has-text-centered">
            <div class="block">
              Velkominn í Stuðningsbankann. Hér getur þú breytt almennum upplýsingum svo sem lýsingu, tengiliði, netfangi og símanúmeri. Þú getur líka fyllt út svör við spurningalistanum fyrir þinn skóla.
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="column is-6 has-text-centered">
            <Button
              label="Upplýsingar"
              :disabled="false"
              @click="goToPlace"
            />
          </div>
          <div class="column is-6 has-text-centered">
            <Button
              label="Svör"
              :disabled="false"
              @click="goToAnswer"
            />
          </div>
        </div>
        
      </form>
    </section>
  </div>
</template>

<script>
import agent from 'superagent'
import Hero from '../_components/hero'
import Button from '../_components/button'
import EditMixin from '../_mixins/edit'

export default {
  name: 'Actions',  
  components: {
    Hero,
    Button,
  },
  mixins: [EditMixin],
  data () {
    return  {
      token: undefined,
      place: {}
    }
  },
  computed: {
    title () {
      return this.place.name ? this.place.name : 'Staðir'
    },
    subtitle () {
      return 'Yfirlit'
    }
  },
  methods: {
    goToPlace () {
      this.$router.push({
        name: 'Place',
        params: { token: this.$route.params.token }
      })

    },
    goToAnswer ()  {
      this.$router.push({
        name: 'Answer',
        params: { token: this.$route.params.token }
      })
    }
  },
  created () {
    const token = this.$route.params.token

    agent
      .get(process.env.STUDNINGSBANKINN_API_URL + '/places')
      .set('Authorization', 'Bearer ' + token)     
      .then(res => {
        this.place = res.body[0]
        this.working = false
      })
      .catch(() => {
        this.error = true
        this.message = 'Villa kom upp. Staður fannst ekki.'
      })    

  }
}
</script>

<style scoped>
.table td {
  vertical-align: middle;
}
</style>
