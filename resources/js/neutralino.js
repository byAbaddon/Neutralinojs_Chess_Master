var Neutralino=function(e){"use strict";function t(e,t,n,o){return new(n||(n=Promise))((function(i,r){function s(e){try{c(o.next(e))}catch(e){r(e)}}function a(e){try{c(o.throw(e))}catch(e){r(e)}}function c(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(s,a)}c((o=o.apply(e,t||[])).next())}))}function n(){return p("extensions.getStats")}"function"==typeof SuppressedError&&SuppressedError;var o={__proto__:null,broadcast:function(e,t){return p("extensions.broadcast",{event:e,data:t})},dispatch:function(e,o,i){return new Promise(((r,s)=>t(this,void 0,void 0,(function*(){const t=yield n();if(t.loaded.includes(e))if(t.connected.includes(e))try{const t=yield p("extensions.dispatch",{extensionId:e,event:o,data:i});r(t)}catch(e){s(e)}else!function(e,t){e in l?l[e].push(t):l[e]=[t]}(e,{method:"extensions.dispatch",data:{extensionId:e,event:o,data:i},resolve:r,reject:s});else s({code:"NE_EX_EXTNOTL",message:`${e} is not loaded`})}))))},getStats:n};function i(e,t){return window.addEventListener(e,t),Promise.resolve({success:!0,message:"Event listener added"})}function r(e,t){const n=new CustomEvent(e,{detail:t});return window.dispatchEvent(n),Promise.resolve({success:!0,message:"Message dispatched"})}function s(e){const t=window.atob(e),n=t.length,o=new Uint8Array(n);for(let e=0;e<n;e++)o[e]=t.charCodeAt(e);return o.buffer}function a(e){let t=new Uint8Array(e),n="";for(let e of t)n+=String.fromCharCode(e);return window.btoa(n)}let c;const u={},d=[],l={};function f(){window.NL_TOKEN&&sessionStorage.setItem("NL_TOKEN",window.NL_TOKEN);const e=g().split(".")[1],o=window.NL_GINJECTED||window.NL_CINJECTED?"localhost":window.location.hostname;c=new WebSocket(`ws://${o}:${window.NL_PORT}?connectToken=${e}`),function(){if(i("ready",(()=>t(this,void 0,void 0,(function*(){if(yield w(d),!window.NL_EXTENABLED)return;const e=yield n();for(const t of e.connected)r("extensionReady",t)})))),i("extClientConnect",(e=>{r("extensionReady",e.detail)})),!window.NL_EXTENABLED)return;i("extensionReady",(e=>t(this,void 0,void 0,(function*(){e.detail in l&&(yield w(l[e.detail]),delete l[e.detail])}))))}(),function(){c.addEventListener("message",(e=>{var t,n,o;const i=JSON.parse(e.data);i.id&&i.id in u?((null===(t=i.data)||void 0===t?void 0:t.error)?(u[i.id].reject(i.data.error),"NE_RT_INVTOKN"==i.data.error.code&&(c.close(),document.body.innerText="",document.write("<code>NE_RT_INVTOKN</code>: Neutralinojs application cannot execute native methods since <code>NL_TOKEN</code> is invalid."))):(null===(n=i.data)||void 0===n?void 0:n.success)&&u[i.id].resolve(i.data.hasOwnProperty("returnValue")?i.data.returnValue:i.data),delete u[i.id]):i.event&&("openedFile"==i.event&&"dataBinary"==(null===(o=null==i?void 0:i.data)||void 0===o?void 0:o.action)&&(i.data.data=s(i.data.data)),r(i.event,i.data))})),c.addEventListener("open",(e=>t(this,void 0,void 0,(function*(){r("ready")})))),c.addEventListener("close",(e=>t(this,void 0,void 0,(function*(){r("serverOffline",{code:"NE_CL_NSEROFF",message:"Neutralino server is offline. Try restarting the application"})})))),c.addEventListener("error",(e=>t(this,void 0,void 0,(function*(){document.body.innerText="",document.write("<code>NE_CL_IVCTOKN</code>: Neutralinojs application cannot connect with the framework core using <code>NL_TOKEN</code>.")}))))}()}function p(e,t){return new Promise(((n,o)=>{if((null==c?void 0:c.readyState)!=WebSocket.OPEN)return i={method:e,data:t,resolve:n,reject:o},void d.push(i);var i;const r="10000000-1000-4000-8000-100000000000".replace(/[018]/g,(e=>(e^crypto.getRandomValues(new Uint8Array(1))[0]&15>>e/4).toString(16))),s=g();u[r]={resolve:n,reject:o},c.send(JSON.stringify({id:r,method:e,data:t,accessToken:s}))}))}function w(e){return t(this,void 0,void 0,(function*(){for(;e.length>0;){const t=e.shift();try{const e=yield p(t.method,t.data);t.resolve(e)}catch(e){t.reject(e)}}}))}function g(){return window.NL_TOKEN||sessionStorage.getItem("NL_TOKEN")||""}function m(e,t){return p("filesystem.writeBinaryFile",{path:e,data:a(t)})}var v={__proto__:null,appendBinaryFile:function(e,t){return p("filesystem.appendBinaryFile",{path:e,data:a(t)})},appendFile:function(e,t){return p("filesystem.appendFile",{path:e,data:t})},copy:function(e,t,n){return p("filesystem.copy",Object.assign({source:e,destination:t},n))},createDirectory:function(e){return p("filesystem.createDirectory",{path:e})},createWatcher:function(e){return p("filesystem.createWatcher",{path:e})},getAbsolutePath:function(e){return p("filesystem.getAbsolutePath",{path:e})},getOpenedFileInfo:function(e){return p("filesystem.getOpenedFileInfo",{id:e})},getPathParts:function(e){return p("filesystem.getPathParts",{path:e})},getRelativePath:function(e,t){return p("filesystem.getRelativePath",{path:e,base:t})},getStats:function(e){return p("filesystem.getStats",{path:e})},getWatchers:function(){return p("filesystem.getWatchers")},move:function(e,t){return p("filesystem.move",{source:e,destination:t})},openFile:function(e){return p("filesystem.openFile",{path:e})},readBinaryFile:function(e,t){return new Promise(((n,o)=>{p("filesystem.readBinaryFile",Object.assign({path:e},t)).then((e=>{n(s(e))})).catch((e=>{o(e)}))}))},readDirectory:function(e,t){return p("filesystem.readDirectory",Object.assign({path:e},t))},readFile:function(e,t){return p("filesystem.readFile",Object.assign({path:e},t))},remove:function(e){return p("filesystem.remove",{path:e})},removeWatcher:function(e){return p("filesystem.removeWatcher",{id:e})},updateOpenedFile:function(e,t,n){return p("filesystem.updateOpenedFile",{id:e,event:t,data:n})},writeBinaryFile:m,writeFile:function(e,t){return p("filesystem.writeFile",{path:e,data:t})}};function h(e,t){return p("os.execCommand",Object.assign({command:e},t))}var _={__proto__:null,execCommand:h,getEnv:function(e){return p("os.getEnv",{key:e})},getEnvs:function(){return p("os.getEnvs")},getPath:function(e){return p("os.getPath",{name:e})},getSpawnedProcesses:function(){return p("os.getSpawnedProcesses")},open:function(e){return p("os.open",{url:e})},setTray:function(e){return p("os.setTray",e)},showFolderDialog:function(e,t){return p("os.showFolderDialog",Object.assign({title:e},t))},showMessageBox:function(e,t,n,o){return p("os.showMessageBox",{title:e,content:t,choice:n,icon:o})},showNotification:function(e,t,n){return p("os.showNotification",{title:e,content:t,icon:n})},showOpenDialog:function(e,t){return p("os.showOpenDialog",Object.assign({title:e},t))},showSaveDialog:function(e,t){return p("os.showSaveDialog",Object.assign({title:e},t))},spawnProcess:function(e,t){return p("os.spawnProcess",{command:e,cwd:t})},updateSpawnedProcess:function(e,t,n){return p("os.updateSpawnedProcess",{id:e,event:t,data:n})}};var y={__proto__:null,getArch:function(){return p("computer.getArch")},getCPUInfo:function(){return p("computer.getCPUInfo")},getDisplays:function(){return p("computer.getDisplays")},getKernelInfo:function(){return p("computer.getKernelInfo")},getMemoryInfo:function(){return p("computer.getMemoryInfo")},getMousePosition:function(){return p("computer.getMousePosition")},getOSInfo:function(){return p("computer.getOSInfo")}};var E={__proto__:null,getData:function(e){return p("storage.getData",{key:e})},getKeys:function(){return p("storage.getKeys")},setData:function(e,t){return p("storage.setData",{key:e,data:t})}};function N(e,t){return p("debug.log",{message:e,type:t})}var O={__proto__:null,log:N};function P(e){return p("app.exit",{code:e})}var b={__proto__:null,broadcast:function(e,t){return p("app.broadcast",{event:e,data:t})},exit:P,getConfig:function(){return p("app.getConfig")},killProcess:function(){return p("app.killProcess")},readProcessInput:function(e){return p("app.readProcessInput",{readAll:e})},restartProcess:function(e){return new Promise((n=>t(this,void 0,void 0,(function*(){let t=window.NL_ARGS.reduce(((e,t)=>(t.includes(" ")&&(t=`"${t}"`),e+=" "+t)),"");(null==e?void 0:e.args)&&(t+=" "+e.args),yield h(t,{background:!0}),P(),n()}))))},writeProcessError:function(e){return p("app.writeProcessError",{data:e})},writeProcessOutput:function(e){return p("app.writeProcessOutput",{data:e})}};const T=new WeakMap;function D(e,t){return p("window.move",{x:e,y:t})}function L(){return p("window.getSize")}var S={__proto__:null,center:function(){return p("window.center")},create:function(e,t){return new Promise(((n,o)=>{function i(e){return"string"!=typeof e||(e=e.trim()).includes(" ")&&(e=`"${e}"`),e}t=Object.assign(Object.assign({},t),{useSavedState:!1});let r=window.NL_ARGS.reduce(((e,t,n)=>((t.includes("--path=")||t.includes("--debug-mode")||t.includes("--load-dir-res")||0==n)&&(e+=" "+i(t)),e)),"");r+=" --url="+i(e);for(let e in t){if("processArgs"==e)continue;r+=` --window${"-"+e.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase()}=${i(t[e])}`}t&&t.processArgs&&(r+=" "+t.processArgs),h(r,{background:!0}).then((e=>{n(e)})).catch((e=>{o(e)}))}))},exitFullScreen:function(){return p("window.exitFullScreen")},focus:function(){return p("window.focus")},getPosition:function(){return p("window.getPosition")},getSize:L,getTitle:function(){return p("window.getTitle")},hide:function(){return p("window.hide")},isFullScreen:function(){return p("window.isFullScreen")},isMaximized:function(){return p("window.isMaximized")},isMinimized:function(){return p("window.isMinimized")},isVisible:function(){return p("window.isVisible")},maximize:function(){return p("window.maximize")},minimize:function(){return p("window.minimize")},move:D,setAlwaysOnTop:function(e){return p("window.setAlwaysOnTop",{onTop:e})},setDraggableRegion:function(e,n={}){return new Promise(((o,i)=>{const r=e instanceof Element?e:document.getElementById(e);let s=0,a=0,c=0,u=!1,d=performance.now(),l=n.alwaysCapture;if(!r)return i({code:"NE_WD_DOMNOTF",message:"Unable to find DOM element"});if(T.has(r))return i({code:"NE_WD_ALRDREL",message:"This DOM element is already an active draggable region"});function f(e){return t(this,void 0,void 0,(function*(){var t;const o=e.clientX-s,i=e.clientY-a;if(c=Math.sqrt(o*o+i*i),c>=(null!==(t=n.dragMinDistance)&&void 0!==t?t:10)&&(u=!0,l||(r.setPointerCapture(e.pointerId),l=!0)),u){const t=performance.now(),n=t-d;if(n<5)return;return d=t-(n-5),void(yield D(e.screenX-s,e.screenY-a))}}))}function p(e){0===e.button&&(s=e.clientX,a=e.clientY,r.addEventListener("pointermove",f),n.alwaysCapture&&r.setPointerCapture(e.pointerId))}function w(e){r.removeEventListener("pointermove",f),r.releasePointerCapture(e.pointerId)}r.addEventListener("pointerdown",p),r.addEventListener("pointerup",w),r.addEventListener("pointercancel",w),T.set(r,{pointerdown:p,pointerup:w}),o({success:!0,message:"Draggable region was activated"})}))},setFullScreen:function(){return p("window.setFullScreen")},setIcon:function(e){return p("window.setIcon",{icon:e})},setSize:function(e){return new Promise(((n,o)=>t(this,void 0,void 0,(function*(){let t=yield L();p("window.setSize",e=Object.assign(Object.assign({},t),e)).then((e=>{n(e)})).catch((e=>{o(e)}))}))))},setTitle:function(e){return p("window.setTitle",{title:e})},show:function(){return p("window.show")},unmaximize:function(){return p("window.unmaximize")},unminimize:function(){return p("window.unminimize")},unsetDraggableRegion:function(e){return new Promise(((t,n)=>{const o=e instanceof Element?e:document.getElementById(e);if(!o)return n({code:"NE_WD_DOMNOTF",message:"Unable to find DOM element"});if(!T.has(o))return n({code:"NE_WD_NOTDRRE",message:"DOM element is not an active draggable region"});const{pointerdown:i,pointerup:r}=T.get(o);o.removeEventListener("pointerdown",i),o.removeEventListener("pointerup",r),o.removeEventListener("pointercancel",r),T.delete(o),t({success:!0,message:"Draggable region was deactivated"})}))}};var F={__proto__:null,broadcast:function(e,t){return p("events.broadcast",{event:e,data:t})},dispatch:r,off:function(e,t){return window.removeEventListener(e,t),Promise.resolve({success:!0,message:"Event listener removed"})},on:i};let x=null;var I={__proto__:null,checkForUpdates:function(e){return new Promise(((n,o)=>t(this,void 0,void 0,(function*(){if(!e)return o({code:"NE_RT_NATRTER",message:"Missing require parameter: url"});try{const t=yield fetch(e);x=JSON.parse(yield t.text()),!function(e){return!!(e.applicationId&&e.applicationId==window.NL_APPID&&e.version&&e.resourcesURL)}(x)?o({code:"NE_UP_CUPDMER",message:"Invalid update manifest or mismatching applicationId"}):n(x)}catch(e){o({code:"NE_UP_CUPDERR",message:"Unable to fetch update manifest"})}}))))},install:function(){return new Promise(((e,n)=>t(this,void 0,void 0,(function*(){if(!x)return n({code:"NE_UP_UPDNOUF",message:"No update manifest loaded"});try{const t=yield fetch(x.resourcesURL),n=yield t.arrayBuffer();yield m(window.NL_PATH+"/resources.neu",n),e({success:!0,message:"Update installed. Restart the process to see updates"})}catch(e){n({code:"NE_UP_UPDINER",message:"Update installation error"})}}))))}};var C={__proto__:null,clear:function(){return p("clipboard.clear")},getFormat:function(){return p("clipboard.getFormat")},readImage:function(){return new Promise(((e,t)=>{p("clipboard.readImage").then((t=>{t&&(t.data=s(t.data)),e(t)})).catch((e=>{t(e)}))}))},readText:function(){return p("clipboard.readText")},writeImage:function(e){const t=Object.assign({},e);return(null==e?void 0:e.data)&&(t.data=a(e.data)),p("clipboard.writeImage",t)},writeText:function(e){return p("clipboard.writeText",{data:e})}};var M={__proto__:null,extractFile:function(e,t){return p("resources.extractFile",{path:e,destination:t})},getFiles:function(){return p("resources.getFiles")},readBinaryFile:function(e){return new Promise(((t,n)=>{p("resources.readBinaryFile",{path:e}).then((e=>{t(s(e))})).catch((e=>{n(e)}))}))},readFile:function(e){return p("resources.readFile",{path:e})}};var R={__proto__:null,getMethods:function(){return p("custom.getMethods")}};let A=!1;return e.app=b,e.clipboard=C,e.computer=y,e.custom=R,e.debug=O,e.events=F,e.extensions=o,e.filesystem=v,e.init=function(e={}){if(e=Object.assign({exportCustomMethods:!0},e),!A){if(f(),window.NL_ARGS.find((e=>"--neu-dev-auto-reload"==e))&&i("neuDev_reloadApp",(()=>t(this,void 0,void 0,(function*(){yield N("Reloading the application..."),location.reload()})))),e.exportCustomMethods&&window.NL_CMETHODS&&window.NL_CMETHODS.length>0)for(const e of window.NL_CMETHODS)Neutralino.custom[e]=(...t)=>{let n={};for(const[e,o]of t.entries())n="object"!=typeof o||Array.isArray(o)||null==o?Object.assign(Object.assign({},n),{["arg"+e]:o}):Object.assign(Object.assign({},n),o);return p("custom."+e,n)};window.NL_CVERSION="5.5.0",window.NL_CCOMMIT="425c526c318342e0e5d0f17caceef2a53049eda4",A=!0}},e.os=_,e.resources=M,e.storage=E,e.updater=I,e.window=S,e}({});
