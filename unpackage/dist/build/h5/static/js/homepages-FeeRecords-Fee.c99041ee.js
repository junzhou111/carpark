(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["homepages-FeeRecords-Fee"],{"13a0":function(e,t,i){var a=i("24fb");t=a(!1),t.push([e.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.pages .page-header .header-title[data-v-5351e944]{width:100%;background-color:#fff;height:40px;line-height:40px;padding:0 0 0 15px;border-bottom:1px solid #f1f1f1}.pages .page-header .header-item[data-v-5351e944]{display:flex;justify-content:space-between;height:40px;line-height:40px;padding:0 15px;background-color:#fff}.pages .page-header .header-item .item-left[data-v-5351e944]{color:#8f8f8f}.pages .page-header .header-item .item-right[data-v-5351e944]{color:#262626}.small[data-v-5351e944]{font-size:12px}',""]),e.exports=t},"3c32":function(e,t,i){"use strict";i.r(t);var a=i("f200"),s=i("6e79");for(var n in s)["default"].indexOf(n)<0&&function(e){i.d(t,e,(function(){return s[e]}))}(n);i("5e91");var r=i("f0c5"),v=Object(r["a"])(s["default"],a["b"],a["c"],!1,null,"5351e944",null,!1,a["a"],void 0);t["default"]=v.exports},"5e91":function(e,t,i){"use strict";var a=i("7c32"),s=i.n(a);s.a},"6e79":function(e,t,i){"use strict";i.r(t);var a=i("b28c"),s=i.n(a);for(var n in a)["default"].indexOf(n)<0&&function(e){i.d(t,e,(function(){return a[e]}))}(n);t["default"]=s.a},"7c32":function(e,t,i){var a=i("13a0");a.__esModule&&(a=a.default),"string"===typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);var s=i("4f06").default;s("fe804c7e",a,!0,{sourceMap:!1,shadowMode:!1})},b28c:function(e,t,i){"use strict";i("7a82"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a={data:function(){return{item:{}}},onLoad:function(e){this.item=JSON.parse(decodeURIComponent(e.item)),console.log(this.item)},methods:{}};t.default=a},f200:function(e,t,i){"use strict";i.d(t,"b",(function(){return a})),i.d(t,"c",(function(){return s})),i.d(t,"a",(function(){}));var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("v-uni-view",{staticClass:"pages"},[i("v-uni-view",{staticClass:"page-header"},[i("v-uni-view",{staticClass:"header-title"},[e._v("临时车收费记录:")]),e.item.title?i("v-uni-view",{staticClass:"header-item"},[i("v-uni-view",{staticClass:"item-left"},[e._v("凭证号")]),i("v-uni-view",{staticClass:"item-right"},[e._v(e._s(e.item.title))])],1):e._e(),e.item.pay_order_number?i("v-uni-view",{staticClass:"header-item"},[i("v-uni-view",{staticClass:"item-left"},[e._v("支付单号")]),i("v-uni-view",{staticClass:"item-right"},[e._v(e._s(e.item.pay_order_number))])],1):e._e(),e.item.order_number?i("v-uni-view",{staticClass:"header-item"},[i("v-uni-view",{staticClass:"item-left"},[e._v("订单编号")]),i("v-uni-view",{staticClass:"item-right small"},[e._v(e._s(e.item.order_number))])],1):e._e(),e.item.pay_suorce?i("v-uni-view",{staticClass:"header-item"},[i("v-uni-view",{staticClass:"item-left"},[e._v("支付场景")]),i("v-uni-view",{staticClass:"item-right"},[e._v(e._s("0"==e.item.pay_suorce?"掌上社区app":"1"==e.item.pay_suorce?"实时扫码付款":"2"==e.item.pay_suorce?"聚合收款码":"其他自收"))])],1):e._e(),e.item.pay_type?i("v-uni-view",{staticClass:"header-item"},[i("v-uni-view",{staticClass:"item-left"},[e._v("支付方式")]),i("v-uni-view",{staticClass:"item-right"},[e._v(e._s("0"==e.item.pay_type?"现场当面收款":"1"==e.item.pay_type?"微信支付":"2"==e.item.pay_type?"支付宝支付":"其他支付"))])],1):e._e(),e.item.pay_createtime?i("v-uni-view",{staticClass:"header-item"},[i("v-uni-view",{staticClass:"item-left"},[e._v("创建时间")]),i("v-uni-view",{staticClass:"item-right"},[e._v(e._s(e.item.pay_createtime))])],1):e._e(),e.item.pay_achievetime?i("v-uni-view",{staticClass:"header-item"},[i("v-uni-view",{staticClass:"item-left"},[e._v("支付时间")]),i("v-uni-view",{staticClass:"item-right"},[e._v(e._s(e.item.pay_achievetime))])],1):e._e(),e.item.pay_state?i("v-uni-view",{staticClass:"header-item"},[i("v-uni-view",{staticClass:"item-left"},[e._v("支付状态")]),i("v-uni-view",{staticClass:"item-right"},[e._v(e._s("0"==e.item.pay_state?"待支付":"1"==e.item.pay_state?"已支付":"3"==e.item.pay_state?"支付取消":"未知状态"))])],1):e._e(),e.item.money?i("v-uni-view",{staticClass:"header-item"},[i("v-uni-view",{staticClass:"item-left"},[e._v("实收金额")]),i("v-uni-view",{staticClass:"item-right"},[e._v(e._s(e.item.money))])],1):e._e()],1)],1)},s=[]}}]);