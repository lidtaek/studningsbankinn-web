
<script>
export default {
  name: 'EditMixin',
  data () {
    return {
      working: false,
      message: '',
      success: false,
      error: false,
      warning: false
    }
  },
  computed: {
    isEdit () {
      const id = Number(this.$route.params.id)
      return !isNaN(id)
    },
    subtitle () {
      return this.isEdit ? 'Breyta skráningu' : 'Skrá nýtt'
    }
  }
}
</script>
