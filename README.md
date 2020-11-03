## vue

    

### vue 全局 api

- Vue.extend 声明组件

- Vue.\$nextTick 节点更新后的回调

- Vue.\$set 动态声明 property，Vue 实例响应状态变更

- Vue.\$delete 删除 propety，Vue 实例响应状态变更

- Vue.directive 自定义指令，param1:指令名，param2:对象{指令声明周期 bind,insert,update,componentUpdate,unbind}

- Vue.filter 过滤指令 param1:指令名，param2: callback 返回值为过滤值

- Vue.component 自定义组件

- Vue.use 用于插件的引入 ；插件 对象包含 install 方法，param1 是 vue 实例，param2 是函数

- Vue.mixin 混入，用于混入声明周期、事件；可自定义固定合并规则，默认以 组件实例为主。（应用于插件开发）

- Vue.observable 让一个对象可响应，更改对象也可更新 view.

- Vue.compile 字符串模板渲染

- Vue.version 获取 vue 版本

---

### 选项/数据

- data Vue 实例的数据对象 Function return object

- props 接受来自父组件的数据；类型检测 type、自定义验证 validate、默认值 default

- propData 只用于 new 创建的实例中

- computed 计算属性，{[key:string]:Function | {get:Function,set:Function}};结果会被缓存，除非依赖的响应式 prototype 变化才会更新

- methods {[key:string]:Function} 方法

- watch { [key: string]: string | Function | Object | Array } 监听属性 handler 方法 deep 深度监听 immediate 侦听开始后立即执行

---

### 选项/DOM

- el 提供在页面上已存在的 DOM 元素作为 Vue 的挂载目标

- template 字符串模板作为 vue 实例的标识使用。模板将会替换挂载的元素。

- render 字符串模板的替代方案，允许发挥 JavaScript 最大编程能力 (createElement: () => VNode) => VNode ；createElement

- renderError 只在开发者环境下工作。 当 render 函数遭遇错误时，提供另外一种渲染输出

### 选项/声明周期钩子

- beforeCreate 实例初始化之后，数据观察（data observer)和 event/watcher 事件之前被调用

- created 实例创建完成后被立即调用。完成 data observer(数据观测),property 和方法的运算，watch/event 事件回调。挂载尚未开始 property 目前不可用

- beforeMount 挂载前被调用：相关 render 函数首次被调用

- mounted 实例被挂载后嗲用，el 被新创建的 VM.$el替换；子组件不保证会一起挂载。保险起见,在mounted内部使用 vm.$nextTick。

- beforeUpdate 数据更新时嗲用。虚拟 DOM 打补丁之前。这里视乎在更新之前访问现有的 DOM；如手动移出已添加的事件监听器

- updated 由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子

- beforeDestroy 实例销毁之前调用。在这一步，实例仍然完全可用。

- destroyed 实例销毁后调用。该钩子被调用后，对应 Vue 实例的所有指令都被解绑，所有的事件监听器被移除，所有的子实例也都被销毁。

- activated 被 keep-alive 缓存的组件激活时调用。

- deactivated 被 keep-alive 缓存的组件停用时调用。

- errCaptured 当捕获一个来自子孙组件的错误时被调用

### 选项/资源

- directives 自定义指令

- filters 过滤

- components 组件

### 选项/组合

- parent 指定已创建的实例之父实例，在两者之间建立父子关系。子实例可以用 this.$parent 访问父实例，子实例被推入父实例的 $children 数组中。

- minxins Array<Object> mixins 选项接收一个混入对象的数组。这些混入对象可以像正常的实例对象一样包含实例选项，这些选项将会被合并到最终的选项中，使用的是和 Vue.extend() 一样的选项合并逻辑

- extends

类型：Object | Function

详细：

允许声明扩展另一个组件 (可以是一个简单的选项对象或构造函数)，而无需使用 Vue.extend。这主要是为了便于扩展单文件组件。

这和 mixins 类似。

- provide/inject provide 和 inject 主要在开发高阶插件/组件库时使用。并不推荐用于普通应用程序代码中。

provide 选项应该是一个对象或返回一个对象的函数。该对象包含可注入其子孙的 property。在该对象中你可以使用 ES2015 Symbols 作为 key，但是只在原生支持 Symbol 和 Reflect.ownKeys 的环境下可工作。

inject 选项应该是：

