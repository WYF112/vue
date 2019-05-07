<template>
  <div id="app">
    <input type="text" v-model="text" />
    <button @click="addGood">新增</button>
    <ul>
      <li v-for='(item,index) in goods' :key='index'>
        {{item.text}} <button @click="addCart(item)">加购物车</button>
      </li>
    </ul>
    <Cart :title="title" ref='cart' @addCart='a'></Cart>
  </div>
</template>
<script>
import Cart from './cart'
export default {
  components: {Cart},
  name: 'App',
  data () {
    return {
      title: '哈哈',
      text: '',
      goods: [
        {id: 0, text: '被子', price: 2303},
        {id: 1, text: '电脑', price: 1293}
      ]
    }
  },
  methods: {
    addGood () {
      this.goods.push({
        id: this.goods.length + 1,
        text: this.text,
        price: 1024
      })
      this.text = ''
    },
    addCart (val) {
      // this.$bus.$emit('addCart', val)
      this.$refs.cart.addCart(val)
    },
    a () {
      console.log('我是回调函数')
    }
  }
}
</script>
