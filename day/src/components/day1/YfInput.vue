<template>
  <div>
    <input :type='type' :value='value' @input='onInput'>
  </div>
</template>
<script>
export default {
  data () {
    return {
      data: ''
    }
  },
  props: {
    type: {
      type: String,
      default: 'text'
    },
    value: {
      type: String,
      default: ''
    }
  },
  methods: {
    onInput (val) {
      this.$emit('input', val.target.value)
      this.$parent.$emit('validate')
    }
  }
}
</script>
