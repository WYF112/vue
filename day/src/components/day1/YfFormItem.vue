<template>
  <div>
    <label v-if='lable'>{{lable}}:</label>
    <slot></slot>
    <span v-if='errorMessage'>{{errorMessage}}</span>
  </div>
</template>
<script>
import Validator from 'async-validator'
import { Promise } from 'q'
export default {
  inject: ['form'],
  data () {
    return {
      errorMessage: ''
    }
  },
  props: ['lable', 'prop'],
  created () {
    this.$on('validate', this.validate)
  },
  methods: {
    validate () {
      return new Promise(resolve => {
        // 校验规则
        const descriptor = { [this.prop]: this.form.rules[this.prop] }
        // 创建校验器
        const validator = new Validator(descriptor)
        // 执行校验
        validator.validate(
          { [this.prop]: this.form.model[this.prop] },
          errors => {
            if (errors) {
              // 显示错误信息
              this.errorMessage = errors[0].message
              resolve(false)
            } else {
              this.errorMessage = ''
              resolve(true)
            }
          }
        )
      })
    }
  }
}
</script>
