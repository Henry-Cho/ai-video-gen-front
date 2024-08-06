"use strict";(()=>{var e={};e.id=575,e.ids=[575],e.modules={2934:e=>{e.exports=require("next/dist/client/components/action-async-storage.external.js")},4580:e=>{e.exports=require("next/dist/client/components/request-async-storage.external.js")},5869:e=>{e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},2254:e=>{e.exports=require("node:buffer")},6005:e=>{e.exports=require("node:crypto")},7261:e=>{e.exports=require("node:util")},7884:(e,t,r)=>{r.r(t),r.d(t,{originalPathname:()=>J,patchFetch:()=>W,requestAsyncStorage:()=>Z,routeModule:()=>S,serverHooks:()=>E,staticGenerationAsyncStorage:()=>A});var a={};r.r(a),r.d(a,{GET:()=>P});var s=r(9303),o=r(8716),i=r(670),n=r(1274),d=r(2635),p=r(7682),c=r(5689),h=r(5547),u=r(1079),l=r(7219),y=r(1884);class _{_payload;_protectedHeader;_unprotectedHeader;constructor(e){if(!(e instanceof Uint8Array))throw TypeError("payload must be an instance of Uint8Array");this._payload=e}setProtectedHeader(e){if(this._protectedHeader)throw TypeError("setProtectedHeader can only be called once");return this._protectedHeader=e,this}setUnprotectedHeader(e){if(this._unprotectedHeader)throw TypeError("setUnprotectedHeader can only be called once");return this._unprotectedHeader=e,this}async sign(e,t){let r;if(!this._protectedHeader&&!this._unprotectedHeader)throw new h.GW("either setProtectedHeader or setUnprotectedHeader must be called before #sign()");if(!(0,c.Z)(this._protectedHeader,this._unprotectedHeader))throw new h.GW("JWS Protected and JWS Unprotected Header Parameter names must be disjoint");let a={...this._protectedHeader,...this._unprotectedHeader},s=(0,y.Z)(h.GW,new Map([["b64",!0]]),t?.crit,this._protectedHeader,a),o=!0;if(s.has("b64")&&"boolean"!=typeof(o=this._protectedHeader.b64))throw new h.GW('The "b64" (base64url-encode payload) Header Parameter must be a boolean');let{alg:i}=a;if("string"!=typeof i||!i)throw new h.GW('JWS "alg" (Algorithm) Header Parameter missing or invalid');(0,l.Z)(i,e,"sign");let n=this._payload;o&&(n=u.g7.encode((0,d.cv)(n))),r=this._protectedHeader?u.g7.encode((0,d.cv)(JSON.stringify(this._protectedHeader))):u.g7.encode("");let _=(0,u.zo)(r,u.g7.encode("."),n),f=await (0,p.Z)(i,e,_),g={signature:(0,d.cv)(f),payload:""};return o&&(g.payload=u.xv.decode(n)),this._unprotectedHeader&&(g.header=this._unprotectedHeader),this._protectedHeader&&(g.protected=u.xv.decode(r)),g}}class f{_flattened;constructor(e){this._flattened=new _(e)}setProtectedHeader(e){return this._flattened.setProtectedHeader(e),this}async sign(e,t){let r=await this._flattened.sign(e,t);if(void 0===r.payload)throw TypeError("use the flattened module for creating JWS with b64: false");return`${r.protected}.${r.payload}.${r.signature}`}}var g=r(2741),w=r(5165),H=r(1301);function m(e,t){if(!Number.isFinite(t))throw TypeError(`Invalid ${e} input`);return t}class x{_payload;constructor(e={}){if(!(0,w.Z)(e))throw TypeError("JWT Claims Set MUST be an object");this._payload=e}setIssuer(e){return this._payload={...this._payload,iss:e},this}setSubject(e){return this._payload={...this._payload,sub:e},this}setAudience(e){return this._payload={...this._payload,aud:e},this}setJti(e){return this._payload={...this._payload,jti:e},this}setNotBefore(e){return"number"==typeof e?this._payload={...this._payload,nbf:m("setNotBefore",e)}:e instanceof Date?this._payload={...this._payload,nbf:m("setNotBefore",(0,g.Z)(e))}:this._payload={...this._payload,nbf:(0,g.Z)(new Date)+(0,H.Z)(e)},this}setExpirationTime(e){return"number"==typeof e?this._payload={...this._payload,exp:m("setExpirationTime",e)}:e instanceof Date?this._payload={...this._payload,exp:m("setExpirationTime",(0,g.Z)(e))}:this._payload={...this._payload,exp:(0,g.Z)(new Date)+(0,H.Z)(e)},this}setIssuedAt(e){return void 0===e?this._payload={...this._payload,iat:(0,g.Z)(new Date)}:e instanceof Date?this._payload={...this._payload,iat:m("setIssuedAt",(0,g.Z)(e))}:"string"==typeof e?this._payload={...this._payload,iat:m("setIssuedAt",(0,g.Z)(new Date)+(0,H.Z)(e))}:this._payload={...this._payload,iat:m("setIssuedAt",e)},this}}class b extends x{_protectedHeader;setProtectedHeader(e){return this._protectedHeader=e,this}async sign(e,t){let r=new f(u.g7.encode(JSON.stringify(this._payload)));if(r.setProtectedHeader(this._protectedHeader),Array.isArray(this._protectedHeader?.crit)&&this._protectedHeader.crit.includes("b64")&&!1===this._protectedHeader.b64)throw new h.uv("JWTs MUST NOT use unencoded payload");return r.sign(e,t)}}var v=r(1615);async function P(e){let t=new URL(e.url,`${e.headers["x-forwarded-proto"]||"http"}://${e.headers.host}`).searchParams.get("pathname"),r=(0,v.cookies)().get("refresh-token");if(!r)return"/"===t?new Response(JSON.stringify({user:null}),{status:200}):new Response(JSON.stringify({user:null}),{status:401});try{let e=await T(r.value);return new Response(JSON.stringify({user:e.user}),{status:200})}catch(e){return console.error("Failed to refresh token:",e),new Response(JSON.stringify({user:null}),{status:401})}}async function T(e){let t=new TextEncoder().encode("dWWOvdGJYdR6CdmhxndBfJHYN/3//ybrWY5FiMf09M+0w/gXvp+2w0TtFZUBhPIq4dD3xGIPmLLto6/2/L1FxA==");try{let{payload:r}=await n._(e,t),a=await new b(r).setProtectedHeader({alg:"HS256"}).setExpirationTime("1h").sign(t),s=await new b(r).setProtectedHeader({alg:"HS256"}).setExpirationTime("7d").sign(t);return{access_token:a,refresh_token:s,user:r}}catch(e){throw Error("Invalid refresh token")}}let S=new s.AppRouteRouteModule({definition:{kind:o.x.APP_ROUTE,page:"/api/auth/refresh/route",pathname:"/api/auth/refresh",filename:"route",bundlePath:"app/api/auth/refresh/route"},resolvedPagePath:"/Users/hyungseokcho/ai-video-gen-front/src/app/api/auth/refresh/route.js",nextConfigOutput:"",userland:a}),{requestAsyncStorage:Z,staticGenerationAsyncStorage:A,serverHooks:E}=S,J="/api/auth/refresh/route";function W(){return(0,i.patchFetch)({serverHooks:E,staticGenerationAsyncStorage:A})}}};var t=require("../../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),a=t.X(0,[948,924],()=>r(7884));module.exports=a})();