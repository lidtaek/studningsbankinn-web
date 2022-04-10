<template>
  <div>
    <Hero
      :title="title"
      :subtitle="subtitle"
      :x="false"
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
            class="column is-7"
          />

          <Input
            v-model="place.shortName"
            :disabled="working"
            label="Stutt nafn"
            class="column is-3"
          />

          <Input
            v-model="place.abbreviation"
            :disabled="working"
            label="Skammstöfun"
            class="column is-2"
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
import agent from 'superagent'
import Hero from '../_components/hero'
import Notification from '../_components/notification'
import Input from '../_components/input'
import Select from '../_components/select'
import Textarea from '../_components/textarea'
import Button from '../_components/button'
import EditMixin from '../_mixins/edit'

export default {
  name: 'Place',
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
      place: {},
    }
  },
  computed: {
    title () {
      return this.place.name ? this.place.name : 'Staðir'
    },
    subtitle () {
      return 'Skráning upplýsinga'
    }
  },
  created () {
    this.working = true
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
  },
  methods: {
    save () {      
      this.working = true
      this.success = false
      this.error = false

      const token = this.$route.params.token

      agent
        .put(process.env.STUDNINGSBANKINN_API_URL + '/places')
        .set('Authorization', 'Bearer ' + token)     
        .send(this.place)        
        .then(res => {
          if (res.body.id) {
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
    }
  }
}
</script>
