import { effect } from './reactivity/index.js';
import { mountElement, diff } from './renderer.js';
export function createApp(rootComponent) {
    return {
        mount(rootContainer) {
            // 响应式对象
            const context = rootComponent.setup();
            // 1.mount
            let isMounted = false;
            // 2.update --diff
            let prevSubTree = null;

            effect(() => {
                if (!isMounted) {
                    // mount
                    isMounted = true;
                    rootContainer.textContent = '';
                    // 生成vnode
                    const subTree = rootComponent.render(context);
                    // 存储 tree
                    prevSubTree = subTree;
                    // 挂载dom
                    mountElement(subTree, rootContainer);
                } else {
                    // update
                    const subTree = rootComponent.render(context);

                    diff(prevSubTree,subTree);
                    prevSubTree = subTree;
                }

                // rootContainer.append(rootComponent.render(context));
            })
        }
    }
}