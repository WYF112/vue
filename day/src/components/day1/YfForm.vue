<template>
  <div>
    <slot></slot>
  </div>
</template>
<script>
export default {
  provide () {
    return {
      form: this
    }
  },
  data () {
    return {
      data: ''
    }
  },
  props: {
    model: { type: Object, required: true },
    rules: { type: Object }
  },
  methods: {
    async validate (cb) {
      // 执行表单中所有表单项校验
      const tasks = this.$children
        .filter(item => item.prop)
        .map(item => item.validate())
      const results = await Promise.all(tasks)
      let flag = null
      if (results.some(valid => !valid)) {
        // 校验失败
        flag = false
        cb(flag)
      } else {
        flag = true
        cb(flag)
      }
    }
  }
}
</script>
