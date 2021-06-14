# Vue3.0 六大亮点

## | 亮点

* Performance ：性能更比Vue2.0强

* Tree-shaking support ：可以将无用模块'剪辑'，仅打包需要

* Composition API : 组合Api

* Fragment,Teleport,Suspense ：'碎片'，Teleport即 Protal传送门，'悬念'

* Better TypeScript support : 更优秀的TS支持

* Custom Render API : 暴露了自定义渲染API

### | Performance

1. 重写虚拟 <font color="00ffff"> Dom </font>的实现（且保证了兼容性，脱离模板的渲染需求旺盛）；

2. 编译模板的优化；

3. 更搞笑的组件初始化；

4. update 性能提高1.3-2倍；

5. SSR 速度提高了2-3倍

#### 要点1：编译模板的优化

* 假设要编译以下代码
``` 
<div>
  <span/>
  <span>{{ msg }}</span>
</div>
```
* 将会被编译成以下模样：

```
import { createVNode as _createVNode, toDisplayString as _toDisplayString, openBlock as _openBlock, createBlock as _createBlock } from "vue"

export function render(_ctx, _cache) {
  return (_openBlock(), _createBlock("div", null, [
    _createVNode("span", null, "static"),
    _createVNode("span", null, _toDisplayString(_ctx.msg), 1 /* TEXT */)
  ]))
}

// Check the console for the AST
```
- 注意看第二个——createVNode结尾的“1”；
- Vue的运行时会生成number（大于0）值的<font color="#ff502c">PatchFlag</font>用作标记；
- 仅带有<font color='#ff502c'>PatchFlag</font>标记的节点会被真正追踪，且无论层级嵌套多深，他的动态节点都会直接与Block根节点绑定，无需再去遍历静态节点；

* example(例子)

```
<div>
  <span>static</span>
  <span :id="hello" class="bar">{{ msg }}</span>
</div>
```

会被编译成

```
import { createVNode as _createVNode, toDisplayString as _toDisplayString, openBlock as _openBlock, createBlock as _createBlock } from "vue"

export function render(_ctx, _cache) {
  return (_openBlock(), _createBlock("div", null, [
    _createVNode("span", null, "static"),
    _createVNode("span", {
      id: _ctx.hello,
      class: "bar"
    }, _toDisplayString(_ctx.msg), 9 /* TEXT, PROPS */, ["id"])
  ]))
}
```
<font color="#ff502c">PatchFlag</font>变成了<font color="#ff502c">9 /* TEXT, PROPS */, ["id"]</font>;

它会告知我们不光有TEXT变化，还有PROPS变化（id);

这样既跳出了<font color="#ff502c">virtual dom</font>性能的平静，又保留了可以手写render的灵活性。等于是：既有react的灵活性，又有基于模板的性能保障。


#### 要点2：事件监听缓存： cacheHandlers

假设绑定事件

```
<div>
  <span @click="onClick">
    {{msg}}
  </span>
</div>
```
关闭cacheHandlers后：

```
import { toDisplayString as _toDisplayString, createVNode as _createVNode, openBlock as _openBlock, createBlock as _createBlock } from "vue"

export function render(_ctx, _cache) {
  return (_openBlock(), _createBlock("div", null, [
    _createVNode("span", { onClick: _ctx.onClick }, _toDisplayString(_ctx.msg), 9 /* TEXT, PROPS */, ["onClick"])
  ]))
}

```
onClick会被是为PROPS动态绑定，后续替换点击事件时需要进行更新。

开启cacheHandlers后：

```
import { toDisplayString as _toDisplayString, createVNode as _createVNode, openBlock as _openBlock, createBlock as _createBlock } from "vue"

export function render(_ctx, _cache) {
  return (_openBlock(), _createBlock("div", null, [
    _createVNode("span", {
      onClick: _cache[1] || (_cache[1] = $event => (_ctx.onClick($event)))
    }, _toDisplayString(_ctx.msg), 1 /* TEXT */)
  ]))
}

```
cache[1]，会自动生成并缓存一个内联函数，“神奇”的变为一个静态节点。 Ps：相当于React中useCallback自动化。

