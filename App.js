import { h, ref } from './core/index.js';

export default {
    render(context) {
        return h('div', {class:'yunfei'}, context.a.value);
    },
    setup() {
        const a = ref('a');
        window.a = a;
        return {
            a
        }
    }
}