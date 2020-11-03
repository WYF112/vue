<template>
  <div>
    <input type="text" v-model="name" />
    <input type="text" v-model="parseName" />
    <input type="text" v-model="a" />
    <input type="text" v-model="b" />
    <p>{{ parseName }}</p>
    <p>{{ name }}</p>
    <a-com />
    <button @click="show">测试 nextTick</button>
    <div id="zz" v-if="flag">呵呵</div>
    <div>
      <button @click="flag = !flag">动画</button>
    </div>
    <transition name="yunfei">
      <div v-if="flag">你好</div>
    </transition>
    <div>
      <button @click="tag = 1">第一</button>
      <button @click="tag = 2">第二</button>
    </div>
    <!-- <component :is="ComponentA"></component> -->
    <component-a></component-a>
  </div>
</template>

<script>
import aCom from "./a";
import { VM } from "@/tools/on";
const ComponentA = {
  template:"<div>1234214</div>"
};
export default {
  components: {
    aCom,
    "component-a":ComponentA
    // com1: {
    //   template: "<div>hahaha</div>"
    // },
    // com2: {
    //   template: "<div>xixixi</div>"
    // }
  },
  data() {
    return {
      tag: 1,
      flag: false,
      name: "name",
      a: 1,
      b: 2
    };
  },
  created() {
    VM.$on(["test", "test3"], msg => {
      console.log(msg);
    });
    VM.$once("test2", v => {
      console.log(v);
    });
  },
  computed: {
    parseName: {
      get: function() {
        return this.name + "_haha";
      },
      set: function(v) {
        this.name = v + "_干";
      }
    }
  },
  watch: {
    name: {
      handler: function(v, oldv) {
        console.log(v);
        console.log(oldv);
      },
      deep: true
    }
  },
  methods: {
    show() {
      this.flag = true;
      console.log(this.flag);
      console.log(document.querySelector("#zz"));
      this.$nextTick(() => {
        console.log(document.querySelector("#zz"));
      });
    }
  },
  mounted() {
    const unwatch = this.$watch(
      function() {
        return this.a;
      },
      function(v, oldv) {
        console.log(v);
        console.log(oldv);
      },
      { deep: true }
    );
    setTimeout(() => {
      unwatch();
    }, 3000);
    setTimeout(() => {
      // this.$destroy();
    }, 6000);
  }
};
</script>

<style>
.yunfei-enter-active,
.yunfei-leave-active {
  transition: opacity 0.5s;
}
.yunfei-enter-active,
.yunfei-leave-to {
  opacity: 0;
}
</style>