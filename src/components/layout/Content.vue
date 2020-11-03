<template>
  <Layout :style="{ padding: '0 24px 24px' }">
    <Breadcrumb :style="{ margin: '24px 0', textAlign: 'left' }">
      <BreadcrumbItem>Home</BreadcrumbItem>
      <BreadcrumbItem>Components</BreadcrumbItem>
      <BreadcrumbItem>Layout</BreadcrumbItem>
    </Breadcrumb>
    <Content
      :style="{ padding: '24px', minHeight: '280px', background: '#fff' }"
    >
      <keep-alive>
        <router-view />
      </keep-alive>
    </Content>
  </Layout>
</template>

<script>
/**
 *  @description 内容
 */
export default {};
</script>

<style>
</style>