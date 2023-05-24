// 函数防抖 (注意：我们在vue-cli中自定义方法必须要export抛出，不然组件读取不到)
export function debounce(fn, wait) {
    let timeout = null;
    wait = wait || 600;
    return function () {
      let that = this;
      if(timeout !== null)   clearTimeout(timeout);  
      timeout = setTimeout(() => {
        fn.apply(that);
      }, wait);
    }    
}