一个字符串数组，或
一个对象，对象的 key 是本地的绑定名，value 是：
在可用的注入内容中搜索用的 key (字符串或 Symbol)，或
一个对象，该对象的：
from property 是在可用的注入内容中搜索用的 key (字符串或 Symbol)
default property 是降级情况下使用的 value

---

选项/其他

- name 组件命名，便于组件递归弟调用。便于调试，及有好的信息提示

- delimiters 改变纯文本插入分隔符

- functional 使组件无状态和无实例

<template functional>
</template>

Vue.component('my-component', {
functional: true,
})

- model

类型：{ prop?: string, event?: string }

允许一个自定义组件在使用 v-model 时定制 prop 和 event。默认情况下，一个组件上的 v-model 会把 value 用作 prop 且把 input 用作 event，但是一些输入类型比如单选框和复选框按钮可能想使用 value prop 来达到不同的目的。使用 model 选项可以回避这些情况产生的冲突。

- inheritAttrs 默认情况下父作用域的不被认作 props 的 attribute 绑定 (attribute bindings) 将会“回退”且作为普通的 HTML attribute 应用在子组件的根元素上

- comments 当设为 true 时，将会保留且渲染模板中的 HTML 注释

---

### 实例 property

- vm.\$data Vue 实例观察的数据对象。Vue 实例代理了对其 data 对象 property 的访问。

- vm.\$props 当前组件接收到的 props 对象。Vue 实例代理了对其 props 对象 property 的访问

- vm.\$el Vue 实例使用的根 DOM 元素

- vm.options 用于当前 Vue 实例的初始化选项。需要在选项中包含自定义 property 时会有用处

- vm.\$parent 父实例，如果当前实例有的话。

- vm.\$root 当前组件树的根 Vue 实例。如果当前实例没有父实例，此实例将会是其自己。

- vm.$children 当前实例的直接子组件。需要注意 $children 并不保证顺序，也不是响应式的

- vm.\$slot 当前插槽，匿名（<slot>）具名（<slot name='xxx' :obj='obj'></slot> <template v-slot:xxx='obj'>{{obj.name}}</template>）

- vm.\$scopedSlots 用来访问作用域插槽。对于包括 默认 slot 在内的每一个插槽，该对象都包含一个返回相应 VNode 的函数。

- vm.\$refs 一个对象，持有注册过 ref attribute 的所有 DOM 元素和组件实例。

- vm.\$isSever 当前 Vue 实例是否运行于服务器。

- vm.\$attrs 包含了父作用域中不作为 prop 被识别 (且获取) 的 attribute 绑定 (class 和 style 除外)

- vm.$listeners 包含了父作用域中的 (不含 .native 修饰器的) v-on 事件监听器。它可以通过 v-on="$listeners" 传入内部组件——在创建更高层次的组件时非常有用。

---

### 实例方法/数据

- VM.\$watch 全局监听方法 {String | Function , Function}

* VM.\$set 全局设置响应数据方法 { Target : Object | Array , name : String , value}

* vm.\$delete 全局删除响应 {targer:Object : String}

---

实例方法/事件

- vm.\$on(event,callback) 监听当前实例上的自定义事件。

- vm.\$once(event,callback) 监听一个自定义事件，只触发一次

- vm.\$off(event,callback) 移出自定义事件监听器

- vm.\$emit(event,callback) 触发当前实例上的事件。附加参数都会传给监听器回调。

---

实例方法/生命周期

- vm.$mount 挂载
如果 Vue 实例在实例化时没有收到 el 选项，则它处于“未挂载”状态，没有关联的 DOM 元素。可以使用 vm.$mount() 手动地挂载一个未挂载的实例。

- vm.\$forceUpdate 强制绘制页面
  迫使 Vue 实例重新渲染。注意它仅仅影响实例本身和插入插槽内容的子组件，而不是所有子组件。

* vm.nextTick 数据更新，界面绘制完成
  将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。它跟全局方法 Vue.nextTick 一样，不同的是回调的 this 自动绑定到调用它的实例上。

* vm.destroy 触发 beforedestroy destroyed
  完全销毁一个实例。清理它与其它实例的连接，解绑它的全部指令及事件监听器。


---

指令

* v-text 文本渲染
更新元素的 textContent。如果要更新部分的 textContent，需要使用 {{ Mustache }} 插值

