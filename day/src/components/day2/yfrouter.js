class Yfrouter {
  constructor (vue, options) {
    this.$options = options
    /* 
        this.routeMap 
        防止实例的路由重复
        存储结构
        key : 配置的path
        value: 组件
    */
    this.routeMap = {}
    this.app = new vue({
      data: {
        /* current 表示当前的router 基于hash */
        current: '#/'  
      }
    })
    // 事件监听 (监听router的变化)
    this.init()
    // 创建Router保存组件
    this.createRouteMap(this.$options)
    // 替换界面中的节点
    this.initComponent(Vue)
  }
  //初始化
  init () {
    window.addEventListener('load', this.onHashChange.bind(this), false)
    window.addEventListener('hashchange', this.onHashChange.bind(this), false)
  }
  // 存储当前组件与path
  createRouteMap (options) {
    // options.routes 我们配置好的[{},{}]router关系
    options.routes.forEach(item => {
      this.routeMap[item.path] = item.component
    })
  }
  //注册组件
  initComponent (Vue) {
    vue.component('router-link',{
      props:{
          to: String
      },
      render(h) {
        h(
          'a',
          { attrs: {href: this.to}},
          this.$slots.default
        )
      }
    })
    const _this = this
    Vue.component('router-view',{
      render(h){
        var component = _this.routeMap[_this.app.current]
        return h(component)
      }
    })
  }
  // gethash 获取当前最新的路由
  getHash () {
    return window.location.hash.slice(1) || '/'
  }
  // 重点因为其值改变从而触发render 重新渲染
  onHashChange () {
    this.app.current = this.getHash()
  }
}