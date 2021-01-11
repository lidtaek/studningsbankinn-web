<script>
import agent from 'superagent'
export default {
  name: 'LoginMixin',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login () {
      const url = process.env.STUDNINGSBANKINN_API_URL + '/login'

      return agent
        .post(url)
        .withCredentials()
        .send({
          username: this.username,
          password: this.password
        })
        .then(res => {
          const user = res.body
          this.$emit('login', user)
          sessionStorage.setItem('STUDNINGSBANKINN_ADMIN', JSON.stringify(user))
        })
    },
    logout () {
      const url = process.env.STUDNINGSBANKINN_API_URL + '/logout'

      return agent
        .post(url)
        .withCredentials()
        .then(() => {
          this.$emit('logout')
          sessionStorage.removeItem('STUDNINGSBANKINN_ADMIN')
        })
        .catch(() => {
          this.$emit('logout')
          sessionStorage.removeItem('STUDNINGSBANKINN_ADMIN')
        })
    }
  }
}
</script>
