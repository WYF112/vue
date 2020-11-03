<template>
  <Sider hide-trigger :style="{ background: '#fff', overflow: 'auto' }">
    <Menu
      active-name="1-2"
      theme="light"
      width="auto"
      style="height:100%;"
      :class="menuitemClasses"
      :open-names="['1']"
    >
      <Submenu name="1">
        <template slot="title">
          <Icon type="ios-navigate"></Icon>Item 1
        </template>
        <MenuItem name="1-1">
          <router-link to="/fundate">FunDate</router-link>
        </MenuItem>
        <MenuItem name="1-2">
          <router-link to="/instruct">Instruct</router-link>
        </MenuItem>
        <MenuItem name="1-3">
          <router-link to="/test">Test</router-link>
        </MenuItem>
      </Submenu>
      <Submenu name="2">
        <template slot="title">
          <Icon type="ios-keypad"></Icon>Item 2
        </template>
        <MenuItem name="2-1">
          <router-link to="/test2">Test2</router-link>
        </MenuItem>
        <MenuItem name="2-2">Option 2</MenuItem>
      </Submenu>
      <Submenu name="3">
        <template slot="title">
          <Icon type="ios-analytics"></Icon>Item 3
        </template>
        <MenuItem name="3-1">Option 1</MenuItem>
        <MenuItem name="3-2">Option 2</MenuItem>
      </Submenu>
    </Menu>
  </Sider>
</template>

<script>
/**
 *   @description 菜单
 */
export default {
  data() {
    return {
      isCollapsed: true
    };
  },
  computed: {
    menuitemClasses: function() {
      return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
    }
  }
};
</script>

<style>
.menu-item span {
  display: inline-block;
  overflow: hidden;
  width: 69px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width 0.2s ease 0.2s;
}
.menu-item i {
  transform: translateX(0px);
  transition: font-size 0.2s ease, transform 0.2s ease;
  vertical-align: middle;
  font-size: 16px;
}
.collapsed-menu span {
  width: 0px;
  transition: width 0.2s ease;
}
.collapsed-menu i {
  transform: translateX(5px);
  transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
  vertical-align: middle;
  font-size: 22px;
}
</style>