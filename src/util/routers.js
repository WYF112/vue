/**
 * @description: vue-router
 * @param vue: vue
 * @param options: [{path:'/',component: a}]
 */

class yfRouter {
    constructor(vue, options) {
        this.routeMap = {};//route映射表
        this.parseMap(options);//解析route
        this.app = new vue({
            data() {
                return {
                    path: "/"
                }
            },
        });//当前path
        this.init()
        this.createComponent(vue)
    }
    // 监听
    init() {
        window.addEventListener('load', this.changeHash.bind(this), false);
        window.addEventListener("hashchange", this.changeHash.bind(this), false);
    }
    // hash change
    getHash() {
        return window.location.hash.slice(1) || '/'
    }
    changeHash() {
        this.app.path = this.getHash();
    }
    // 解析routeMap
    parseMap(options) {
        options.forEach(ele => {
            this.routeMap[ele.path] = ele.component;
        });
    }
    // 创建组件
    createComponent(vue) {
        const _this = this;
        // view
        vue.component('yf-router', {
            render(h) {
                return h(_this.routeMap[_this.app.path])
            },
        })
        // link
        vue.component('yf-link', {
            props: ['to'],
            render: function (h) {
                return h('a', { attrs: { href: this.to } }, this.$slots.default)
            },
        })
    }
}

export default yfRouter