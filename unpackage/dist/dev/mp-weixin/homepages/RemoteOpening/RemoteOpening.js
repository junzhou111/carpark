(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["homepages/RemoteOpening/RemoteOpening"],{259:function(e,t,n){"use strict";(function(e,t){var a=n(4);n(26);a(n(25));var r=a(n(260));e.__webpack_require_UNI_MP_PLUGIN__=n,t(r.default)}).call(this,n(1)["default"],n(2)["createPage"])},260:function(e,t,n){"use strict";n.r(t);var a=n(261),r=n(263);for(var i in r)["default"].indexOf(i)<0&&function(e){n.d(t,e,(function(){return r[e]}))}(i);n(265);var o,s=n(32),c=Object(s["default"])(r["default"],a["render"],a["staticRenderFns"],!1,null,null,null,!1,a["components"],o);c.options.__file="homepages/RemoteOpening/RemoteOpening.vue",t["default"]=c.exports},261:function(e,t,n){"use strict";n.r(t);var a=n(262);n.d(t,"render",(function(){return a["render"]})),n.d(t,"staticRenderFns",(function(){return a["staticRenderFns"]})),n.d(t,"recyclableRender",(function(){return a["recyclableRender"]})),n.d(t,"components",(function(){return a["components"]}))},262:function(e,t,n){"use strict";var a;n.r(t),n.d(t,"render",(function(){return r})),n.d(t,"staticRenderFns",(function(){return o})),n.d(t,"recyclableRender",(function(){return i})),n.d(t,"components",(function(){return a}));try{a={uPopup:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-popup/u-popup")]).then(n.bind(null,375))},"u-Textarea":function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u--textarea/u--textarea")]).then(n.bind(null,457))}}}catch(s){if(-1===s.message.indexOf("Cannot find module")||-1===s.message.indexOf(".vue"))throw s;console.error(s.message),console.error("1. 排查组件名称拼写是否正确"),console.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),console.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var r=function(){var e=this,t=e.$createElement;e._self._c;e._isMounted||(e.e0=function(t){e.carshow=!1},e.e1=function(t){e.carshow=!0})},i=!1,o=[];r._withStripped=!0},263:function(e,t,n){"use strict";n.r(t);var a=n(264),r=n.n(a);for(var i in a)["default"].indexOf(i)<0&&function(e){n.d(t,e,(function(){return a[e]}))}(i);t["default"]=r.a},264:function(e,t,n){"use strict";(function(e){var a=n(4);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=a(n(55)),i=a(n(57)),o=n(166),s={data:function(){return{carlist:[],cartwolist:[],region:[],regionlist:[],inpvalue:"",carshow:!1,carlistitem:{},regionlistitem:{},parkid:"",type:1}},methods:{getgetRemoteopenlist:function(){var t=this;return(0,i.default)(r.default.mark((function n(){var a,i;return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return a={requestType:"GetPark",data:{sessionid:e.getStorageSync("sessionid")}},n.next=3,(0,o.getRemoteopening)(a);case 3:i=n.sent,console.log("停车场列表",i.data.data),t.carlist=i.data.data,t.gettwolist(t.carlist[0].id),t.getregion(t.carlist[0].id);case 8:case"end":return n.stop()}}),n)})))()},gettwolist:function(t){var n=this;return(0,i.default)(r.default.mark((function a(){var i,s;return r.default.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return i={requestType:"GetParkChannel",data:{sessionid:e.getStorageSync("sessionid"),park_id:t}},a.next=3,(0,o.getRemoteopening)(i);case 3:s=a.sent,console.log("获取车场出入口列表",s.data.data),n.cartwolist=s.data.data,void 0==s.data.data&&(n.cartwolist="");case 7:case"end":return a.stop()}}),a)})))()},getregion:function(t){var n=this;return(0,i.default)(r.default.mark((function a(){var i,s;return r.default.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return i={requestType:"GetParkArea",data:{sessionid:e.getStorageSync("sessionid"),park_id:t}},a.next=3,(0,o.getRemoteopening)(i);case 3:s=a.sent,console.log("区域列表",s.data.data),void 0==s.data.data?(n.region="",n.regionlist=""):(n.region=s.data.data,n.getregionlist(s.data.data[0].id));case 6:case"end":return a.stop()}}),a)})))()},getregionlist:function(t){var n=this;return(0,i.default)(r.default.mark((function a(){var i,s;return r.default.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return i={requestType:"GetParkAreaChannel",data:{sessionid:e.getStorageSync("sessionid"),park_area_id:t}},a.next=3,(0,o.getRemoteopening)(i);case 3:s=a.sent,console.log(i,"form"),console.log("区域出入口列表",s.data.data),n.regionlist=s.data.data;case 7:case"end":return a.stop()}}),a)})))()},gettwo:function(e){console.log(e,"id"),this.parkid=e,this.gettwolist(e),this.getregion(e)},regionChange:function(e){this.getregionlist(e),console.log("qinaj",this.regionlist)},changecar:function(e){this.type=1,console.log("item1",e),this.carlistitem=e,this.carshow=!0},opencarlist:function(){this.getcarswitch(this.carlistitem),this.inpvalue="",this.carshow=!1},getcarswitch:function(t){var n=this;return(0,i.default)(r.default.mark((function a(){var i,s;return r.default.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return console.log(t.park_area_id),void 0==t.park_area_id&&(t.park_area_id=0),console.log("items",t),i={requestType:"OpenPark",data:{sessionid:e.getStorageSync("sessionid"),io:t.type,park_id:t.park_id,park_area_id:t.park_area_id,remark:n.inpvalue,location_type:0,location_id:t.id}},a.next=6,(0,o.getswitchs)(i);case 6:s=a.sent,console.log(i,"form"),console.log("车场开关返回的数据",s);case 9:case"end":return a.stop()}}),a)})))()},changeregion:function(e){this.type=2,console.log("item",e),this.carshow=!0,this.regionlistitem=e},openregion:function(){this.getcarswitchregion(this.regionlistitem),this.inpvalue="",this.carshow=!1},getcarswitchregion:function(t){var n=this;return(0,i.default)(r.default.mark((function a(){var i,s;return r.default.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return i={requestType:"OpenPark",data:{sessionid:e.getStorageSync("sessionid"),io:t.type,park_id:n.parkid,park_area_id:t.id,remark:n.inpvalue,location_type:1,location_id:t.id}},a.next=3,(0,o.getswitchs)(i);case 3:s=a.sent,console.log("区域开关返回的数据",s);case 5:case"end":return a.stop()}}),a)})))()}},onLoad:function(){this.getgetRemoteopenlist()}};t.default=s}).call(this,n(2)["default"])},265:function(e,t,n){"use strict";n.r(t);var a=n(266),r=n.n(a);for(var i in a)["default"].indexOf(i)<0&&function(e){n.d(t,e,(function(){return a[e]}))}(i);t["default"]=r.a},266:function(e,t,n){}},[[259,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/homepages/RemoteOpening/RemoteOpening.js.map