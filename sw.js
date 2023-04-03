(()=>{"use strict";var e={913:()=>{try{self["workbox:core:6.5.3"]&&_()}catch(e){}},977:()=>{try{self["workbox:precaching:6.5.3"]&&_()}catch(e){}},80:()=>{try{self["workbox:routing:6.5.3"]&&_()}catch(e){}},873:()=>{try{self["workbox:strategies:6.5.3"]&&_()}catch(e){}}},t={};function s(a){var n=t[a];if(void 0!==n)return n.exports;var i=t[a]={exports:{}};return e[a](i,i.exports,s),i.exports}(()=>{s(913);const e=(e,...t)=>{let s=e;return t.length>0&&(s+=` :: ${JSON.stringify(t)}`),s};class t extends Error{constructor(t,s){super(e(t,s)),this.name=t,this.details=s}}const a={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},n=e=>[a.prefix,e,a.suffix].filter((e=>e&&e.length>0)).join("-"),i=e=>e||n(a.precache),r=e=>e||n(a.runtime);function c(e,t){const s=t();return e.waitUntil(s),s}s(977);const o="__WB_REVISION__";function h(e){if(!e)throw new t("add-to-cache-list-unexpected-type",{entry:e});if("string"==typeof e){const t=new URL(e,location.href);return{cacheKey:t.href,url:t.href}}const{revision:s,url:a}=e;if(!a)throw new t("add-to-cache-list-unexpected-type",{entry:e});if(!s){const e=new URL(a,location.href);return{cacheKey:e.href,url:e.href}}const n=new URL(a,location.href),i=new URL(a,location.href);return n.searchParams.set(o,s),{cacheKey:n.href,url:i.href}}class l{constructor(){this.updatedURLs=[],this.notUpdatedURLs=[],this.handlerWillStart=async({request:e,state:t})=>{t&&(t.originalRequest=e)},this.cachedResponseWillBeUsed=async({event:e,state:t,cachedResponse:s})=>{if("install"===e.type&&t&&t.originalRequest&&t.originalRequest instanceof Request){const e=t.originalRequest.url;s?this.notUpdatedURLs.push(e):this.updatedURLs.push(e)}return s}}}class u{constructor({precacheController:e}){this.cacheKeyWillBeUsed=async({request:e,params:t})=>{const s=(null==t?void 0:t.cacheKey)||this._precacheController.getCacheKeyForURL(e.url);return s?new Request(s,{headers:e.headers}):e},this._precacheController=e}}let f;async function d(e,s){let a=null;if(e.url){a=new URL(e.url).origin}if(a!==self.location.origin)throw new t("cross-origin-copy-response",{origin:a});const n=e.clone(),i={headers:new Headers(n.headers),status:n.status,statusText:n.statusText},r=s?s(i):i,c=function(){if(void 0===f){const e=new Response("");if("body"in e)try{new Response(e.body),f=!0}catch(e){f=!1}f=!1}return f}()?n.body:await n.blob();return new Response(c,r)}function p(e,t){const s=new URL(e);for(const e of t)s.searchParams.delete(e);return s.href}class g{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}const y=new Set;s(873);function w(e){return"string"==typeof e?new Request(e):e}class _{constructor(e,t){this._cacheKeys={},Object.assign(this,t),this.event=t.event,this._strategy=e,this._handlerDeferred=new g,this._extendLifetimePromises=[],this._plugins=[...e.plugins],this._pluginStateMap=new Map;for(const e of this._plugins)this._pluginStateMap.set(e,{});this.event.waitUntil(this._handlerDeferred.promise)}async fetch(e){const{event:s}=this;let a=w(e);if("navigate"===a.mode&&s instanceof FetchEvent&&s.preloadResponse){const e=await s.preloadResponse;if(e)return e}const n=this.hasCallback("fetchDidFail")?a.clone():null;try{for(const e of this.iterateCallbacks("requestWillFetch"))a=await e({request:a.clone(),event:s})}catch(e){if(e instanceof Error)throw new t("plugin-error-request-will-fetch",{thrownErrorMessage:e.message})}const i=a.clone();try{let e;e=await fetch(a,"navigate"===a.mode?void 0:this._strategy.fetchOptions);for(const t of this.iterateCallbacks("fetchDidSucceed"))e=await t({event:s,request:i,response:e});return e}catch(e){throw n&&await this.runCallbacks("fetchDidFail",{error:e,event:s,originalRequest:n.clone(),request:i.clone()}),e}}async fetchAndCachePut(e){const t=await this.fetch(e),s=t.clone();return this.waitUntil(this.cachePut(e,s)),t}async cacheMatch(e){const t=w(e);let s;const{cacheName:a,matchOptions:n}=this._strategy,i=await this.getCacheKey(t,"read"),r=Object.assign(Object.assign({},n),{cacheName:a});s=await caches.match(i,r);for(const e of this.iterateCallbacks("cachedResponseWillBeUsed"))s=await e({cacheName:a,matchOptions:n,cachedResponse:s,request:i,event:this.event})||void 0;return s}async cachePut(e,s){const a=w(e);var n;await(n=0,new Promise((e=>setTimeout(e,n))));const i=await this.getCacheKey(a,"write");if(!s)throw new t("cache-put-with-no-response",{url:(r=i.url,new URL(String(r),location.href).href.replace(new RegExp(`^${location.origin}`),""))});var r;const c=await this._ensureResponseSafeToCache(s);if(!c)return!1;const{cacheName:o,matchOptions:h}=this._strategy,l=await self.caches.open(o),u=this.hasCallback("cacheDidUpdate"),f=u?await async function(e,t,s,a){const n=p(t.url,s);if(t.url===n)return e.match(t,a);const i=Object.assign(Object.assign({},a),{ignoreSearch:!0}),r=await e.keys(t,i);for(const t of r)if(n===p(t.url,s))return e.match(t,a)}(l,i.clone(),["__WB_REVISION__"],h):null;try{await l.put(i,u?c.clone():c)}catch(e){if(e instanceof Error)throw"QuotaExceededError"===e.name&&await async function(){for(const e of y)await e()}(),e}for(const e of this.iterateCallbacks("cacheDidUpdate"))await e({cacheName:o,oldResponse:f,newResponse:c.clone(),request:i,event:this.event});return!0}async getCacheKey(e,t){const s=`${e.url} | ${t}`;if(!this._cacheKeys[s]){let a=e;for(const e of this.iterateCallbacks("cacheKeyWillBeUsed"))a=w(await e({mode:t,request:a,event:this.event,params:this.params}));this._cacheKeys[s]=a}return this._cacheKeys[s]}hasCallback(e){for(const t of this._strategy.plugins)if(e in t)return!0;return!1}async runCallbacks(e,t){for(const s of this.iterateCallbacks(e))await s(t)}*iterateCallbacks(e){for(const t of this._strategy.plugins)if("function"==typeof t[e]){const s=this._pluginStateMap.get(t),a=a=>{const n=Object.assign(Object.assign({},a),{state:s});return t[e](n)};yield a}}waitUntil(e){return this._extendLifetimePromises.push(e),e}async doneWaiting(){let e;for(;e=this._extendLifetimePromises.shift();)await e}destroy(){this._handlerDeferred.resolve(null)}async _ensureResponseSafeToCache(e){let t=e,s=!1;for(const e of this.iterateCallbacks("cacheWillUpdate"))if(t=await e({request:this.request,response:t,event:this.event})||void 0,s=!0,!t)break;return s||t&&200!==t.status&&(t=void 0),t}}class v{constructor(e={}){this.cacheName=r(e.cacheName),this.plugins=e.plugins||[],this.fetchOptions=e.fetchOptions,this.matchOptions=e.matchOptions}handle(e){const[t]=this.handleAll(e);return t}handleAll(e){e instanceof FetchEvent&&(e={event:e,request:e.request});const t=e.event,s="string"==typeof e.request?new Request(e.request):e.request,a="params"in e?e.params:void 0,n=new _(this,{event:t,request:s,params:a}),i=this._getResponse(n,s,t);return[i,this._awaitComplete(i,n,s,t)]}async _getResponse(e,s,a){let n;await e.runCallbacks("handlerWillStart",{event:a,request:s});try{if(n=await this._handle(s,e),!n||"error"===n.type)throw new t("no-response",{url:s.url})}catch(t){if(t instanceof Error)for(const i of e.iterateCallbacks("handlerDidError"))if(n=await i({error:t,event:a,request:s}),n)break;if(!n)throw t}for(const t of e.iterateCallbacks("handlerWillRespond"))n=await t({event:a,request:s,response:n});return n}async _awaitComplete(e,t,s,a){let n,i;try{n=await e}catch(i){}try{await t.runCallbacks("handlerDidRespond",{event:a,request:s,response:n}),await t.doneWaiting()}catch(e){e instanceof Error&&(i=e)}if(await t.runCallbacks("handlerDidComplete",{event:a,request:s,response:n,error:i}),t.destroy(),i)throw i}}class m extends v{constructor(e={}){e.cacheName=i(e.cacheName),super(e),this._fallbackToNetwork=!1!==e.fallbackToNetwork,this.plugins.push(m.copyRedirectedCacheableResponsesPlugin)}async _handle(e,t){const s=await t.cacheMatch(e);return s||(t.event&&"install"===t.event.type?await this._handleInstall(e,t):await this._handleFetch(e,t))}async _handleFetch(e,s){let a;const n=s.params||{};if(!this._fallbackToNetwork)throw new t("missing-precache-entry",{cacheName:this.cacheName,url:e.url});{0;const t=n.integrity,i=e.integrity,r=!i||i===t;if(a=await s.fetch(new Request(e,{integrity:"no-cors"!==e.mode?i||t:void 0})),t&&r&&"no-cors"!==e.mode){this._useDefaultCacheabilityPluginIfNeeded();await s.cachePut(e,a.clone());0}}return a}async _handleInstall(e,s){this._useDefaultCacheabilityPluginIfNeeded();const a=await s.fetch(e);if(!await s.cachePut(e,a.clone()))throw new t("bad-precaching-response",{url:e.url,status:a.status});return a}_useDefaultCacheabilityPluginIfNeeded(){let e=null,t=0;for(const[s,a]of this.plugins.entries())a!==m.copyRedirectedCacheableResponsesPlugin&&(a===m.defaultPrecacheCacheabilityPlugin&&(e=s),a.cacheWillUpdate&&t++);0===t?this.plugins.push(m.defaultPrecacheCacheabilityPlugin):t>1&&null!==e&&this.plugins.splice(e,1)}}m.defaultPrecacheCacheabilityPlugin={cacheWillUpdate:async({response:e})=>!e||e.status>=400?null:e},m.copyRedirectedCacheableResponsesPlugin={cacheWillUpdate:async({response:e})=>e.redirected?await d(e):e};class R{constructor({cacheName:e,plugins:t=[],fallbackToNetwork:s=!0}={}){this._urlsToCacheKeys=new Map,this._urlsToCacheModes=new Map,this._cacheKeysToIntegrities=new Map,this._strategy=new m({cacheName:i(e),plugins:[...t,new u({precacheController:this})],fallbackToNetwork:s}),this.install=this.install.bind(this),this.activate=this.activate.bind(this)}get strategy(){return this._strategy}precache(e){this.addToCacheList(e),this._installAndActiveListenersAdded||(self.addEventListener("install",this.install),self.addEventListener("activate",this.activate),this._installAndActiveListenersAdded=!0)}addToCacheList(e){const s=[];for(const a of e){"string"==typeof a?s.push(a):a&&void 0===a.revision&&s.push(a.url);const{cacheKey:e,url:n}=h(a),i="string"!=typeof a&&a.revision?"reload":"default";if(this._urlsToCacheKeys.has(n)&&this._urlsToCacheKeys.get(n)!==e)throw new t("add-to-cache-list-conflicting-entries",{firstEntry:this._urlsToCacheKeys.get(n),secondEntry:e});if("string"!=typeof a&&a.integrity){if(this._cacheKeysToIntegrities.has(e)&&this._cacheKeysToIntegrities.get(e)!==a.integrity)throw new t("add-to-cache-list-conflicting-integrities",{url:n});this._cacheKeysToIntegrities.set(e,a.integrity)}if(this._urlsToCacheKeys.set(n,e),this._urlsToCacheModes.set(n,i),s.length>0){const e=`Workbox is precaching URLs without revision info: ${s.join(", ")}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(e)}}}install(e){return c(e,(async()=>{const t=new l;this.strategy.plugins.push(t);for(const[t,s]of this._urlsToCacheKeys){const a=this._cacheKeysToIntegrities.get(s),n=this._urlsToCacheModes.get(t),i=new Request(t,{integrity:a,cache:n,credentials:"same-origin"});await Promise.all(this.strategy.handleAll({params:{cacheKey:s},request:i,event:e}))}const{updatedURLs:s,notUpdatedURLs:a}=t;return{updatedURLs:s,notUpdatedURLs:a}}))}activate(e){return c(e,(async()=>{const e=await self.caches.open(this.strategy.cacheName),t=await e.keys(),s=new Set(this._urlsToCacheKeys.values()),a=[];for(const n of t)s.has(n.url)||(await e.delete(n),a.push(n.url));return{deletedURLs:a}}))}getURLsToCacheKeys(){return this._urlsToCacheKeys}getCachedURLs(){return[...this._urlsToCacheKeys.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this._urlsToCacheKeys.get(t.href)}getIntegrityForCacheKey(e){return this._cacheKeysToIntegrities.get(e)}async matchPrecache(e){const t=e instanceof Request?e.url:e,s=this.getCacheKeyForURL(t);if(s){return(await self.caches.open(this.strategy.cacheName)).match(s)}}createHandlerBoundToURL(e){const s=this.getCacheKeyForURL(e);if(!s)throw new t("non-precached-url",{url:e});return t=>(t.request=new Request(e),t.params=Object.assign({cacheKey:s},t.params),this.strategy.handle(t))}}s(80);(async()=>{const e=function(){const e=JSON.parse(new URLSearchParams(self.location.search).get("params"));return e.debug&&console.log("[Docusaurus-PWA][SW]: Service Worker params:",e),e}(),t=[{"revision":"7ecc36bd42522fd342085adf2802c97e","url":"-middleware/index.html"},{"revision":"218c42382055ec19e1da61c1460c2198","url":"404.html"},{"revision":"f5a983db18aba804673157debb709e3a","url":"api/app/index.html"},{"revision":"50f518732f9931e952c850f173f3fe08","url":"api/client/index.html"},{"revision":"3a093e01c73cfb869e5a386af26c5f46","url":"api/constants/index.html"},{"revision":"b54735ac3e03c7dc8c94b403df860d24","url":"api/ctx/index.html"},{"revision":"e77db6e453a9898e9f6c6ce0490a34a2","url":"api/fiber/index.html"},{"revision":"4411401c28f5ecfbf11cd8c29a3d6804","url":"api/middleware/basicauth/index.html"},{"revision":"31710474315ee7032f8fbb5420ba4a84","url":"api/middleware/cache/index.html"},{"revision":"889924909aa38c06835d695b8995ae33","url":"api/middleware/compress/index.html"},{"revision":"ec2c162fcc6dc18394589bf74df144ff","url":"api/middleware/cors/index.html"},{"revision":"b68be52895f5cb36efb453f556a84e12","url":"api/middleware/csrf/index.html"},{"revision":"366b14ff90bca784c5eb4210097f50c9","url":"api/middleware/earlydata/index.html"},{"revision":"24b4c34f2ff3518c8a84962aa18ce1fb","url":"api/middleware/encryptcookie/index.html"},{"revision":"7e1826f466de1c772d5c1c649b3d1355","url":"api/middleware/envvar/index.html"},{"revision":"a57c8f368c0012fdb736d39f634cc9cd","url":"api/middleware/etag/index.html"},{"revision":"569815cd75ecbf4339c2e9ba04f1d255","url":"api/middleware/expvar/index.html"},{"revision":"f93fe542a13d2abddef3b8af8fb1a27d","url":"api/middleware/favicon/index.html"},{"revision":"349650e76091f23dbb8b05d032dc49c1","url":"api/middleware/filesystem/index.html"},{"revision":"1d8377796a91c72ec5c9acde69d7a23b","url":"api/middleware/idempotency/index.html"},{"revision":"56e2da5d4e91bcb77f6a905d08469616","url":"api/middleware/limiter/index.html"},{"revision":"deac56527837e8647b1f2b151945ae0d","url":"api/middleware/logger/index.html"},{"revision":"daa2e286f847f89aa7a21f3dad42f0b6","url":"api/middleware/monitor/index.html"},{"revision":"a30d779161d476dabbc97b96ec7effdf","url":"api/middleware/pprof/index.html"},{"revision":"ff7acb8596dec09a1fbda70ce53eaf0b","url":"api/middleware/proxy/index.html"},{"revision":"b85cfec2153205b7d09737d2510d8f88","url":"api/middleware/recover/index.html"},{"revision":"14e18ef290804958aa0c2135a1a50c37","url":"api/middleware/requestid/index.html"},{"revision":"430b3e014760592339b456d319165118","url":"api/middleware/session/index.html"},{"revision":"54bd54741dc6a74a9e6fa3f36e1afa54","url":"api/middleware/skip/index.html"},{"revision":"ff2e28761d26627231f5b77d26dd426e","url":"api/middleware/timeout/index.html"},{"revision":"cc86bb43258e1ab6bb91265b0ee67db7","url":"assets/css/styles.31bd22fb.css"},{"revision":"4ad4004d358c66a72fb69a730ae0ac93","url":"assets/js/05a04cc8.f70d38fb.js"},{"revision":"702366d8da5373205425200574a25787","url":"assets/js/05e2dc8a.098a2061.js"},{"revision":"24f4a598c47bb6a8f8ea0d428c824c6a","url":"assets/js/089526fe.077a4df5.js"},{"revision":"2a8358c9e805c596a984019fe4a2e180","url":"assets/js/0b8e8946.5fc73efa.js"},{"revision":"a4e251e9d259768883af1943f32ed540","url":"assets/js/0c35ae3f.5725785f.js"},{"revision":"259870d93c4b361dd3039aadb9af65ad","url":"assets/js/0e384e19.4e7c1542.js"},{"revision":"8665313f5c1b3a8a4e36cbe757415c4d","url":"assets/js/0f17a9fe.5d439da6.js"},{"revision":"e130e2350907568aff3e97936954a70c","url":"assets/js/0faeb6cb.ac01fd04.js"},{"revision":"97a894501185f2b18ad51b40d9ab4d22","url":"assets/js/105f1242.dc9aa831.js"},{"revision":"5a639d71af8900c68b08bce32252169d","url":"assets/js/14a7e971.67e95c9e.js"},{"revision":"f0eb3e10492ffbaf85677dfcb8fb4a90","url":"assets/js/14eb3368.deff6f73.js"},{"revision":"24854776f8e8a3ed1878b69cb51164ad","url":"assets/js/1588a372.90ad4aef.js"},{"revision":"b6b0b52d836db7131bff76934fe1c908","url":"assets/js/17896441.9bac49d3.js"},{"revision":"056e53e4aaa6b50865ccd1e2bc93a0a5","url":"assets/js/19e7c5f6.986aa82e.js"},{"revision":"b99c42a19fc1fc1c8de47af47f814c8e","url":"assets/js/1a4e3797.6d445047.js"},{"revision":"3ae1acc5dd0cb69919a7e1f8a42d6fa2","url":"assets/js/1a56c576.8611cc06.js"},{"revision":"c361adf4bbd8c1d67b75cd7ce45a4975","url":"assets/js/1be78505.9f9ea806.js"},{"revision":"0680eef0284d5c3eb8672cf78bc471cf","url":"assets/js/1ed4c90d.8e55a6e7.js"},{"revision":"8decd1b3ea5d1af917e60891d047b74a","url":"assets/js/20e81fa7.d1063380.js"},{"revision":"21f65e983e654a0b6825c9e4338f52e5","url":"assets/js/230.06e9bff8.js"},{"revision":"8278edc76fc3c4a2be3323fc17dc643c","url":"assets/js/247783bb.b20f80cc.js"},{"revision":"f287ee3748f24b620c887b3db46bef7d","url":"assets/js/24847ea2.757b183d.js"},{"revision":"950fc6227882a7aa3bdf2423bf4a35e3","url":"assets/js/26257c43.00184ffb.js"},{"revision":"94e65775e2caee138c80f4b925f3b32e","url":"assets/js/2bc33efd.209864f3.js"},{"revision":"e8a514b3dee618ddcc523b897eae1749","url":"assets/js/3201faa7.e2a5a058.js"},{"revision":"18fb467a76808473c96778b7ade34299","url":"assets/js/32778213.176b8162.js"},{"revision":"6d7d4e1258473c2dc38fbdeb4c88451c","url":"assets/js/354823c1.5c80f787.js"},{"revision":"8e3b8f167516f6567f6ff34522196d4d","url":"assets/js/3719c62c.693effe3.js"},{"revision":"b1535af9a0c898e10c9933819a5d723a","url":"assets/js/37882858.ffac140b.js"},{"revision":"60b13b90c5e328321bf55656e908d6c7","url":"assets/js/396a05ac.a63b2409.js"},{"revision":"344fded5e646eebf418690033b4f70d7","url":"assets/js/411460cb.6147b35b.js"},{"revision":"d13a0b82e439e1243fdf336a7c1e84cb","url":"assets/js/4129286c.6024df0a.js"},{"revision":"d97c2e5d3a96dd0c3acec194d515b06e","url":"assets/js/41a4aef8.f3090c83.js"},{"revision":"e15bd03c83c1b5f2c861dab306812a9f","url":"assets/js/44ea2a3d.ecb56af6.js"},{"revision":"64380632e70b449070c0bde2829d3e62","url":"assets/js/48c6cc07.d4c18b9a.js"},{"revision":"598c78f8cac1a8020512ca77bb55893a","url":"assets/js/4972.16dfd4ea.js"},{"revision":"62b757cd2ed9887e83d43a35c6c5e207","url":"assets/js/4a9dde3b.937cb12d.js"},{"revision":"4c164730e6e375ec854a68effde46019","url":"assets/js/4b47f78b.f447ec08.js"},{"revision":"8a586a383e4e62a3235a9d462a349eb7","url":"assets/js/5131.8aadd48c.js"},{"revision":"8a3adfa8b809f055be8194145647324f","url":"assets/js/5229ce75.bd5302e2.js"},{"revision":"0933a70374cdd0535785868363a5598d","url":"assets/js/5283.0af36832.js"},{"revision":"1db7139270887fccf88a1866597bed62","url":"assets/js/5525.999d509e.js"},{"revision":"c7c5f3e5fbfdd26f561009144a373739","url":"assets/js/563969e6.52b7a9ea.js"},{"revision":"a830949fa29126716d8fc2c4b4b14323","url":"assets/js/5995d508.d94809a2.js"},{"revision":"cd77b6f045287ecea61f800d3034029b","url":"assets/js/59e3a47e.3ddafe27.js"},{"revision":"7138016d6e541f72925d704778538718","url":"assets/js/5aebd6e8.7f148254.js"},{"revision":"d2e44c4d593f5dc544fadfbfa464a5bc","url":"assets/js/5f49a855.baadb1c7.js"},{"revision":"e9f1b777e9c4309263aec9edc71f332b","url":"assets/js/615fd3de.9c409b23.js"},{"revision":"31065a46960829505f7256a713d62f45","url":"assets/js/65a2e3ff.8cb8b5c4.js"},{"revision":"1571fcb7036cfde4f175fc0efa8fef1c","url":"assets/js/683903ba.8ab29345.js"},{"revision":"942216b12e920343b6b540c7d9358435","url":"assets/js/696b59c8.6b3be49d.js"},{"revision":"e012cfe9a88084dccbbbd05ef8b6dba6","url":"assets/js/696e1f87.adc8976e.js"},{"revision":"524319d02da0a75a431e6b9a0a0a8443","url":"assets/js/6b69f1ff.a949591b.js"},{"revision":"849874be406eab9e8c4fd0dd6f91251a","url":"assets/js/6e3111c2.f221d813.js"},{"revision":"70e416046f9caad21adba09acaa3d07f","url":"assets/js/6f9f0f49.ef3ce149.js"},{"revision":"713d9b903b6c79c799942766effa79d4","url":"assets/js/72c9b8f6.aa2f785b.js"},{"revision":"31dee4715970e7ca3208ef2aeb951fe6","url":"assets/js/7449d9ed.10e99add.js"},{"revision":"a67c8e2ec3ee4f05560bb2be2093d28f","url":"assets/js/7859bc5c.c7cb8aeb.js"},{"revision":"03e6e75766afa1a062836c3f030c5de3","url":"assets/js/78c6c509.06541ead.js"},{"revision":"1feb864fbe014489a60426c2203f8d07","url":"assets/js/7998e0de.cae76bf7.js"},{"revision":"65695098accfc851806a975212facfa3","url":"assets/js/7a7fff1b.5fcf304d.js"},{"revision":"650187d9f05ecbdf6b1ef2d5f7221e0b","url":"assets/js/7e307fec.623c4466.js"},{"revision":"1c83c7d78085778e34447377b33e2679","url":"assets/js/800a3acf.f0dbcf0c.js"},{"revision":"87e0346399c04ca34166d65574148ffd","url":"assets/js/8231ac58.f1482c46.js"},{"revision":"1faf632ee78197010bbfa33c072ca4ba","url":"assets/js/82a52177.05eb2700.js"},{"revision":"b85e1f5cf0fbbbd0f26fb82998b39dbb","url":"assets/js/8443.f0fb2769.js"},{"revision":"7600ef36ecfd7d86f11fd90c6b22b3c5","url":"assets/js/894f4d94.6f651494.js"},{"revision":"61cab9d53b24279c458d99cad830ec78","url":"assets/js/8d52ac26.73303b9e.js"},{"revision":"b24ba3ad6daf8e5371b557056fb1b26b","url":"assets/js/8ec8555c.186837d2.js"},{"revision":"5174b1d0c3514f644b89a3d8e4db124e","url":"assets/js/9169002b.e96fe756.js"},{"revision":"a1211cf5a6d622fa1e090e4e5ae385e4","url":"assets/js/9226f6dc.f30749c7.js"},{"revision":"63bd7a2b822eca27a9fbdf12456c80a6","url":"assets/js/935f2afb.0eae22ac.js"},{"revision":"f7bff92ab1b1682ad90057e3f8a7213c","url":"assets/js/9717e045.e24bf5ff.js"},{"revision":"61c8ff5318d6f13406a1f27e54a2fba9","url":"assets/js/9947fe9c.dbd61b09.js"},{"revision":"68798e7cbca5ac13ffe8f37001d3d76a","url":"assets/js/9a57fc4d.50c2d1e2.js"},{"revision":"37ae3ea0a34a2db10b1d4b5d6bd3dafd","url":"assets/js/9c153fbf.0546dc18.js"},{"revision":"4b693ea7e1749972f0d623af00085ce5","url":"assets/js/9e17a0a7.36b537f1.js"},{"revision":"ab3ab456165a0c75c219965b67abbb41","url":"assets/js/a1a0db23.2cb8fc6e.js"},{"revision":"cf0cc78a17a2affd9cdd116406f4a85d","url":"assets/js/a4f7be8a.62e6a2d6.js"},{"revision":"36c958df45f3b6931e1ca821f97d5dbb","url":"assets/js/a98ab587.bc6b8a9b.js"},{"revision":"08070f0504ca6b62958a2ffcbf3231ed","url":"assets/js/b0ac2aab.fd9d2e06.js"},{"revision":"d906679d3b1750533d85b65e354a8e18","url":"assets/js/b45514a6.fd4af6e8.js"},{"revision":"4345ad1624e0222eefa63962402216f2","url":"assets/js/bafae794.6eb26da4.js"},{"revision":"fefbf13a973eb7fc02405b595e6b700c","url":"assets/js/c1bcbd07.c5926632.js"},{"revision":"02aaf2fbdbf5e95bc6c6079b0edc3937","url":"assets/js/c36fa059.5e796455.js"},{"revision":"7900336c04c6da7a694e7475cf835a2b","url":"assets/js/c6147012.eaa1f151.js"},{"revision":"629e46769a8c63c9ba8e4bc1548a6cd2","url":"assets/js/c91a29ee.4b373992.js"},{"revision":"ffb0eff51405e36bc2a44760a0a0c40d","url":"assets/js/c921e1c5.1905aa2e.js"},{"revision":"e30b395c3d398a4dd7af69e3c90c38f8","url":"assets/js/c9386115.49360bbd.js"},{"revision":"fd521f564c6915c7383d45ded27b1584","url":"assets/js/ca4084cc.6287791c.js"},{"revision":"eb138b1af55728cc554a61725fd75ffa","url":"assets/js/cd01922d.ec49dbd0.js"},{"revision":"35fec687bb36c5ce480c8ff0131a3e82","url":"assets/js/ceb3afff.f3f0bb6f.js"},{"revision":"369ba63360858b0d6d7e53f93275a181","url":"assets/js/cf63ef8e.c6ce0b8d.js"},{"revision":"497af3ed197d643373b3d158ba835165","url":"assets/js/d3f7bfd6.2d04c2b3.js"},{"revision":"3e5f94fdbcdebffa83f45f90584e3dbf","url":"assets/js/d56ded4a.46d4c4cd.js"},{"revision":"07d65ee43b821382a8e28fe37c687bc6","url":"assets/js/d8d851c4.e76052d4.js"},{"revision":"b9659d8723a115703998a49b8a8ccaf1","url":"assets/js/dd6e99a2.8e42dfda.js"},{"revision":"fca831b083ae6a204853f48afa1835dd","url":"assets/js/df7efcc1.04c918f1.js"},{"revision":"976fda39dd777ef40550979c65f6af29","url":"assets/js/dfc29094.710da0c5.js"},{"revision":"e3d8939221793761d598d51cf0c1df72","url":"assets/js/e02ba15b.3bdd913c.js"},{"revision":"7ab2449478012749aa90370b9f1c01de","url":"assets/js/e3a7aa50.b6445063.js"},{"revision":"20fb633c98dd1bed79cd4c9bdb9d74ac","url":"assets/js/e5c54bdb.aac2858e.js"},{"revision":"ea9018aee993cc290dd498d866c24533","url":"assets/js/e77f4328.7e5a95c5.js"},{"revision":"795bdc87c8aa9097c108911267c71c27","url":"assets/js/e7e568e4.24e2ba23.js"},{"revision":"37b07e5ad03d49a809e20fd0399acace","url":"assets/js/e9780dc4.da11d0e9.js"},{"revision":"eb189ccd4a9845d0dbfd62f880928d77","url":"assets/js/ee02910b.412462fd.js"},{"revision":"75d06a4e00949410e05b08f5c0ab91e6","url":"assets/js/f2e0d9eb.adec02ee.js"},{"revision":"453e5ab5c55b33638be24b985d3dce0e","url":"assets/js/f36dee5a.9f6d1e9d.js"},{"revision":"51d9b295fc96a607ee116d7b62256f52","url":"assets/js/f3a8b621.aeec68ca.js"},{"revision":"fa9cb381cadeadfca40b59096e006ee8","url":"assets/js/f740b2ca.38699007.js"},{"revision":"1ca7b5151ca3e7be51e75d5e2aebc6de","url":"assets/js/f7cef55a.d5100a21.js"},{"revision":"30b1db40f009a7e43762f2a1d519dc78","url":"assets/js/f9806908.32150fae.js"},{"revision":"7b57836920ec56786087ccd080b2def0","url":"assets/js/fba67bfa.4a34f94b.js"},{"revision":"1b7c7687d0e744ecf3ef82930b445972","url":"assets/js/fbe53b78.d7ecff38.js"},{"revision":"6bdaaa46c260dca621e5ec136e9ec4dc","url":"assets/js/fc970c7f.5a6865a9.js"},{"revision":"1f5bab93e8c8400dc6fd1d752bee3deb","url":"assets/js/main.871640bc.js"},{"revision":"995406beb60fb48e19fa0b7a960bab1d","url":"assets/js/runtime~main.7ddf02ce.js"},{"revision":"0ed579e7ba64f7f097a23158e7be246d","url":"category/-middleware/index.html"},{"revision":"082d7eca0f3eb57aea4d2d89d327fa7c","url":"category/api/index.html"},{"revision":"6862d01f7682c620903c68f71c638e80","url":"category/extra/index.html"},{"revision":"5dc5b621cee2be8ed44a2d0d1dab44d6","url":"category/guide/index.html"},{"revision":"b6e1edb92f0995eef46b84dc443d4bf4","url":"ctx/index.html"},{"revision":"a0afdcf1b6d7d66875b7defbe587f31f","url":"extra/benchmarks/index.html"},{"revision":"b4630b18f9d308910935d1548d8bf5b7","url":"extra/faq/index.html"},{"revision":"43ef5fd7cc9442353c1d7b3c4c71f488","url":"guide/error-handling/index.html"},{"revision":"3ca17f40d27fd71b5086c4551e7a5083","url":"guide/faster-fiber/index.html"},{"revision":"41fe881389bfe47231704ae674ccd63f","url":"guide/grouping/index.html"},{"revision":"5d1514054cd5e324d1cbd01be0648043","url":"guide/hooks/index.html"},{"revision":"601736abcc4e5ed3d8a2ddc8af24e424","url":"guide/routing/index.html"},{"revision":"836b13076854f0482ffbfa5d569a53ee","url":"guide/templates/index.html"},{"revision":"0ba9a8f7fad84ca9c0e9ecf192a1b99e","url":"guide/validation/index.html"},{"revision":"2ce187e9f04ce5d9989a7ffaa171f5c5","url":"index.html"},{"revision":"f42d1aef9f7789a8723990f4843b6f7a","url":"manifest.json"},{"revision":"e71c5406f711e14516175ffe4136284e","url":"next/api/app/index.html"},{"revision":"52b1c435ff5bcca622aa21dfb0fbf1d9","url":"next/api/client/index.html"},{"revision":"2c9fea743cdb40a70802b294942e21d3","url":"next/api/constants/index.html"},{"revision":"870c120f0e1ee63476aadd57b44d8792","url":"next/api/ctx/index.html"},{"revision":"f8b0b268f7cc3fee7272c4c1a3c1caa9","url":"next/api/fiber/index.html"},{"revision":"b3384da44291898c9a2820fd2341f9fd","url":"next/api/middleware/basicauth/index.html"},{"revision":"c3b96f0a6bb35cc368df8f8adad850cf","url":"next/api/middleware/cache/index.html"},{"revision":"b8d5cc08d7d9bc265e3804e248f7f919","url":"next/api/middleware/compress/index.html"},{"revision":"a6c893174c57f4ae98802586e1a68633","url":"next/api/middleware/cors/index.html"},{"revision":"a07387f03e1f762c79c3f13c4c6c97a6","url":"next/api/middleware/csrf/index.html"},{"revision":"c6697d632466a244d0a15c2322a56396","url":"next/api/middleware/earlydata/index.html"},{"revision":"bbb638f6fb8f2192305057a80c378638","url":"next/api/middleware/encryptcookie/index.html"},{"revision":"b5be7e5b8409ff6e900d8e91308c1544","url":"next/api/middleware/envvar/index.html"},{"revision":"8e521e3f4fc174d056aac3ef9c092a40","url":"next/api/middleware/etag/index.html"},{"revision":"0ba059c92badbe890913b0f51933a6c6","url":"next/api/middleware/expvar/index.html"},{"revision":"4ae59a45ed31111323be5a7023b5357f","url":"next/api/middleware/favicon/index.html"},{"revision":"dd7412d575b26d62a1647a23ee03e9d6","url":"next/api/middleware/filesystem/index.html"},{"revision":"96550978e10e665e6eec04d5a4681477","url":"next/api/middleware/idempotency/index.html"},{"revision":"ab51766d00877f05f616bb630ef7c5ab","url":"next/api/middleware/limiter/index.html"},{"revision":"ea955bfdbc89ebcec0026ce9da842213","url":"next/api/middleware/logger/index.html"},{"revision":"9534d6bd0ae4f5d29e211393cadba7b0","url":"next/api/middleware/monitor/index.html"},{"revision":"2ff259d1229f4ba7b57ff17c5a16b765","url":"next/api/middleware/pprof/index.html"},{"revision":"f9fa86727b9cd7fdb5758bba40972420","url":"next/api/middleware/proxy/index.html"},{"revision":"65a3adbfd360572c746837f60ac36052","url":"next/api/middleware/recover/index.html"},{"revision":"ab6a07933159e365c80217864642aba9","url":"next/api/middleware/requestid/index.html"},{"revision":"2040bb5d2831132f2a79b2cd4635d7dd","url":"next/api/middleware/session/index.html"},{"revision":"6967c8fc5df996fb6e3a93bf7eb9b9d0","url":"next/api/middleware/skip/index.html"},{"revision":"22a03f395a821eb706a58368de5b68b2","url":"next/api/middleware/timeout/index.html"},{"revision":"ae13b183a745a7a1bc0905d5a2cae68d","url":"next/category/-middleware/index.html"},{"revision":"0a201df4540ef2a318f1458a59d80ad2","url":"next/category/api/index.html"},{"revision":"62846cb9ac8943f7465a6c55f62a2891","url":"next/category/extra/index.html"},{"revision":"c0fe6b6fb4171f84a0feb65b29da531e","url":"next/category/guide/index.html"},{"revision":"9c33f0732138f5dbe1122f528c21647e","url":"next/extra/benchmarks/index.html"},{"revision":"db406138654dfdc965442c1a585a6111","url":"next/extra/faq/index.html"},{"revision":"621c1dc5a7a322d11e44746a297f36cf","url":"next/guide/error-handling/index.html"},{"revision":"16f1c623fe97ce6dc3d9b7064649ffe6","url":"next/guide/faster-fiber/index.html"},{"revision":"007cbc4dae04e6ea0ba4ef65d95c45ed","url":"next/guide/grouping/index.html"},{"revision":"59ceb440acaf0ffdd6b52dd6d3eee9fa","url":"next/guide/hooks/index.html"},{"revision":"c2cef211e1f3922d316fc52e9a8af3b3","url":"next/guide/routing/index.html"},{"revision":"5049f40f7005c958fa463b41de72be15","url":"next/guide/templates/index.html"},{"revision":"9ff7c9f07607cdcf88a20c8cbe689d8b","url":"next/guide/validation/index.html"},{"revision":"e7b468ed3182fb4b3797a65a9e0c397d","url":"next/index.html"},{"revision":"d0ecaa05629297e3ba246e9c284a6e17","url":"next/partials/routing/route-handlers/index.html"},{"revision":"911b37bc735c23fb005bfa888b026ce9","url":"next/search-index.json"},{"revision":"aac8ac2408c2842de7fcdac7ec7c08c0","url":"partials/routing/route-handlers/index.html"},{"revision":"356e031ffc88212f8de1807330821393","url":"routing/index.html"},{"revision":"ac15d5531b184d2e96d76dddbcb7ed01","url":"search-index.json"},{"revision":"36976e970e374f438dcb323dfc7e0e1b","url":"search/index.html"},{"revision":"8084f2f83a2f477735ed11e2bf0e8213","url":"v/1.x/api/app/index.html"},{"revision":"08b749d0b0d95853310eb8d8cb6106d8","url":"v/1.x/api/ctx/index.html"},{"revision":"b785b5746370eebb99f2ee0869bd7c1a","url":"v/1.x/api/middleware/index.html"},{"revision":"ea032e7aa0080b3a208b1f36dd4b3e42","url":"v/1.x/category/api/index.html"},{"revision":"05f4a343184e6860b0ff5ee3d300a985","url":"v/1.x/category/guide/index.html"},{"revision":"43020c9060b711302b75140744628b1b","url":"v/1.x/category/misc/index.html"},{"revision":"6ed7cc0b075f329589b4401d334837af","url":"v/1.x/guide/error-handling/index.html"},{"revision":"36bb8767aaf25e55f7243dfbce1f06d1","url":"v/1.x/guide/grouping/index.html"},{"revision":"270595eab09ebe6d8ea33a90976c9797","url":"v/1.x/guide/routing/index.html"},{"revision":"46f9f665213c2a17baa88d4fb42bad58","url":"v/1.x/guide/templates/index.html"},{"revision":"a87db992f4d13bf4aa792129f43a42d9","url":"v/1.x/guide/validating/index.html"},{"revision":"4d5bf161ff11ab65805a05e165db85c0","url":"v/1.x/index.html"},{"revision":"060cd4ea1beb6b3a8224a6e8b6692d10","url":"v/1.x/misc/benchmarks/index.html"},{"revision":"27fe56b7b2ab21f8d3e02c0e09958cef","url":"v/1.x/misc/faq/index.html"},{"revision":"c40a66165620a5a342fbaf1ee534c9a1","url":"v1.x/api/app/index.html"},{"revision":"98d4265b46978ce2bfe3a2f6ab4cf5d1","url":"v1.x/api/ctx/index.html"},{"revision":"75787dd3866f7d2f04a03f16f0f53c7e","url":"v1.x/api/middleware/index.html"},{"revision":"9aed70a5f6a5d0b36b5d715dbd0dd704","url":"v1.x/category/api/index.html"},{"revision":"bff8fb9b4e52acdc2437d204ad986dd1","url":"v1.x/category/guide/index.html"},{"revision":"3ec8d8e9342711675318a5f856d44025","url":"v1.x/category/misc/index.html"},{"revision":"e6bef6942610cc50b1040ef6fd4a6660","url":"v1.x/guide/error-handling/index.html"},{"revision":"92a9a2b47d9d1e00fbd4434a9c978f74","url":"v1.x/guide/grouping/index.html"},{"revision":"d9fc28a9e0f1ba67c8187e7e576cab9f","url":"v1.x/guide/routing/index.html"},{"revision":"1bb65b4b3c0e65c3c5a436fdc79fa779","url":"v1.x/guide/templates/index.html"},{"revision":"462d6fd4e915fa15145fd1a830cd0071","url":"v1.x/guide/validating/index.html"},{"revision":"bc2d328ff7745b5338ce3dafd3d4a1b9","url":"v1.x/index.html"},{"revision":"315b06ebfb89ba049a0b7cea5622343a","url":"v1.x/misc/benchmarks/index.html"},{"revision":"ae84e237cea8e2ccca9a3af96d2929d5","url":"v1.x/misc/faq/index.html"},{"revision":"c14882e6916cde4d72dabfa5b0b1282c","url":"v1.x/search-index.json"},{"revision":"a2d0b99576a1a51f46d2ee84ec167336","url":"assets/images/benchmark_alloc-dec96faa96e07bcec84f40a4dfc8d187.png"},{"revision":"a7a3e37e6499fcf3fa9d793fd24339b9","url":"assets/images/benchmark_latency-b67a470cf1b261c3092b80cbf42ef16b.png"},{"revision":"c5b05974efbe649f1fe9fcbf15a8ff82","url":"assets/images/benchmark-18e23fcf42afc7f5e12ea23aceb27885.png"},{"revision":"2cdc5220f6027f0106431ed9756ef0ff","url":"assets/images/benchmark-pipeline-b49cbb1db36293acdfb0e6c96d844e1a.png"},{"revision":"1276aea996275055bfbb406a62170931","url":"assets/images/concurrency_alloc-6f2d485576803f7de2fe0a1deca21a09.png"},{"revision":"56065bebf88e6d317d32fa056044ab49","url":"assets/images/concurrency_latency-5a223848a8bee8df21cc02451f0db2b6.png"},{"revision":"c16f8be0910b1d55e73abb3cf14fcc81","url":"assets/images/concurrency-1307e1d23c01a561a4b2a0f5bdd7e1bc.png"},{"revision":"52e02024a0fc9efdeb174fbd2cb5eaa8","url":"assets/images/concurrency-pipeline-b0d3c211d9c7cb5474fd191223a41241.png"},{"revision":"f8a5f57ca71eb1e0f38e676552ba8a0b","url":"assets/images/data_updates_express-2f55d1b0975ec391d29d823b48faf617.png"},{"revision":"ef41ee04899eb8d1a4a34acb4d7fc20a","url":"assets/images/data_updates-3be85c418d6971091854c5086af9ed10.png"},{"revision":"716cadd67372190364a5f07efbb477c2","url":"assets/images/graph-afbd400b1c3e1c6f137dae3cfc1890ce.svg"},{"revision":"7a707deb897d8b72d098d0ee46d3b44d","url":"assets/images/json_express-aa631b2de86808970aa4bb7c9c9d3edf.png"},{"revision":"0b57d54569e518d2112a0a515042ea63","url":"assets/images/json-62868f61b34e3790f3a8b3b52b1a3a3b.png"},{"revision":"316f574189fa0067fb53b53d020b193a","url":"assets/images/multiple_queries_express-ec4dc8013e85dc2a2fa4f5eeb55ce8dd.png"},{"revision":"b3beb07717c41c5e0f7561ae6c479fbf","url":"assets/images/multiple_queries-2c2e81674208b90b9aeb1cb791a3f0dc.png"},{"revision":"480e9b557cc822c532a998a2ed724bfc","url":"assets/images/plaintext_express-ef6522843412bb5b14b3c6b6a4f032de.png"},{"revision":"45bd9af55fba9dc062200831ac57c5e6","url":"assets/images/plaintext-e25d187f782d18fdd35b84e3d7c625eb.png"},{"revision":"5b4ee8112e04d79df5a0aa39acca791b","url":"assets/images/single_query_express-d8e41422b4f5c0a9496272e4a66a97c4.png"},{"revision":"8a5d82762f28eca9a722e75f3f12cff8","url":"assets/images/single_query-4f7782d3c3ff91e92ac27e382b09f6ac.png"},{"revision":"79a9ef885732dee2637157a4762faf7e","url":"assets/images/support-discord-baf5f38231088813dfbc3ccdc6966634.png"},{"revision":"a2d0b99576a1a51f46d2ee84ec167336","url":"img/benchmark_alloc.png"},{"revision":"a7a3e37e6499fcf3fa9d793fd24339b9","url":"img/benchmark_latency.png"},{"revision":"2cdc5220f6027f0106431ed9756ef0ff","url":"img/benchmark-pipeline.png"},{"revision":"c5b05974efbe649f1fe9fcbf15a8ff82","url":"img/benchmark.png"},{"revision":"1276aea996275055bfbb406a62170931","url":"img/concurrency_alloc.png"},{"revision":"56065bebf88e6d317d32fa056044ab49","url":"img/concurrency_latency.png"},{"revision":"52e02024a0fc9efdeb174fbd2cb5eaa8","url":"img/concurrency-pipeline.png"},{"revision":"c16f8be0910b1d55e73abb3cf14fcc81","url":"img/concurrency.png"},{"revision":"f8a5f57ca71eb1e0f38e676552ba8a0b","url":"img/data_updates_express.png"},{"revision":"ef41ee04899eb8d1a4a34acb4d7fc20a","url":"img/data_updates.png"},{"revision":"3b4420315b7baefee56d433e4c78f268","url":"img/favicon.png"},{"revision":"716cadd67372190364a5f07efbb477c2","url":"img/graph.svg"},{"revision":"354ea4a4bcaad920949e253d33683869","url":"img/icons/icon-192x192.png"},{"revision":"4039790fa05a5dc7e9259485b4324433","url":"img/icons/icon-256x256.png"},{"revision":"93b99bdaaad38831b46a296dfeab4863","url":"img/icons/icon-384x384.png"},{"revision":"096c82692efe3ec986ab2b4fc5d60aea","url":"img/icons/icon-512x512.png"},{"revision":"7a707deb897d8b72d098d0ee46d3b44d","url":"img/json_express.png"},{"revision":"0b57d54569e518d2112a0a515042ea63","url":"img/json.png"},{"revision":"171b53337ba05d4e62332e230f3c212b","url":"img/logo-dark.svg"},{"revision":"e2c2dc9b6b5f44183247f7c48d65ccef","url":"img/logo.svg"},{"revision":"316f574189fa0067fb53b53d020b193a","url":"img/multiple_queries_express.png"},{"revision":"b3beb07717c41c5e0f7561ae6c479fbf","url":"img/multiple_queries.png"},{"revision":"480e9b557cc822c532a998a2ed724bfc","url":"img/plaintext_express.png"},{"revision":"45bd9af55fba9dc062200831ac57c5e6","url":"img/plaintext.png"},{"revision":"5b4ee8112e04d79df5a0aa39acca791b","url":"img/single_query_express.png"},{"revision":"8a5d82762f28eca9a722e75f3f12cff8","url":"img/single_query.png"},{"revision":"79a9ef885732dee2637157a4762faf7e","url":"img/support-discord.png"}],s=new R({fallbackToNetwork:!0});e.offlineMode&&(s.addToCacheList(t),e.debug&&console.log("[Docusaurus-PWA][SW]: addToCacheList",{precacheManifest:t})),await async function(e){}(),self.addEventListener("install",(t=>{e.debug&&console.log("[Docusaurus-PWA][SW]: install event",{event:t}),t.waitUntil(s.install(t))})),self.addEventListener("activate",(t=>{e.debug&&console.log("[Docusaurus-PWA][SW]: activate event",{event:t}),t.waitUntil(s.activate(t))})),self.addEventListener("fetch",(async t=>{if(e.offlineMode){const a=t.request.url,n=function(e){const t=new URL(e,self.location.href);return t.origin!==self.location.origin?[]:(t.search="",t.hash="",[t.href,`${t.href}${t.pathname.endsWith("/")?"":"/"}index.html`])}(a);for(const i of n){const r=s.getCacheKeyForURL(i);if(r){const s=caches.match(r);e.debug&&console.log("[Docusaurus-PWA][SW]: serving cached asset",{requestURL:a,possibleURL:i,possibleURLs:n,cacheKey:r,cachedResponse:s}),t.respondWith(s);break}}}})),self.addEventListener("message",(async t=>{e.debug&&console.log("[Docusaurus-PWA][SW]: message event",{event:t});const s=t.data?.type;"SKIP_WAITING"===s&&self.skipWaiting()}))})()})()})();