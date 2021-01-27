export function debounce(func, delay) {
  let timer = null;
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

/**
 * 正则：
 * ?: 0个或者一
 * *: 0个或者多个
 * +: 一个或者多个
 * 
 * RegExp.$1就是//里面的正则匹配到的字符串
 **/ 
export function formatDate(date,fmt){
  //1.获取年份
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1,(date.getFullYear()+"").substr(4 - RegExp.$1.length));
  }
  //2.获取
    // M+:正则表达式中的一个规则
  let o = {
    "M+":date.getMonth()+1,
    "d+":date.getDate(),
    "h+":date.getHours(),
    "m+":date.getMinutes(),
    "s+":date.getSeconds(),
  };
  for (let k in o) {
    if(new RegExp(`(${k})`).test(fmt)){
      let str = o[k] + "";
      fmt = fmt.replace(RegExp.$1,(RegExp.$1.length===1)?str : padLeftZero(str));
    }
  }
  return fmt;
}
// 4:4:4 ==> 04:04:04   自动补零 
function padLeftZero(str){
  return ('00'+str).substr(str.length);
}
