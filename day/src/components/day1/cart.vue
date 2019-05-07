<template>
  <div>
    {{title}}
    <table border>
      <thead>
        <tr>
          <th>
            <input type="checkbox" v-model="ace">
          </th>
          <th>商品名</th>
          <th>单价</th>
          <th>数量</th>
          <th>价格</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in cart" :key="index">
          <td>
            <input type="checkbox" v-model="item.active">
          </td>
          <td>{{item.text}}</td>
          <td>{{item.price}}</td>
          <td>{{item.count}}</td>
          <td>{{item.count*item.price}}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="4">总价</td>
          <td>{{total}}</td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>
<script>
export default {
  data () {
    return {
      cart: JSON.parse(localStorage.getItem('cart')) || []
    }
  },
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  computed: {
    total () {
      return this.cart.reduce((sum, c) => {
        if (c.active) {
          sum += c.price * c.count
        }
        return sum
      }, 0)
    },
    ace () {
      const res = this.cart.find(e => e.active === false)
      if (res) {
        return false
      } else {
        return true
      }
    }
  },
  created () {
    this.$bus.$on('addCart', goods => this.addCart(goods))
  },
  methods: {
    addCart (val) {
      const flag = this.cart.find(e => e.id === val.id)
      if (!flag) {
        this.cart.push({...val, count: 1, active: true})
      } else {
        flag.count += 1
      }
      this.$emit('addCart')
    }
  }
}
</script>
