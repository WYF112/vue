<template>
  <div>
    子界面
    <p>
      <button @click="a">执行</button>
    </p>
    <p>
      <button @click="b">执行一次</button>
    </p>
    <p>
      <button @click="c">wo d tian</button>
    </p>
    <p>
      <button @click="d">off</button>
    </p>
    <p><button @click="rm">remove</button></p>
    <p>
      {{ obj }}
    </p>
  </div>
</template>

<script>
import { VM } from "@/tools/on";
export default {
  data() {
    return {
      obj: {
        a: 1,
        b: 2
      }
    };
  },

  methods: {
    a() {
      VM.$emit("test", 12);
    },
    b() {
      VM.$emit("test2", "仅执行一次");
    },
    c() {
      VM.$emit("test3", "wo d tian");
    },
    d() {
      VM.$off("test3");
    },
    rm() {
      VM.$delete(this.obj, "b");
      this.$delete(this.obj, "a");
    }
  },
  mounted() {
    console.log(12)
  }
};
</script>

<style>
</style>