(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/ay-qrcode/ay-qrcode"],{463:function(e,t,n){"use strict";n.r(t);var r=n(464),o=n(466);for(var c in o)["default"].indexOf(c)<0&&function(e){n.d(t,e,(function(){return o[e]}))}(c);n(470);var i,a=n(32),u=Object(a["default"])(o["default"],r["render"],r["staticRenderFns"],!1,null,"1db347e8",null,!1,r["components"],i);u.options.__file="components/ay-qrcode/ay-qrcode.vue",t["default"]=u.exports},464:function(e,t,n){"use strict";n.r(t);var r=n(465);n.d(t,"render",(function(){return r["render"]})),n.d(t,"staticRenderFns",(function(){return r["staticRenderFns"]})),n.d(t,"recyclableRender",(function(){return r["recyclableRender"]})),n.d(t,"components",(function(){return r["components"]}))},465:function(e,t,n){"use strict";var r;n.r(t),n.d(t,"render",(function(){return o})),n.d(t,"staticRenderFns",(function(){return i})),n.d(t,"recyclableRender",(function(){return c})),n.d(t,"components",(function(){return r}));var o=function(){var e=this,t=e.$createElement;e._self._c},c=!1,i=[];o._withStripped=!0},466:function(e,t,n){"use strict";n.r(t);var r=n(467),o=n.n(r);for(var c in r)["default"].indexOf(c)<0&&function(e){n.d(t,e,(function(){return r[e]}))}(c);t["default"]=o.a},467:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n(468),o=(n(469),{data:function(){return{isAndroid:!1,show:!0,imagePath:"",marginLeft:0,add_num:30,add_num_key:"rectify_code_key"}},props:{modal:{type:Boolean,default:!1},url:{type:String,default:""},height:{type:Number,default:260},width:{type:Number,default:260},themeColor:{type:String,default:"#333333"},qrcode_id:{type:String,default:"qrcode_id"},is_themeImg:{type:Boolean,default:!1},themeImg:{type:String,default:"https://cdn.pixabay.com/photo/2016/11/29/13/24/balloons-1869816__340.jpg"},h_w_img:{type:Number,default:30}},watch:{},computed:{style_w_h:function(){return this.set_style_w_h()},style_w_h_img:function(){var e=this,t=parseInt(e.h_w_img),n=parseInt(e.h_w_img),r="";return t>0&&(r="height:".concat(2*t,"rpx;")),n>0&&(r+="width:".concat(2*n,"rpx;z-index: 2;")),r}},created:function(){},methods:{set_style_w_h:function(){var e=this,t=parseInt(e.height),n=parseInt(e.width),r="";t*=2,n*=2;return t>0&&(r="height:".concat(t,"rpx;")),n>0&&(r+="width:".concat(n,"rpx;")),r},hideQrcode:function(){this.$emit("hideQrcode")},crtQrCode:function(){var e=this;e.createQrCode(this.url,e.qrcode_id,e.width,e.height,e.themeColor,e.is_themeImg,e.themeImg,e.h_w_img)},createQrCode:function(e,t,n,o,c,i,a,u){r.api.draw(e,t,n,o,c,i,a,u,this,this.canvasToTempImage)},canvasToTempImage:function(){},saveImage:function(){var t=this;e.canvasToTempFilePath({canvasId:t.qrcode_id,success:function(n){var r=n.tempFilePath;console.log(r),t.imagePath=r,e.saveImageToPhotosAlbum({filePath:r,success:function(t){e.showModal({title:"提示",content:"保存成功",confirmText:"确定",showCancel:!1,confirmColor:"#33CCCC",success:function(e){}})}})},fail:function(e){console.log(e)}},t)},longtapCode:function(){var t=this;e.showModal({title:"提示",content:"是否保存到相册",confirmText:"确定",confirmColor:"#33CCCC",success:function(e){e.confirm&&t.saveImage()}})},rectify_code:function(){var t=this,n=t.add_num;n+=30,t.add_num=n,t.crtQrCode();try{e.setStorage({key:t.add_num_key,data:n,success:function(){}})}catch(r){}}},mounted:function(){}});t.default=o}).call(this,n(2)["default"])},470:function(e,t,n){"use strict";n.r(t);var r=n(471),o=n.n(r);for(var c in r)["default"].indexOf(c)<0&&function(e){n.d(t,e,(function(){return r[e]}))}(c);t["default"]=o.a},471:function(e,t,n){}}]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/ay-qrcode/ay-qrcode.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/ay-qrcode/ay-qrcode-create-component',
    {
        'components/ay-qrcode/ay-qrcode-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('2')['createComponent'](__webpack_require__(463))
        })
    },
    [['components/ay-qrcode/ay-qrcode-create-component']]
]);