<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <el-menu :default-openeds="['0']">
          <el-submenu v-for="(e,i) in nav" :key='i' :index="i+''" >
            <template slot="title"><i class="el-icon-message"></i>
              <router-link :to='e.link'>{{e.title}}</router-link>
            </template>
              <el-menu-item v-for="(ei,ii) in e.list" :index="i+'-'+ii" :key="i+'-'+ii">
                <router-link :to='ei.link'>{{ei.name}}</router-link>
              </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
        </el-header>
        <el-main>
          <router-view/>
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  data () {
    return {
      nav: [
        {
          title: 'day1',
          link: '/day1',
          list: [
            {
              name: '自定义组件',
              link: '/day1/1'
            },
            {
              name: '购物车',
              link: '/day1/2'
            }
          ]
        },
        {
          title: 'day2',
          link: '/day2',
          list: [
            {
              name: 'vue-router',
              link: '/day2/2'
            },
            {
              name: 'vuex',
              link: '/day2/2'
            },
            {
              name: '手写vue-router',
              link: '/day2/3'
            },
            {
              name: '手写vuex',
              link: '/day2/4'
            }
          ]
        }
      ]
    }
  }
}
</script>
<style lang="">
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
  }
  body > .el-container {
    margin-bottom: 40px;
  }
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