* v-html 标签渲染
更新元素的 innerHTML。注意：内容按普通 HTML 插入 - 不会作为 Vue 模板进行编译。如果试图使用 v-html 组合模板，可以重新考虑是否通过使用组件来替代。

* v-show 显示-隐藏 （节点已渲染)
根据表达式之真假值，切换元素的 display CSS property。

* v-if   显示-隐藏（节点尚未渲染）
根据表达式的值的 truthiness 来有条件地渲染元素。在切换时元素及它的数据绑定 / 组件被销毁并重建。如果元素是 <template>，将提出它的内容作为条件块。

* v-else 
* v-eles-if
* v-for  循环遍历  v-for= (v,n,i) in obj
基于源数据多次渲染元素或模板块

* v-on 事件绑定 @
.stop - 调用 event.stopPropagation()。
.prevent - 调用 event.preventDefault()。
.capture - 添加事件侦听器时使用 capture 模式。
.self - 只当事件是从侦听器绑定的元素本身触发时才触发回调。
.{keyCode | keyAlias} - 只当事件是从特定键触发时才触发回调。
.native - 监听组件根元素的原生事件。
.once - 只触发一次回调。
.left - (2.2.0) 只当点击鼠标左键时触发。
.right - (2.2.0) 只当点击鼠标右键时触发。
.middle - (2.2.0) 只当点击鼠标中键时触发。
.passive - (2.3.0) 以 { passive: true } 模式添加侦听器
用法：

绑定事件监听器。事件类型由参数指定。表达式可以是一个方法的名字或一个内联语句，如果没有修饰符也可以省略。

* v-bind 属性绑定
.prop - 作为一个 DOM property 绑定而不是作为 attribute 绑定。(差别在哪里？)
.camel - (2.1.0+) 将 kebab-case attribute 名转换为 camelCase。(从 2.1.0 开始支持)
.sync (2.3.0+) 语法糖，会扩展成一个更新父组件绑定值的 v-on 侦听器。

* v-model 双向绑定
.lazy - 取代 input 监听 change 事件
.number - 输入字符串转为有效的数字
.trim - 输入首尾空格过滤

* v-slot 插槽
参数：插槽名 (可选，默认值是 default)
限用于
<template>
组件 (对于一个单独的带 prop 的默认插槽)
用法：
提供具名插槽或需要接收 prop 的插槽。

* v-pre 静态渲染
跳过这个元素和它的子元素的编译过程。可以用来显示原始 Mustache 标签。跳过大量没有指令的节点会加快编译。

* v-cloak 与 display；none同时使用，可隐藏插槽
这个指令保持在元素上直到关联实例结束编译。和 CSS 规则如 [v-cloak] { display: none } 一起用时，这个指令可以隐藏未编译的 Mustache 标签直到实例准备完毕。

* v-once 仅渲染一次
只渲染元素和组件一次。随后的重新渲染，元素/组件及其所有的子节点将被视为静态内容并跳过。这可以用于优化更新性能


----

### 特殊attribute

* key 的特殊 attribute 主要用在 Vue 的虚拟 DOM 算法，在新旧 nodes 对比时辨识 VNodes。如果不使用 key，Vue 会使用一种最大限度减少动态元素并且尽可能的尝试就地修改/复用相同类型元素的算法。而使用 key 时，它会基于 key 的变化重新排列元素顺序，并且会移除 key 不存在的元素

* ref 用来给元素或子组件注册引用信息。引用信息将会注册在度组件的$refs对象上。普通DOM对象上则是dom元素，组件则是组件实例

* is 用于动态组件且基于DOM内模板的限制来工作

* v-slot 具名插槽

----

### 内置的组件

* component 动态组件，is

* transition 动画组件

只会把过渡效果应用到其包裹的内容上，而不会额外渲染 DOM 元素，也不会出现在可被检查的组件层级中。


* transition-group  动画组件 多个

元素作为多个元素/组件的过渡效果。<transition-group> 渲染一个真实的 DOM 元素。默认渲染 <span>，可以通过 tag attribute 配置哪个元素应该被渲染。

* keep-alive 缓存动态组件不会销毁
include - 字符串或正则表达式。只有名称匹配的组件会被缓存。
exclude - 字符串或正则表达式。任何名称匹配的组件都不会被缓存。
max - 数字。最多可以缓存多少组件实例。

包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。和 <transition> 相似，

* slot 插槽