并且支持手写内联函数：

#### 补充：PatchFlags枚举定义

而通过查询Ts枚举定义，我们可以看到分别定义了以下的追踪标记：

```
export const enum PatchFlags {
  
  TEXT = 1,// 表示具有动态textContent的元素
  CLASS = 1 << 1,  // 表示有动态Class的元素
  STYLE = 1 << 2,  // 表示动态样式（静态如style="color: red"，也会提升至动态）
  PROPS = 1 << 3,  // 表示具有非类/样式动态道具的元素。
  FULL_PROPS = 1 << 4,  // 表示带有动态键的道具的元素，与上面三种相斥
  HYDRATE_EVENTS = 1 << 5,  // 表示带有事件监听器的元素
  STABLE_FRAGMENT = 1 << 6,   // 表示其子顺序不变的片段（没懂）。 
  KEYED_FRAGMENT = 1 << 7, // 表示带有键控或部分键控子元素的片段。
  UNKEYED_FRAGMENT = 1 << 8, // 表示带有无key绑定的片段
  NEED_PATCH = 1 << 9,   // 表示只需要非属性补丁的元素，例如ref或hooks
  DYNAMIC_SLOTS = 1 << 10,  // 表示具有动态插槽的元素
  // 特殊 FLAGS -------------------------------------------------------------
  HOISTED = -1,  // 特殊标志是负整数表示永远不会用作diff,只需检查 patchFlag === FLAG.
  BAIL = -2 // 一个特殊的标志，指代差异算法（没懂）
}

```

### | Tree Shaking support

* 可以将无用模块“剪辑”，仅打包需要的（比如v-model,<transition>,用不到就不会打包）
* 一个简单“<font color="#ff502c">HelloWorld</font>”大小仅为：13.5kb
    11.75kb，仅Composition API
* 包含运行时完整功能22.5kb
    拥有更多的功能，却比Vue 2更迷你

很多时候，我们并不需要 vue提供的所有功能，在 vue 2 并没有方式排除掉，但是 3.0 都可能做成了按需引入。


### | Composition API

与React Hooks 类似的东西，实现方式不同。

可与现有的 Options API一起使用
灵活的逻辑组合与复用
vue 3的响应式模块可以和其他框架搭配使用

混入(mixin) 将不再作为推荐使用， Composition API可以实现更灵活且无副作用的复用代码。

[文档地址](https://composition-api.vuejs.org/#summary)

Composition API包含了六个主要API [地址](https://composition-api.vuejs.org/api.html#setup)

### | Fragment

#### Fragment翻译为：“碎片”

* 不再限于模板中的单个根节点
* render 函数也可以返回数组了，类似实现了 React.Fragments 的功能 。
* 'Just works'


* 以前称为 Portal ，译作传送门。

* 'Teleport' 原先是对标 React Portal（增加多个新功能，更强）
* 但因为Chrome有个提案，会增加一个名为Portal的原生element，为避免命名冲突，改为Teleport


#### Suspense翻译为：“悬念”

* 可在嵌套层级中等待嵌套的异步依赖项
* 支持async setup()
* 支持异步组件

虽然React 16引入了Suspense，但直至现在都不太能用。如何将其与异步数据结合，还没完整设计出来。
Vue 3 的<Suspense>更加轻量：
仅5%应用能感知运行时的调度差异，综合考虑下，Vue3 的<Suspense> 没和React一样做运行调度处理

### | 更好的TypeScript支持

- Vue 3是用TypeScript编写的库，可以享受到自动的类型定义提示
- JavaScript和TypeScript中的API是相同的。

    1. 事实上，代码也基本相同


- 支持TSX
- class组件还会继续支持，但是需要引入vue-class-component@next，该模块目前还处在 alpha 阶段。
- 还有Vue 3 + TypeScript 插件正在开发，有类型检查，自动补全等功能。目前进展可喜。

### | Custom Renderer API：自定义渲染器API

