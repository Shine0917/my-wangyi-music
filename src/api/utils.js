import { RankTypes } from './config';

// 节流函数
let timer;
export function debounce(func, delay){
  return function (...args) {
    if(timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() =>{
      func.apply(this,args)
    },delay)
  }
}

// 给css3相关属性增加浏览器前缀， 处理浏览器兼容性问题
let elementStyle = document.createElement('div').style;
let vendor = (() => {
  // 首先通过transition 属性判断是何种浏览器
  let transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransfrom',
    O:'OTransform',
    ms: 'msTransform',
    standard: 'Transform'
  };
  for(let key in transformNames) {
    if(elementStyle[transformNames[key]] !== undefined) {
      return key;
    }
  }
  return false;
})();

export function prefixStyle(style) {
  if(vendor === false) {
    return false;
  }
  if(vendor === 'standard') {
    return style;
  }
  return vendor + style.charAt(0).toUpperCase() + style.substr(1);
}

// 判断一个对象是否是空对象
export const isEmptyObject = (obj) => Object.keys(obj).length === 0;