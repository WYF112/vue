/**
* @description: 指令
*/
<template>
  <div class="instruct">
    <div v-pre>
      hello world
    </div>
    <div v-cloak >
      隐藏{{hhh}}
    </div>
    <div v-once>
        {{i}}
    </div>
    <form action="/login" method="post" @submit.prevent="() => 1">
      <button>提交</button>
    </form>
    <div v-html="html"></div>
    <div v-once>{{ html }}</div>
    <div>{{ flag ? "你好" : "不好" }}</div>
    <div>{{ Date.now() }}</div>
    <ul>
      <li v-if="sum == 1">1</li>
      <li v-else-if="sum == 2">2</li>
      <li v-else-if="sum == 3">3</li>
      <li v-else>4</li>
    </ul>
    <div v-for="(v, n, i) in arr" :key="n">
      {{ v }}
      {{ n }}
      {{ i }}
    </div>
    <div
      @click.stop.prevent="handle1"
      style="width:200px;height:200px;border:1px solid"
    >
      <div
        @click.stop.prevent="handle2"
        style="width:100px;height:100px;border:1px solid"
      ></div>
    </div>
    <button @keyup.enter="keyHandle">测试</button>
    <div :class="['a', 'b']">class1</div>
    <div :class="{ a: 'b' }">class2</div>
    <div v-bind:text-content.prop="text"></div>
    <input type="text" v-model.lazy="val" />
    <input type="text" v-model.number="val2" />
    <input type="text" v-model.trim="val3" />
    <h3>{{ names.a }}</h3>
    <child :names.sync="names">
      <div slot="a">1</div>
      <div slot="b">2</div>
      <template v-slot:c="slotProps">
        <div>{{ slotProps }}</div>
      </template>
    </child>
  </div>
</template>

<script>
import child from "./children";
export default {
  components: { child },
  data() {
    return {
      i:0,
      hhh:'test',
      names: {
        a: "a",
        b: "2"
      },
      val: "",
      val2: "",
      val3: "",
      html: "",
      flag: true,
      sum: 1,
      text: "呵呵哒",
      arr: { a: "A", b: "B", c: "C" }
    };
  },
  methods: {
    handle1() {
      console.log(1);
    },
    handle2() {
      console.log(2);
    },
    keyHandle() {
      console.log("enter");
    }
  },
  mounted() {
    // console.log(this.$el);
    // console.log(this.$root);
    this.html = "<h3>123</h3><script>console.log(1234)";
    
  }
};
</script>

<style>
</style>