"use strict";exports.id=924,exports.ids=[924],exports.modules={1615:(e,t,r)=>{var o=r(8757);r.o(o,"cookies")&&r.d(t,{cookies:function(){return o.cookies}})},3085:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"DraftMode",{enumerable:!0,get:function(){return i}});let o=r(5869),a=r(6278);class i{get isEnabled(){return this._provider.isEnabled}enable(){let e=o.staticGenerationAsyncStorage.getStore();return e&&(0,a.trackDynamicDataAccessed)(e,"draftMode().enable()"),this._provider.enable()}disable(){let e=o.staticGenerationAsyncStorage.getStore();return e&&(0,a.trackDynamicDataAccessed)(e,"draftMode().disable()"),this._provider.disable()}constructor(e){this._provider=e}}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},8757:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{cookies:function(){return f},draftMode:function(){return p},headers:function(){return u}});let o=r(8996),a=r(3047),i=r(2044),s=r(2934),n=r(3085),c=r(6278),l=r(5869),d=r(4580);function u(){let e="headers",t=l.staticGenerationAsyncStorage.getStore();if(t){if(t.forceStatic)return a.HeadersAdapter.seal(new Headers({}));(0,c.trackDynamicDataAccessed)(t,e)}return(0,d.getExpectedRequestStore)(e).headers}function f(){let e="cookies",t=l.staticGenerationAsyncStorage.getStore();if(t){if(t.forceStatic)return o.RequestCookiesAdapter.seal(new i.RequestCookies(new Headers({})));(0,c.trackDynamicDataAccessed)(t,e)}let r=(0,d.getExpectedRequestStore)(e),a=s.actionAsyncStorage.getStore();return(null==a?void 0:a.isAction)||(null==a?void 0:a.isAppRoute)?r.mutableCookies:r.cookies}function p(){let e=(0,d.getExpectedRequestStore)("draftMode");return new n.DraftMode(e.draftMode)}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},9925:e=>{var t=Object.defineProperty,r=Object.getOwnPropertyDescriptor,o=Object.getOwnPropertyNames,a=Object.prototype.hasOwnProperty,i={};function s(e){var t;let r=["path"in e&&e.path&&`Path=${e.path}`,"expires"in e&&(e.expires||0===e.expires)&&`Expires=${("number"==typeof e.expires?new Date(e.expires):e.expires).toUTCString()}`,"maxAge"in e&&"number"==typeof e.maxAge&&`Max-Age=${e.maxAge}`,"domain"in e&&e.domain&&`Domain=${e.domain}`,"secure"in e&&e.secure&&"Secure","httpOnly"in e&&e.httpOnly&&"HttpOnly","sameSite"in e&&e.sameSite&&`SameSite=${e.sameSite}`,"partitioned"in e&&e.partitioned&&"Partitioned","priority"in e&&e.priority&&`Priority=${e.priority}`].filter(Boolean),o=`${e.name}=${encodeURIComponent(null!=(t=e.value)?t:"")}`;return 0===r.length?o:`${o}; ${r.join("; ")}`}function n(e){let t=new Map;for(let r of e.split(/; */)){if(!r)continue;let e=r.indexOf("=");if(-1===e){t.set(r,"true");continue}let[o,a]=[r.slice(0,e),r.slice(e+1)];try{t.set(o,decodeURIComponent(null!=a?a:"true"))}catch{}}return t}function c(e){var t,r;if(!e)return;let[[o,a],...i]=n(e),{domain:s,expires:c,httponly:u,maxage:f,path:p,samesite:y,secure:h,partitioned:m,priority:g}=Object.fromEntries(i.map(([e,t])=>[e.toLowerCase(),t]));return function(e){let t={};for(let r in e)e[r]&&(t[r]=e[r]);return t}({name:o,value:decodeURIComponent(a),domain:s,...c&&{expires:new Date(c)},...u&&{httpOnly:!0},..."string"==typeof f&&{maxAge:Number(f)},path:p,...y&&{sameSite:l.includes(t=(t=y).toLowerCase())?t:void 0},...h&&{secure:!0},...g&&{priority:d.includes(r=(r=g).toLowerCase())?r:void 0},...m&&{partitioned:!0}})}((e,r)=>{for(var o in r)t(e,o,{get:r[o],enumerable:!0})})(i,{RequestCookies:()=>u,ResponseCookies:()=>f,parseCookie:()=>n,parseSetCookie:()=>c,stringifyCookie:()=>s}),e.exports=((e,i,s,n)=>{if(i&&"object"==typeof i||"function"==typeof i)for(let s of o(i))a.call(e,s)||void 0===s||t(e,s,{get:()=>i[s],enumerable:!(n=r(i,s))||n.enumerable});return e})(t({},"__esModule",{value:!0}),i);var l=["strict","lax","none"],d=["low","medium","high"],u=class{constructor(e){this._parsed=new Map,this._headers=e;let t=e.get("cookie");if(t)for(let[e,r]of n(t))this._parsed.set(e,{name:e,value:r})}[Symbol.iterator](){return this._parsed[Symbol.iterator]()}get size(){return this._parsed.size}get(...e){let t="string"==typeof e[0]?e[0]:e[0].name;return this._parsed.get(t)}getAll(...e){var t;let r=Array.from(this._parsed);if(!e.length)return r.map(([e,t])=>t);let o="string"==typeof e[0]?e[0]:null==(t=e[0])?void 0:t.name;return r.filter(([e])=>e===o).map(([e,t])=>t)}has(e){return this._parsed.has(e)}set(...e){let[t,r]=1===e.length?[e[0].name,e[0].value]:e,o=this._parsed;return o.set(t,{name:t,value:r}),this._headers.set("cookie",Array.from(o).map(([e,t])=>s(t)).join("; ")),this}delete(e){let t=this._parsed,r=Array.isArray(e)?e.map(e=>t.delete(e)):t.delete(e);return this._headers.set("cookie",Array.from(t).map(([e,t])=>s(t)).join("; ")),r}clear(){return this.delete(Array.from(this._parsed.keys())),this}[Symbol.for("edge-runtime.inspect.custom")](){return`RequestCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`}toString(){return[...this._parsed.values()].map(e=>`${e.name}=${encodeURIComponent(e.value)}`).join("; ")}},f=class{constructor(e){var t,r,o;this._parsed=new Map,this._headers=e;let a=null!=(o=null!=(r=null==(t=e.getSetCookie)?void 0:t.call(e))?r:e.get("set-cookie"))?o:[];for(let e of Array.isArray(a)?a:function(e){if(!e)return[];var t,r,o,a,i,s=[],n=0;function c(){for(;n<e.length&&/\s/.test(e.charAt(n));)n+=1;return n<e.length}for(;n<e.length;){for(t=n,i=!1;c();)if(","===(r=e.charAt(n))){for(o=n,n+=1,c(),a=n;n<e.length&&"="!==(r=e.charAt(n))&&";"!==r&&","!==r;)n+=1;n<e.length&&"="===e.charAt(n)?(i=!0,n=a,s.push(e.substring(t,o)),t=n):n=o+1}else n+=1;(!i||n>=e.length)&&s.push(e.substring(t,e.length))}return s}(a)){let t=c(e);t&&this._parsed.set(t.name,t)}}get(...e){let t="string"==typeof e[0]?e[0]:e[0].name;return this._parsed.get(t)}getAll(...e){var t;let r=Array.from(this._parsed.values());if(!e.length)return r;let o="string"==typeof e[0]?e[0]:null==(t=e[0])?void 0:t.name;return r.filter(e=>e.name===o)}has(e){return this._parsed.has(e)}set(...e){let[t,r,o]=1===e.length?[e[0].name,e[0].value,e[0]]:e,a=this._parsed;return a.set(t,function(e={name:"",value:""}){return"number"==typeof e.expires&&(e.expires=new Date(e.expires)),e.maxAge&&(e.expires=new Date(Date.now()+1e3*e.maxAge)),(null===e.path||void 0===e.path)&&(e.path="/"),e}({name:t,value:r,...o})),function(e,t){for(let[,r]of(t.delete("set-cookie"),e)){let e=s(r);t.append("set-cookie",e)}}(a,this._headers),this}delete(...e){let[t,r,o]="string"==typeof e[0]?[e[0]]:[e[0].name,e[0].path,e[0].domain];return this.set({name:t,path:r,domain:o,value:"",expires:new Date(0)})}[Symbol.for("edge-runtime.inspect.custom")](){return`ResponseCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`}toString(){return[...this._parsed.values()].map(s).join("; ")}}},9303:(e,t,r)=>{e.exports=r(517)},3047:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{HeadersAdapter:function(){return i},ReadonlyHeadersError:function(){return a}});let o=r(8238);class a extends Error{constructor(){super("Headers cannot be modified. Read more: https://nextjs.org/docs/app/api-reference/functions/headers")}static callable(){throw new a}}class i extends Headers{constructor(e){super(),this.headers=new Proxy(e,{get(t,r,a){if("symbol"==typeof r)return o.ReflectAdapter.get(t,r,a);let i=r.toLowerCase(),s=Object.keys(e).find(e=>e.toLowerCase()===i);if(void 0!==s)return o.ReflectAdapter.get(t,s,a)},set(t,r,a,i){if("symbol"==typeof r)return o.ReflectAdapter.set(t,r,a,i);let s=r.toLowerCase(),n=Object.keys(e).find(e=>e.toLowerCase()===s);return o.ReflectAdapter.set(t,n??r,a,i)},has(t,r){if("symbol"==typeof r)return o.ReflectAdapter.has(t,r);let a=r.toLowerCase(),i=Object.keys(e).find(e=>e.toLowerCase()===a);return void 0!==i&&o.ReflectAdapter.has(t,i)},deleteProperty(t,r){if("symbol"==typeof r)return o.ReflectAdapter.deleteProperty(t,r);let a=r.toLowerCase(),i=Object.keys(e).find(e=>e.toLowerCase()===a);return void 0===i||o.ReflectAdapter.deleteProperty(t,i)}})}static seal(e){return new Proxy(e,{get(e,t,r){switch(t){case"append":case"delete":case"set":return a.callable;default:return o.ReflectAdapter.get(e,t,r)}}})}merge(e){return Array.isArray(e)?e.join(", "):e}static from(e){return e instanceof Headers?e:new i(e)}append(e,t){let r=this.headers[e];"string"==typeof r?this.headers[e]=[r,t]:Array.isArray(r)?r.push(t):this.headers[e]=t}delete(e){delete this.headers[e]}get(e){let t=this.headers[e];return void 0!==t?this.merge(t):null}has(e){return void 0!==this.headers[e]}set(e,t){this.headers[e]=t}forEach(e,t){for(let[r,o]of this.entries())e.call(t,o,r,this)}*entries(){for(let e of Object.keys(this.headers)){let t=e.toLowerCase(),r=this.get(t);yield[t,r]}}*keys(){for(let e of Object.keys(this.headers)){let t=e.toLowerCase();yield t}}*values(){for(let e of Object.keys(this.headers)){let t=this.get(e);yield t}}[Symbol.iterator](){return this.entries()}}},8238:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"ReflectAdapter",{enumerable:!0,get:function(){return r}});class r{static get(e,t,r){let o=Reflect.get(e,t,r);return"function"==typeof o?o.bind(e):o}static set(e,t,r,o){return Reflect.set(e,t,r,o)}static has(e,t){return Reflect.has(e,t)}static deleteProperty(e,t){return Reflect.deleteProperty(e,t)}}},8996:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{MutableRequestCookiesAdapter:function(){return u},ReadonlyRequestCookiesError:function(){return s},RequestCookiesAdapter:function(){return n},appendMutableCookies:function(){return d},getModifiedCookieValues:function(){return l}});let o=r(2044),a=r(8238),i=r(5869);class s extends Error{constructor(){super("Cookies can only be modified in a Server Action or Route Handler. Read more: https://nextjs.org/docs/app/api-reference/functions/cookies#cookiessetname-value-options")}static callable(){throw new s}}class n{static seal(e){return new Proxy(e,{get(e,t,r){switch(t){case"clear":case"delete":case"set":return s.callable;default:return a.ReflectAdapter.get(e,t,r)}}})}}let c=Symbol.for("next.mutated.cookies");function l(e){let t=e[c];return t&&Array.isArray(t)&&0!==t.length?t:[]}function d(e,t){let r=l(t);if(0===r.length)return!1;let a=new o.ResponseCookies(e),i=a.getAll();for(let e of r)a.set(e);for(let e of i)a.set(e);return!0}class u{static wrap(e,t){let r=new o.ResponseCookies(new Headers);for(let t of e.getAll())r.set(t);let s=[],n=new Set,l=()=>{let e=i.staticGenerationAsyncStorage.getStore();if(e&&(e.pathWasRevalidated=!0),s=r.getAll().filter(e=>n.has(e.name)),t){let e=[];for(let t of s){let r=new o.ResponseCookies(new Headers);r.set(t),e.push(r.toString())}t(e)}};return new Proxy(r,{get(e,t,r){switch(t){case c:return s;case"delete":return function(...t){n.add("string"==typeof t[0]?t[0]:t[0].name);try{e.delete(...t)}finally{l()}};case"set":return function(...t){n.add("string"==typeof t[0]?t[0]:t[0].name);try{return e.set(...t)}finally{l()}};default:return a.ReflectAdapter.get(e,t,r)}}})}}},2044:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{RequestCookies:function(){return o.RequestCookies},ResponseCookies:function(){return o.ResponseCookies}});let o=r(9925)},1274:(e,t,r)=>{r.d(t,{_:()=>k});var o=r(2635),a=r(6005),i=r(7261),s=r(6042),n=r(2690),c=r(7682),l=r(3194);let d=(0,i.promisify)(a.verify),u=async(e,t,r,o)=>{let i=(0,l.Z)(e,t,"verify");if(e.startsWith("HS")){let t=await (0,c.Z)(e,i,o);try{return a.timingSafeEqual(r,t)}catch{return!1}}let u=(0,s.Z)(e),f=(0,n.Z)(e,i);try{return await d(u,o,f,r)}catch{return!1}};var f=r(5547),p=r(1079),y=r(5689),h=r(5165),m=r(7219),g=r(1884);let w=(e,t)=>{if(void 0!==t&&(!Array.isArray(t)||t.some(e=>"string"!=typeof e)))throw TypeError(`"${e}" option must be an array of strings`);if(t)return new Set(t)};async function b(e,t,r){let a,i;if(!(0,h.Z)(e))throw new f.GW("Flattened JWS must be an object");if(void 0===e.protected&&void 0===e.header)throw new f.GW('Flattened JWS must have either of the "protected" or "header" members');if(void 0!==e.protected&&"string"!=typeof e.protected)throw new f.GW("JWS Protected Header incorrect type");if(void 0===e.payload)throw new f.GW("JWS Payload missing");if("string"!=typeof e.signature)throw new f.GW("JWS Signature missing or incorrect type");if(void 0!==e.header&&!(0,h.Z)(e.header))throw new f.GW("JWS Unprotected Header incorrect type");let s={};if(e.protected)try{let t=(0,o.Jx)(e.protected);s=JSON.parse(p.xv.decode(t))}catch{throw new f.GW("JWS Protected Header is invalid")}if(!(0,y.Z)(s,e.header))throw new f.GW("JWS Protected and JWS Unprotected Header Parameter names must be disjoint");let n={...s,...e.header},c=(0,g.Z)(f.GW,new Map([["b64",!0]]),r?.crit,s,n),l=!0;if(c.has("b64")&&"boolean"!=typeof(l=s.b64))throw new f.GW('The "b64" (base64url-encode payload) Header Parameter must be a boolean');let{alg:d}=n;if("string"!=typeof d||!d)throw new f.GW('JWS "alg" (Algorithm) Header Parameter missing or invalid');let b=r&&w("algorithms",r.algorithms);if(b&&!b.has(d))throw new f.FP('"alg" (Algorithm) Header Parameter value not allowed');if(l){if("string"!=typeof e.payload)throw new f.GW("JWS Payload must be a string")}else if("string"!=typeof e.payload&&!(e.payload instanceof Uint8Array))throw new f.GW("JWS Payload must be a string or an Uint8Array instance");let S=!1;"function"==typeof t&&(t=await t(s,e),S=!0),(0,m.Z)(d,t,"verify");let v=(0,p.zo)(p.g7.encode(e.protected??""),p.g7.encode("."),"string"==typeof e.payload?p.g7.encode(e.payload):e.payload);try{a=(0,o.Jx)(e.signature)}catch{throw new f.GW("Failed to base64url decode the signature")}if(!await u(d,t,a,v))throw new f.nx;if(l)try{i=(0,o.Jx)(e.payload)}catch{throw new f.GW("Failed to base64url decode the payload")}else i="string"==typeof e.payload?p.g7.encode(e.payload):e.payload;let A={payload:i};return(void 0!==e.protected&&(A.protectedHeader=s),void 0!==e.header&&(A.unprotectedHeader=e.header),S)?{...A,key:t}:A}async function S(e,t,r){if(e instanceof Uint8Array&&(e=p.xv.decode(e)),"string"!=typeof e)throw new f.GW("Compact JWS must be a string or Uint8Array");let{0:o,1:a,2:i,length:s}=e.split(".");if(3!==s)throw new f.GW("Invalid Compact JWS");let n=await b({payload:a,protected:o,signature:i},t,r),c={payload:n.payload,protectedHeader:n.protectedHeader};return"function"==typeof t?{...c,key:n.key}:c}var v=r(2741),A=r(1301);let E=e=>e.toLowerCase().replace(/^application\//,""),_=(e,t)=>"string"==typeof e?t.includes(e):!!Array.isArray(e)&&t.some(Set.prototype.has.bind(new Set(e))),R=(e,t,r={})=>{let o,a;try{o=JSON.parse(p.xv.decode(t))}catch{}if(!(0,h.Z)(o))throw new f.uv("JWT Claims Set must be a top-level JSON object");let{typ:i}=r;if(i&&("string"!=typeof e.typ||E(e.typ)!==E(i)))throw new f.YS('unexpected "typ" JWT header value',o,"typ","check_failed");let{requiredClaims:s=[],issuer:n,subject:c,audience:l,maxTokenAge:d}=r,u=[...s];for(let e of(void 0!==d&&u.push("iat"),void 0!==l&&u.push("aud"),void 0!==c&&u.push("sub"),void 0!==n&&u.push("iss"),new Set(u.reverse())))if(!(e in o))throw new f.YS(`missing required "${e}" claim`,o,e,"missing");if(n&&!(Array.isArray(n)?n:[n]).includes(o.iss))throw new f.YS('unexpected "iss" claim value',o,"iss","check_failed");if(c&&o.sub!==c)throw new f.YS('unexpected "sub" claim value',o,"sub","check_failed");if(l&&!_(o.aud,"string"==typeof l?[l]:l))throw new f.YS('unexpected "aud" claim value',o,"aud","check_failed");switch(typeof r.clockTolerance){case"string":a=(0,A.Z)(r.clockTolerance);break;case"number":a=r.clockTolerance;break;case"undefined":a=0;break;default:throw TypeError("Invalid clockTolerance option type")}let{currentDate:y}=r,m=(0,v.Z)(y||new Date);if((void 0!==o.iat||d)&&"number"!=typeof o.iat)throw new f.YS('"iat" claim must be a number',o,"iat","invalid");if(void 0!==o.nbf){if("number"!=typeof o.nbf)throw new f.YS('"nbf" claim must be a number',o,"nbf","invalid");if(o.nbf>m+a)throw new f.YS('"nbf" claim timestamp check failed',o,"nbf","check_failed")}if(void 0!==o.exp){if("number"!=typeof o.exp)throw new f.YS('"exp" claim must be a number',o,"exp","invalid");if(o.exp<=m-a)throw new f.fy('"exp" claim timestamp check failed',o,"exp","check_failed")}if(d){let e=m-o.iat;if(e-a>("number"==typeof d?d:(0,A.Z)(d)))throw new f.fy('"iat" claim timestamp check failed (too far in the past)',o,"iat","check_failed");if(e<0-a)throw new f.YS('"iat" claim timestamp check failed (it should be in the past)',o,"iat","check_failed")}return o};async function k(e,t,r){let o=await S(e,t,r);if(o.protectedHeader.crit?.includes("b64")&&!1===o.protectedHeader.b64)throw new f.uv("JWTs MUST NOT use unencoded payload");let a={payload:R(o.protectedHeader,o.payload,r),protectedHeader:o.protectedHeader};return"function"==typeof t?{...a,key:o.key}:a}},1079:(e,t,r)=>{r.d(t,{g7:()=>o,xv:()=>a,zo:()=>i});let o=new TextEncoder,a=new TextDecoder;function i(...e){let t=new Uint8Array(e.reduce((e,{length:t})=>e+t,0)),r=0;for(let o of e)t.set(o,r),r+=o.length;return t}},7219:(e,t,r)=>{r.d(t,{Z:()=>c});var o=r(2687),a=r(4430);let i=e=>e?.[Symbol.toStringTag],s=(e,t)=>{if(!(t instanceof Uint8Array)){if(!(0,a.Z)(t))throw TypeError((0,o.J)(e,t,...a.V,"Uint8Array"));if("secret"!==t.type)throw TypeError(`${i(t)} instances for symmetric algorithms must be of type "secret"`)}},n=(e,t,r)=>{if(!(0,a.Z)(t))throw TypeError((0,o.J)(e,t,...a.V));if("secret"===t.type)throw TypeError(`${i(t)} instances for asymmetric algorithms must not be of type "secret"`);if("sign"===r&&"public"===t.type)throw TypeError(`${i(t)} instances for asymmetric algorithm signing must be of type "private"`);if("decrypt"===r&&"public"===t.type)throw TypeError(`${i(t)} instances for asymmetric algorithm decryption must be of type "private"`);if(t.algorithm&&"verify"===r&&"private"===t.type)throw TypeError(`${i(t)} instances for asymmetric algorithm verifying must be of type "public"`);if(t.algorithm&&"encrypt"===r&&"private"===t.type)throw TypeError(`${i(t)} instances for asymmetric algorithm encryption must be of type "public"`)},c=(e,t,r)=>{e.startsWith("HS")||"dir"===e||e.startsWith("PBES2")||/^A\d{3}(?:GCM)?KW$/.test(e)?s(e,t):n(e,t,r)}},2741:(e,t,r)=>{r.d(t,{Z:()=>o});let o=e=>Math.floor(e.getTime()/1e3)},2687:(e,t,r)=>{function o(e,t,...r){if(r.length>2){let t=r.pop();e+=`one of type ${r.join(", ")}, or ${t}.`}else 2===r.length?e+=`one of type ${r[0]} or ${r[1]}.`:e+=`of type ${r[0]}.`;return null==t?e+=` Received ${t}`:"function"==typeof t&&t.name?e+=` Received function ${t.name}`:"object"==typeof t&&null!=t&&t.constructor?.name&&(e+=` Received an instance of ${t.constructor.name}`),e}r.d(t,{J:()=>i,Z:()=>a});let a=(e,...t)=>o("Key must be ",e,...t);function i(e,t,...r){return o(`Key for the ${e} algorithm must be `,t,...r)}},5689:(e,t,r)=>{r.d(t,{Z:()=>o});let o=(...e)=>{let t;let r=e.filter(Boolean);if(0===r.length||1===r.length)return!0;for(let e of r){let r=Object.keys(e);if(!t||0===t.size){t=new Set(r);continue}for(let e of r){if(t.has(e))return!1;t.add(e)}}return!0}},5165:(e,t,r)=>{r.d(t,{Z:()=>o});function o(e){if(!("object"==typeof e&&null!==e)||"[object Object]"!==Object.prototype.toString.call(e))return!1;if(null===Object.getPrototypeOf(e))return!0;let t=e;for(;null!==Object.getPrototypeOf(t);)t=Object.getPrototypeOf(t);return Object.getPrototypeOf(e)===t}},1301:(e,t,r)=>{r.d(t,{Z:()=>a});let o=/^(\+|\-)? ?(\d+|\d+\.\d+) ?(seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)(?: (ago|from now))?$/i,a=e=>{let t;let r=o.exec(e);if(!r||r[4]&&r[1])throw TypeError("Invalid time period format");let a=parseFloat(r[2]);switch(r[3].toLowerCase()){case"sec":case"secs":case"second":case"seconds":case"s":t=Math.round(a);break;case"minute":case"minutes":case"min":case"mins":case"m":t=Math.round(60*a);break;case"hour":case"hours":case"hr":case"hrs":case"h":t=Math.round(3600*a);break;case"day":case"days":case"d":t=Math.round(86400*a);break;case"week":case"weeks":case"w":t=Math.round(604800*a);break;default:t=Math.round(31557600*a)}return"-"===r[1]||"ago"===r[4]?-t:t}},1884:(e,t,r)=>{r.d(t,{Z:()=>a});var o=r(5547);let a=function(e,t,r,a,i){let s;if(void 0!==i.crit&&a?.crit===void 0)throw new e('"crit" (Critical) Header Parameter MUST be integrity protected');if(!a||void 0===a.crit)return new Set;if(!Array.isArray(a.crit)||0===a.crit.length||a.crit.some(e=>"string"!=typeof e||0===e.length))throw new e('"crit" (Critical) Header Parameter MUST be an array of non-empty strings when present');for(let n of(s=void 0!==r?new Map([...Object.entries(r),...t.entries()]):t,a.crit)){if(!s.has(n))throw new o.jq(`Extension Header Parameter "${n}" is not recognized`);if(void 0===i[n])throw new e(`Extension Header Parameter "${n}" is missing`);if(s.get(n)&&void 0===a[n])throw new e(`Extension Header Parameter "${n}" MUST be integrity protected`)}return new Set(a.crit)}},2635:(e,t,r)=>{r.d(t,{Jx:()=>s,cv:()=>i});var o=r(2254),a=r(1079);let i=e=>o.Buffer.from(e).toString("base64url"),s=e=>new Uint8Array(o.Buffer.from(function(e){let t=e;return t instanceof Uint8Array&&(t=a.xv.decode(t)),t}(e),"base64"))},6042:(e,t,r)=>{r.d(t,{Z:()=>a});var o=r(5547);function a(e){switch(e){case"PS256":case"RS256":case"ES256":case"ES256K":return"sha256";case"PS384":case"RS384":case"ES384":return"sha384";case"PS512":case"RS512":case"ES512":return"sha512";case"EdDSA":return;default:throw new o.jq(`alg ${e} is not supported either by JOSE or your javascript runtime`)}}},3194:(e,t,r)=>{r.d(t,{Z:()=>d});var o=r(6005),a=r(5119);function i(e,t="algorithm.name"){return TypeError(`CryptoKey does not support this operation, its ${t} must be ${e}`)}function s(e,t){return e.name===t}function n(e){return parseInt(e.name.slice(4),10)}var c=r(2687),l=r(4430);function d(e,t,r){if(t instanceof Uint8Array){if(!e.startsWith("HS"))throw TypeError((0,c.Z)(t,...l.V));return(0,o.createSecretKey)(t)}if(t instanceof o.KeyObject)return t;if((0,a.b)(t))return function(e,t,...r){switch(t){case"HS256":case"HS384":case"HS512":{if(!s(e.algorithm,"HMAC"))throw i("HMAC");let r=parseInt(t.slice(2),10);if(n(e.algorithm.hash)!==r)throw i(`SHA-${r}`,"algorithm.hash");break}case"RS256":case"RS384":case"RS512":{if(!s(e.algorithm,"RSASSA-PKCS1-v1_5"))throw i("RSASSA-PKCS1-v1_5");let r=parseInt(t.slice(2),10);if(n(e.algorithm.hash)!==r)throw i(`SHA-${r}`,"algorithm.hash");break}case"PS256":case"PS384":case"PS512":{if(!s(e.algorithm,"RSA-PSS"))throw i("RSA-PSS");let r=parseInt(t.slice(2),10);if(n(e.algorithm.hash)!==r)throw i(`SHA-${r}`,"algorithm.hash");break}case"EdDSA":if("Ed25519"!==e.algorithm.name&&"Ed448"!==e.algorithm.name)throw i("Ed25519 or Ed448");break;case"ES256":case"ES384":case"ES512":{if(!s(e.algorithm,"ECDSA"))throw i("ECDSA");let r=function(e){switch(e){case"ES256":return"P-256";case"ES384":return"P-384";case"ES512":return"P-521";default:throw Error("unreachable")}}(t);if(e.algorithm.namedCurve!==r)throw i(r,"algorithm.namedCurve");break}default:throw TypeError("CryptoKey does not support this operation")}(function(e,t){if(t.length&&!t.some(t=>e.usages.includes(t))){let e="CryptoKey does not support this operation, its usages must include ";if(t.length>2){let r=t.pop();e+=`one of ${t.join(", ")}, or ${r}.`}else 2===t.length?e+=`one of ${t[0]} or ${t[1]}.`:e+=`${t[0]}.`;throw TypeError(e)}})(e,r)}(t,e,r),o.KeyObject.from(t);throw TypeError((0,c.Z)(t,...l.V,"Uint8Array"))}},4430:(e,t,r)=>{r.d(t,{V:()=>s,Z:()=>i});var o=r(5119),a=r(7637);let i=e=>(0,a.Z)(e)||(0,o.b)(e),s=["KeyObject"];(globalThis.CryptoKey||o.Z?.CryptoKey)&&s.push("CryptoKey")},7637:(e,t,r)=>{r.d(t,{Z:()=>a});var o=r(7261);let a=e=>o.types.isKeyObject(e)},2690:(e,t,r)=>{r.d(t,{Z:()=>y});var o=r(6005),a=r(5547),i=r(5119),s=r(7637),n=r(2687),c=r(4430);new WeakMap;let l=e=>{switch(e){case"prime256v1":return"P-256";case"secp384r1":return"P-384";case"secp521r1":return"P-521";case"secp256k1":return"secp256k1";default:throw new a.jq("Unsupported key curve for this operation")}},d=(e,t)=>{let r;if((0,i.b)(e))r=o.KeyObject.from(e);else if((0,s.Z)(e))r=e;else throw TypeError((0,n.Z)(e,...c.V));if("secret"===r.type)throw TypeError('only "private" or "public" type keys can be used for this operation');switch(r.asymmetricKeyType){case"ed25519":case"ed448":return`Ed${r.asymmetricKeyType.slice(2)}`;case"x25519":case"x448":return`X${r.asymmetricKeyType.slice(1)}`;case"ec":{let e=r.asymmetricKeyDetails.namedCurve;if(t)return e;return l(e)}default:throw TypeError("Invalid asymmetric key type for this operation")}},u=(e,t)=>{let{modulusLength:r}=e.asymmetricKeyDetails;if("number"!=typeof r||r<2048)throw TypeError(`${t} requires key modulusLength to be 2048 bits or larger`)},f={padding:o.constants.RSA_PKCS1_PSS_PADDING,saltLength:o.constants.RSA_PSS_SALTLEN_DIGEST},p=new Map([["ES256","P-256"],["ES256K","secp256k1"],["ES384","P-384"],["ES512","P-521"]]);function y(e,t){switch(e){case"EdDSA":if(!["ed25519","ed448"].includes(t.asymmetricKeyType))throw TypeError("Invalid key for this operation, its asymmetricKeyType must be ed25519 or ed448");return t;case"RS256":case"RS384":case"RS512":if("rsa"!==t.asymmetricKeyType)throw TypeError("Invalid key for this operation, its asymmetricKeyType must be rsa");return u(t,e),t;case"PS256":case"PS384":case"PS512":if("rsa-pss"===t.asymmetricKeyType){let{hashAlgorithm:r,mgf1HashAlgorithm:o,saltLength:a}=t.asymmetricKeyDetails,i=parseInt(e.slice(-3),10);if(void 0!==r&&(r!==`sha${i}`||o!==r))throw TypeError(`Invalid key for this operation, its RSA-PSS parameters do not meet the requirements of "alg" ${e}`);if(void 0!==a&&a>i>>3)throw TypeError(`Invalid key for this operation, its RSA-PSS parameter saltLength does not meet the requirements of "alg" ${e}`)}else if("rsa"!==t.asymmetricKeyType)throw TypeError("Invalid key for this operation, its asymmetricKeyType must be rsa or rsa-pss");return u(t,e),{key:t,...f};case"ES256":case"ES256K":case"ES384":case"ES512":{if("ec"!==t.asymmetricKeyType)throw TypeError("Invalid key for this operation, its asymmetricKeyType must be ec");let r=d(t),o=p.get(e);if(r!==o)throw TypeError(`Invalid key curve for the algorithm, its curve must be ${o}, got ${r}`);return{dsaEncoding:"ieee-p1363",key:t}}default:throw new a.jq(`alg ${e} is not supported either by JOSE or your javascript runtime`)}}},7682:(e,t,r)=>{r.d(t,{Z:()=>d});var o=r(6005),a=r(7261),i=r(6042),s=r(5547),n=r(2690),c=r(3194);let l=(0,a.promisify)(o.sign),d=async(e,t,r)=>{let a=(0,c.Z)(e,t,"sign");if(e.startsWith("HS")){let t=o.createHmac(function(e){switch(e){case"HS256":return"sha256";case"HS384":return"sha384";case"HS512":return"sha512";default:throw new s.jq(`alg ${e} is not supported either by JOSE or your javascript runtime`)}}(e),a);return t.update(r),t.digest()}return l((0,i.Z)(e),r,(0,n.Z)(e,a))}},5119:(e,t,r)=>{r.d(t,{Z:()=>i,b:()=>s});var o=r(6005),a=r(7261);let i=o.webcrypto,s=e=>a.types.isCryptoKey(e)},5547:(e,t,r)=>{r.d(t,{FP:()=>s,GW:()=>c,YS:()=>a,fy:()=>i,jq:()=>n,nx:()=>d,uv:()=>l});class o extends Error{static get code(){return"ERR_JOSE_GENERIC"}code="ERR_JOSE_GENERIC";constructor(e){super(e),this.name=this.constructor.name,Error.captureStackTrace?.(this,this.constructor)}}class a extends o{static get code(){return"ERR_JWT_CLAIM_VALIDATION_FAILED"}code="ERR_JWT_CLAIM_VALIDATION_FAILED";claim;reason;payload;constructor(e,t,r="unspecified",o="unspecified"){super(e),this.claim=r,this.reason=o,this.payload=t}}class i extends o{static get code(){return"ERR_JWT_EXPIRED"}code="ERR_JWT_EXPIRED";claim;reason;payload;constructor(e,t,r="unspecified",o="unspecified"){super(e),this.claim=r,this.reason=o,this.payload=t}}class s extends o{static get code(){return"ERR_JOSE_ALG_NOT_ALLOWED"}code="ERR_JOSE_ALG_NOT_ALLOWED"}class n extends o{static get code(){return"ERR_JOSE_NOT_SUPPORTED"}code="ERR_JOSE_NOT_SUPPORTED"}class c extends o{static get code(){return"ERR_JWS_INVALID"}code="ERR_JWS_INVALID"}class l extends o{static get code(){return"ERR_JWT_INVALID"}code="ERR_JWT_INVALID"}Symbol.asyncIterator;class d extends o{static get code(){return"ERR_JWS_SIGNATURE_VERIFICATION_FAILED"}code="ERR_JWS_SIGNATURE_VERIFICATION_FAILED";message="signature verification failed"}}};