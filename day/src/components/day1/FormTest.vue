<template>
  <div>
    <!-- <el-form :model='model' :rules='rules' ref='loginForm'>
      <el-form-item label='用户名' prop='username'>
        <el-input v-model='model.username' autocomplete='off'></el-input>
      </el-form-item>
      <el-form-item label='确认密码' prop='password'>
        <el-input type='password' v-model='model.password' autocomplete='off'></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type='primary' @click="submitForm('loginForm')">提交</el-button>
      </el-form-item>
    </el-form> -->
    {{model.username}}
    <yf-form :model="model" :rules="rules" ref="kForm">
      <yf-form-item lable='用户名' prop='username'>
        <yf-input type='text' :value="model.username" @input="model.username=$event"></yf-input>
      </yf-form-item>
      <yf-form-item lable='密码' prop='password'>
        <yf-input type='password' :value="model.password" @input="model.password=$event"></yf-input>
      </yf-form-item>
      <yf-form-item>
        <el-button type="primary" @click="submitForm('kForm')">提交</el-button>
      </yf-form-item>
    </yf-form>
  </div>
</template>
<script>
import YfForm from './YfForm'
import YfInput from './YfInput'
import YfFormItem from './YfFormItem'
export default {
  components: {YfForm, YfInput, YfFormItem},
  data () {
    return {
      data: '',
      model: { username: 'tom', password: '' },
      rules: {
        username: [{ required: true, message: '请输入用户名' }],
        password: [{ required: true, message: '请输入密码' }]
      }
    }
  },
  methods: {
    submitForm (name) {
      this.$refs[name].validate(valid => {
        console.log(valid)
        if (valid) {
          console.log('请登录')
        } else {
          console.log('校验失败')
        }
      })
    }
  }
}
</script>
