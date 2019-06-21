class Compile {
    constructor(el, vm) {
        this.$vm = vm
        this.$el = document.querySelector(el)
        /* 判断是否存在当前节点 */
        if (this.$el) {
            // 提取宿主中模板内容到Fragment标签，dom操作会提高效率
            this.$fragment = this.node2Fragment(this.$el)
            // 模板编译内容，同时进行依赖收集
            this.compile(this.$fragment)
            this.$el.appendChild(this.$fragment);
        }
    }
    node2Fragment(el) {
        const fragment = document.createDocumentFragment()
        let child
        while ((child = el.firstChild)) {
            // console.log(el.firstChild)
            fragment.appendChild(child)
        }
        return fragment
    }
    compile(el) {
        const childNodes = el.childNodes
        Array.from(childNodes).forEach(node => {
            // 判断节点类型
            if (node.nodeType === 1) {
                // element节点
                // console.log('编译元素节点'+node.nodeName)
                this.compileElement(node)
            } else if (this.isInterpolation(node)) {
                // console.log(node.textContent)
                //插值表达式
                this.compileText(node)
            }
            // 递归子节点
            if (node.childNodes && node.childNodes.length > 0) {
                this.compile(node);
            }
        })
    }
    // 匹配插值表达式 {{}}
    isInterpolation(node) {
        return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
    }
    // 编译当前节点，判断是否存在 yf- @
    compileElement(node) {
        let nodeAttrs = node.attributes
        Array.from(nodeAttrs).forEach(attr => {
            const attrName = attr.name
            const exp = attr.value
            /* 判断当前节点上存在的类型 */
            // 指令
            if (this.isDirective(attrName)) {
                // 获取当前 指令类型
                const dir = attrName.substring(2)
                // console.log(dir)
                this[dir] && this[dir](node, this.$vm, exp)
            }
            // 事件
            if (this.isEvent(attrName)) {
                const dir = attrName.substring(1)
                // console.log(dir)
                this.eventHandler(node, this.$vm, exp, dir)
            }
        })
    }
    // 编译插值表达式
    compileText(node) {
        // console.log(RegExp.$1)
        this.update(node, this.$vm, RegExp.$1, 'text')
    }
    /* node 当前编译节点 
       vm当前实例化 
       exp匹配值 
       dir用于匹配通用方法 */
    update(node, vm, exp, dir) {
        let updatrfn = this[dir + 'Updater']
        /* 初始化（用于为静态界面赋值）
           判断有无此方法
           vm[exp]指向 data中的值
           更新其值
        */
        updatrfn && updatrfn(node, vm[exp])
        // 依赖收集
        new Watcher(vm, exp, function (value) {
            /* observe 数据劫持后 更新视图 */
            updatrfn && updatrfn(node, value)
        })
    }
    /* ------------指令判断------------ */
    isDirective(attr) {
        return attr.indexOf('k-') === 0
    }
    isEvent(attr) {
        return attr.indexOf('@') === 0
    }
    /* -------------指令类型------------- */
    eventHandler(node,vm,exp,dir){
        // 获取methods内定义的方法
        const fn = vm.$options.methods && vm.$options.methods[exp]
        if(dir && fn){
            node.addEventListener(dir, fn.bind(vm))
        }
    }
    model(node, vm, exp){
        /* 双线绑定 
            data->view
            view-data
        */
       this.update(node,vm,exp,'model')
        node.addEventListener('input', e=>{
            vm[exp] = e.target.value
        })
    }
    text(node, vm, exp) {
        this.update(node,vm,exp,'text')
    }
    html(node, vm, exp) {
        this.update(node,vm,exp,'html')
    }
    /* 为节点 更新数据 */
    textUpdater(node, val) {
        node.textContent = val;
    }
    htmlUpdater(node, val) {
        node.innerHTML = val
    }
}