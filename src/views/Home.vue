<template>
  <div class="layout yf-layout">
    <Layout>
      <!-- 头部 -->
      <yf-header></yf-header>
      <Layout class="ivu-layout-has-sider ivu-layout-has-siders">
        <!-- 菜单 -->
        <yf-sider></yf-sider>
        <!-- 内容 -->
        <yf-content> </yf-content>
      </Layout>
    </Layout>
  </div>
</template>
<script>
import { YfContent, YfHeader, YfSider } from "@/components/index";
export default {
  components: { YfContent, YfHeader, YfSider }
};
</script>
<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.yf-layout {
  display: flex;
  flex: 1;
}
.ivu-layout-has-siders {
  overflow: auto;
}
</style>