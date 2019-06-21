class YFvue {
  constructor(options) {
    this.$options = options
    this.$data = options.data


    /* 事件劫持 */
    this.observe(this.$data)
    // new Watcher()
    // this.$data.name
    /* 模板编译 */
    new Compile(options.el, this)
  }
  observe(value){
    //   判断当前传入值是否为object
    if (!value || typeof value !== 'object') {
        return;   
    }
    Object.keys(value).forEach(e => {
        this.defineReactive(value, e, value[e])
        // 代理到当前实例
        this.proxyData(e)
    })
  }
  proxyData(key){
    Object.defineProperty(this, key, {
        get(){
            return this.$data[key]
        },
        set(newValue){
            this.$data[key] = newValue
        }
    })
  }

  defineReactive(data, key, value) {
    // 此处发布一个 ‘订阅者’
    let deps = new Dep()
    Object.defineProperty(data, key, {
        get(){
            /* 当前读取属性时 我们订阅一个事件  
                当前被订阅的时间 是否绑定了一个
                监听，有则将其add进deps
            */
            Dep.target && deps.addDeps(Dep.target)
            return value
        },
        set(newvalue){
            if(value != newvalue){
                value=newvalue 
                /* 设置当前属性值，我们监听后，执行dep的watcher的方法 */
                deps.notify()
            }
        }
    })
    // 递归 （当前value若为Object则继续执行劫持）
    this.observe(value);
  }
}
/* 订阅者 Dep 
    两个方法 一个是add方法
    一个是执行方法
*/
class Dep {
    constructor(options){
        // 用于存储当前 key所对应的实例元素
        this.deps = []
    }
    // 新增
    addDeps(dep){
        this.deps.push(dep)
    }
    notify(){
        this.deps.map(dep=>{
            dep.update()
        })
    }
}
/* 监听者，
    用于实例化监听当前节点
    每new一个watcher都是对当前元素的监听
 */
class Watcher {
    constructor(vm, key, cd){
        this.vm = vm 
        this.key = key
        this.cd = cd
        Dep.target = this
        this.vm[this.key] //添加watcher到dep（重点）
        Dep.target = null //清空为下一个watcher做准备
    }
    update(){
        // console.log('执行了')
        this.cd.call(this.vm, this.vm[this.key])
    }
}