
<template>
  <div>
    <function-nal name="你好" content="世界" />
    <yf-checkebox  v-model="check" value="1245"></yf-checkebox>
    <p>
      <!-- <input type="text" :value='check' @input='check=$event.target.value'> -->
    </p>
    <button @click="getCheck">checkebox-val</button>
    {{ check }}
    <p>
      功能权限：延用原权限管理，为角色授权菜单、按钮权限
      数据权限：给登陆账号授权扣缴义务人权限为系统管理中组织管理模块。新增部门数据权限,部门为集团下虚拟节点,授权后可查看、申报该部门下员工信息
    </p>
    <p>
      {{ obj.txt }}
    </p>
    <children-frist v-on:cnm='alertEvent' :a="1" :b="2">
      <nb>
        qweqw
      </nb>
      <template v-slot:age="slotProps">
        <p>{{slotProps}}</p>
      </template>
      <template v-slot:nn>
        <p>员工管理nn</p>
      </template>
      <template v-slot:gg>
        <p>员工管理gg</p>
      </template>
    </children-frist>
  </div>
</template>
<script>
/**
 * @description:test界面
 */
import FunctionNal from "./functional";
import childrenFrist from "./children";
import { YfCheckebox } from "@/components/index";
export default {
  components: { FunctionNal, YfCheckebox, childrenFrist },
  // render: function(createElement) {
  //   return createElement("div", { class: "jjj" }, 12);
  // },
  data() {
    return {
      check: true,
      name: "yunfei",
      obj: {
        txt: `这是一${12}段文本`
      }
    };
  },
  computed: {
    pack: {
      get: function() {
        return this.name
          .split("")
          .reverse()
          .join("");
      },
      set: function(v) {
        console.log("设置值：", v);
      }
    }
  },
  watch: {
    name: "kk",
    obj: {
      handler: function(val, oldVal) {
        console.log(val);
        console.log(oldVal);
      },
      deep: true
    }
  },
  methods: {
    alertEvent(v) {
      console.log(v);
    },
    changeTxt() {
      this.obj.txt = "加油";
    },
    getCheck() {
      console.log(this.check);
    }
  }
};
</script>

<style>
.test_box {
}
</style>