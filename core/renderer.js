function createElement(type) {
  // 我们自己实现
  return document.createElement(type);
}

function patchProp(el, key, prevValue, nextValue) {
  if (nextValue) {
    el.setAttribute(key, nextValue);
  } else {
    el.removeAttribute(key, nextValue);
  }
}

function createTextNode(text) {
  return document.createTextNode(text);
}

function insert(el, parent) {
  parent.append(el);
}

function remove(el, parent) {
  parent.removeChild(el);
}

export function mountElement(vnode, container) {
  // vnode
  // type
  const el = (vnode.el = createElement(vnode.type));

  // this.props
  const { props } = vnode;
  if (props) {
    for (const key in props) {
      const val = props[key];
      patchProp(el, key, null, val);
    }
  }

  // children
  //  - string
  const { children } = vnode;
  if (typeof children === "string") {
    insert(createTextNode(children), el);
  } else if (Array.isArray(children)) {
    //  array
    //   [vnode,vnode]
    children.forEach((v) => {
      mountElement(v, el);
    });
  }

  insert(el, container);
}

export function diff(prevVNode, nextVNode) {
  // diff
  // 1. type
  if (prevVNode.type !== nextVNode.type) {
    prevVNode.el.replaceWith(createElement(nextVNode.type));
  } else {
    // 2. props
    //   - -
    // prevProps : {id:"123"}
    // nextProps : {id:"456"}
    const el = (nextVNode.el = prevVNode.el);
    const { props: prevProps } = prevVNode;
    const { props: nextProps } = nextVNode;

    if (nextProps) {
      for (const key in nextProps) {
        if (nextProps[key] !== prevProps[key]) {
          patchProp(el, key, prevProps[key], nextProps[key]);
        }
      }
    }

    // - -  -
    // prevProps : {id:"123", class:"red"}
    // nextProps : {id:"456"}
    if (prevProps) {
      for (const key in prevProps) {
        if (!(key in nextProps)) {
          patchProp(el, key, prevProps[key], null);
        }
      }
    }

    // 3. children
    //    string || array
    //   1. new  string -> old string array
    //   2. new  array ->  old string array
    const { children: prevChildren } = prevVNode;
    const { children: nextChildren } = nextVNode;

    console.log(typeof prevChildren, prevChildren, typeof nextChildren, nextChildren)
    if (typeof nextChildren === "string" || typeof nextChildren === "number") {
      if (typeof prevChildren === "string" || typeof prevChildren === "number") {
        // 字符串
        if (nextChildren !== prevChildren) {
          el.textContent = nextChildren;
        }
      } else if (Array.isArray(prevChildren)) {
        // 数组
        el.textContent = nextChildren;
      }
    } else if (Array.isArray(nextChildren)) {
      if (typeof prevChildren === "string") {
        el.textContent = "";

        nextChildren.forEach((v) => {
          mountElement(v, el);
        });
      } else if (Array.isArray(prevChildren)) {
        // array -> array
        // 1. 依次对比
        // old -> [a,b,c,d]
        // new -> [a,b,c,e]
        const length = Math.min(prevChildren.length, nextChildren.length);
        for (let i = 0; i < length; i++) {
          const prevVNode = prevChildren[i];
          const nextVNode = nextChildren[i];
          diff(prevVNode, nextVNode);
        }

        // 2. 老的比新的多 ， 需要把老的节点删除
        // old -> [a,b,c,d,e,f,g]
        // new -> [a,b,c,e]
        if (prevChildren.length > length) {
          for (let i = length; i < prevChildren.length; i++) {
            const vnode = prevChildren[i];
            remove(vnode.el, el);
          }
        }

        // 3. 新的比老的多 ， 需要把新的节点创建
        // old -> [a,b,c]
        // new -> [a,b,c,e]
        if (nextChildren.length > length) {
          for (let i = length; i < nextChildren.length; i++) {
            const vnode = nextChildren[i];
            mountElement(vnode, el);
          }
        }
      }
    }
  }
}
