!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports):"function"==typeof define&&define.amd?define(["exports"],n):n((e=e||self).LDClient={})}(this,function(e){"use strict";function Q(e){return(Q="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function n(n,e){var t=Object.keys(n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(n);e&&(r=r.filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})),t.push.apply(t,r)}return t}function Y(o){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?n(i,!0).forEach(function(e){var n,t,r;n=o,r=i[t=e],t in n?Object.defineProperty(n,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):n[t]=r}):Object.getOwnPropertyDescriptors?Object.defineProperties(o,Object.getOwnPropertyDescriptors(i)):n(i).forEach(function(e){Object.defineProperty(o,e,Object.getOwnPropertyDescriptor(i,e))})}return o}function t(e){function n(e,n){Error.captureStackTrace&&Error.captureStackTrace(this,this.constructor),this.message=e,this.code=n}return(n.prototype=new Error).name=e,n.prototype.constructor=n}var Z=t("LaunchDarklyUnexpectedResponseError"),ee=t("LaunchDarklyInvalidEnvironmentIdError"),a=t("LaunchDarklyInvalidUserError"),ne=t("LaunchDarklyInvalidEventKeyError"),v=t("LaunchDarklyInvalidArgumentError"),te=t("LaunchDarklyFlagFetchError");function re(e){return!(400<=e&&e<500)||400===e||408===e||429===e}for(var s=Object.freeze({__proto__:null,LDUnexpectedResponseError:Z,LDInvalidEnvironmentIdError:ee,LDInvalidUserError:a,LDInvalidEventKeyError:ne,LDInvalidArgumentError:v,LDFlagFetchError:te,isHttpErrorRecoverable:re}),r=function(e){for(var n,t=e.length,r=t%3,o=[],i=0,a=t-r;i<a;i+=16383)o.push(f(e,i,a<i+16383?a:i+16383));return 1==r?(n=e[t-1],o.push(u[n>>2]+u[n<<4&63]+"==")):2==r&&(n=(e[t-2]<<8)+e[t-1],o.push(u[n>>10]+u[n>>4&63]+u[n<<2&63]+"=")),o.join("")},u=[],o=[],i="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",c=0,l=i.length;c<l;++c)u[c]=i[c],o[i.charCodeAt(c)]=c;function f(e,n,t){for(var r,o,i=[],a=n;a<t;a+=3)r=(e[a]<<16&16711680)+(e[a+1]<<8&65280)+(255&e[a+2]),i.push(u[(o=r)>>18&63]+u[o>>12&63]+u[o>>6&63]+u[63&o]);return i.join("")}o["-".charCodeAt(0)]=62,o["_".charCodeAt(0)]=63;var g=Array.isArray,p=Object.keys,m=Object.prototype.hasOwnProperty,d=["key","secondary","ip","country","email","firstName","lastName","avatar","name"];function h(e){var n=unescape(encodeURIComponent(e));return r(function(e){for(var n=[],t=0;t<e.length;t++)n.push(e.charCodeAt(t));return n}(n))}function D(e){return h(e).replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_")}function oe(e){return JSON.parse(JSON.stringify(e))}function ie(e,n){return function e(n,t){if(n===t)return!0;if(n&&t&&"object"==typeof n&&"object"==typeof t){var r,o,i,a=g(n),u=g(t);if(a&&u){if((o=n.length)!=t.length)return!1;for(r=o;0!=r--;)if(!e(n[r],t[r]))return!1;return!0}if(a!=u)return!1;var s=n instanceof Date,c=t instanceof Date;if(s!=c)return!1;if(s&&c)return n.getTime()==t.getTime();var l=n instanceof RegExp,f=t instanceof RegExp;if(l!=f)return!1;if(l&&f)return n.toString()==t.toString();var d=p(n);if((o=d.length)!==p(t).length)return!1;for(r=o;0!=r--;)if(!m.call(t,d[r]))return!1;for(r=o;0!=r--;)if(!e(n[i=d[r]],t[i]))return!1;return!0}return n!=n&&t!=t}(e,n)}function ae(e){setTimeout(e,0)}function ue(e,n){var t=e.then(function(e){return n&&setTimeout(function(){n(null,e)},0),e},function(e){if(!n)return Promise.reject(e);setTimeout(function(){n(e,null)},0)});return n?void 0:t}function y(e){var n={};for(var t in e)le(e,t)&&(n[t]={value:e[t],version:0});return n}function se(e){var n={};for(var t in e)le(e,t)&&(n[t]=e[t].value);return n}function w(e,n){for(var t,r=n.slice(0),o=[],i=e;0<r.length;){for(t=[];0<i;){var a=r.shift();if(!a)break;(i-=D(JSON.stringify(a)).length)<0&&0<t.length?r.unshift(a):t.push(a)}i=e,o.push(t)}return o}function b(e){var n=e.version||"3.3.1";return e.userAgent+"/"+n}function O(e,n){if(n&&!n.sendLDHeaders)return{};var t={"X-LaunchDarkly-User-Agent":b(e)};return n&&n.wrapperName&&(t["X-LaunchDarkly-Wrapper"]=n.wrapperVersion?n.wrapperName+"/"+n.wrapperVersion:n.wrapperName),t}function ce(){for(var e=arguments.length,n=new Array(e),t=0;t<e;t++)n[t]=arguments[t];return n.reduce(function(e,n){return Y({},e,{},n)},{})}function le(e,n){return Object.prototype.hasOwnProperty.call(e,n)}function fe(e){if(!e)return e;var n;for(var t in d){var r=d[t],o=e[r];void 0!==o&&"string"!=typeof o&&((n=n||Y({},e))[r]=String(o))}return n||e}Object.freeze({__proto__:null,btoa:h,base64URLEncode:D,clone:oe,deepEquals:ie,onNextTick:ae,wrapPromiseCallback:ue,transformValuesToVersionedValues:y,transformVersionedValuesToValues:se,chunkUserEventsForUrl:w,getLDUserAgentString:b,getLDHeaders:O,extend:ce,objectHasOwnProperty:le,sanitizeUser:fe});for(var k,E=(k=void 0,function(e){var n="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof window.msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto);if(n){var t=new Uint8Array(16);e.exports=function(){return n(t),t}}else{var r=new Array(16);e.exports=function(){for(var e,n=0;n<16;n++)0==(3&n)&&(e=4294967296*Math.random()),r[n]=e>>>((3&n)<<3)&255;return r}}}(k={exports:{}}),k.exports),S=[],P=0;P<256;++P)S[P]=(P+256).toString(16).substr(1);var U,j,R=0,I=0,T=function(e,n,t){var r=n&&t||0,o=n||[],i=(e=e||{}).node||U,a=void 0!==e.clockseq?e.clockseq:j;if(null==i||null==a){var u=E();null==i&&(i=U=[1|u[0],u[1],u[2],u[3],u[4],u[5]]),null==a&&(a=j=16383&(u[6]<<8|u[7]))}var s=void 0!==e.msecs?e.msecs:(new Date).getTime(),c=void 0!==e.nsecs?e.nsecs:I+1,l=s-R+(c-I)/1e4;if(l<0&&void 0===e.clockseq&&(a=a+1&16383),(l<0||R<s)&&void 0===e.nsecs&&(c=0),1e4<=c)throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");R=s,j=a;var f=(1e4*(268435455&(s+=122192928e5))+(I=c))%4294967296;o[r++]=f>>>24&255,o[r++]=f>>>16&255,o[r++]=f>>>8&255,o[r++]=255&f;var d=s/4294967296*1e4&268435455;o[r++]=d>>>8&255,o[r++]=255&d,o[r++]=d>>>24&15|16,o[r++]=d>>>16&255,o[r++]=a>>>8|128,o[r++]=255&a;for(var v=0;v<6;++v)o[r+v]=i[v];return n||function(e,n){var t=n||0,r=S;return[r[e[t++]],r[e[t++]],r[e[t++]],r[e[t++]],"-",r[e[t++]],r[e[t++]],"-",r[e[t++]],r[e[t++]],"-",r[e[t++]],r[e[t++]],"-",r[e[t++]],r[e[t++]],r[e[t++]],r[e[t++]],r[e[t++]],r[e[t++]]].join("")}(o)};function de(u,e,n){var t="/a/"+e+".gif",s=ce({"Content-Type":"application/json"},O(u,n)),c=u.httpFallbackPing,l={sendChunk:function(e,r,o,n){var i=JSON.stringify(e),a=o?null:T();return n?function n(t){var e=o?s:ce({},s,{"X-LaunchDarkly-Event-Schema":"3","X-LaunchDarkly-Payload-ID":a});return u.httpRequest("POST",r,e,i).promise.then(function(e){if(e)return 400<=e.status&&re(e.status)&&t?n(!1):function(e){var n={status:e.status},t=e.header("date");if(t){var r=Date.parse(t);r&&(n.serverTime=r)}return n}(e)}).catch(function(){return t?n(!1):Promise.reject()})}(!0).catch(function(){}):(c&&c(r+t+"?d="+D(i)),Promise.resolve())},sendEvents:function(e,n,t){if(!u.httpRequest)return Promise.resolve();var r,o=u.httpAllowsPost();r=o?[e]:w(2e3-n.length,e);for(var i=[],a=0;a<r.length;a++)i.push(l.sendChunk(r[a],n,t,o));return Promise.all(i)}};return l}function ve(e){var n={},s=e.allAttributesPrivate,c=e.privateAttributeNames||[],l={key:!0,custom:!0,anonymous:!0},f={key:!0,secondary:!0,ip:!0,country:!0,email:!0,firstName:!0,lastName:!0,avatar:!0,name:!0,anonymous:!0,custom:!0};return n.filterUser=function(e){if(!e)return null;function n(o,i){return Object.keys(o).reduce(function(e,n){var t,r=e;return i(n)&&(l[t=n]||!s&&-1===a.indexOf(t)&&-1===c.indexOf(t)?r[0][n]=o[n]:r[1][n]=!0),r},[{},{}])}var a=e.privateAttributeNames||[],t=n(e,function(e){return f[e]}),r=t[0],o=t[1];if(e.custom){var i=n(e.custom,function(){return!0});r.custom=i[0],o=ce({},o,i[1])}var u=Object.keys(o);return u.length&&(u.sort(),r.privateAttrs=u),r},n}function N(e){return e&&e.message?e.message:"string"==typeof e||e instanceof String?e:JSON.stringify(e)}var L=" Please see https://docs.launchdarkly.com/docs/js-sdk-reference#initializing-the-client for instructions on SDK initialization.",F=function(e){return'Expected application/json content type but got "'+e+'"'},x=function(e){return"network error"+(e?" ("+e+")":"")},ge=function(e){return'Custom event "'+e+'" does not exist'},C=function(){return"Environment not found. Double check that you specified a valid environment/client-side ID."+L},pe=function(){return"No environment/client-side ID was specified."+L},me=function(e){return"Error fetching flag settings: "+N(e)},A=function(){return"No user specified."+L},q=function(){return"Invalid user specified."+L},he=function(){return"LaunchDarkly client was initialized with bootstrap data that did not include flag metadata. Events may not be sent correctly."+L},_=function(e,n){return n?'"'+e+'" is deprecated, please use "'+n+'"':'"'+e+'" is deprecated'},ye=function(e,n,t){return"Received error "+e+(401===e?" (invalid SDK key)":"")+" for "+n+" - "+(re(e)?t:"giving up permanently")},V=function(){return"Cannot make HTTP requests in this environment."+L},J=function(e){return"Opening stream connection to "+e},z=function(e,n){return"Error on stream connection: "+N(e)+", will continue retrying every "+n+" milliseconds."},M=function(e){return'Ignoring unknown config option "'+e+'"'},K=function(e,n,t){return'Config option "'+e+'" should be of type '+n+", got "+t+", using default value"},$=function(e,n){return'Config option "'+e+'" should be a boolean, got '+n+", converting to boolean"},H=function(e,n,t){return'Config option "'+e+'" was set to '+n+", changing to minimum value of "+t},B=function(e){return"polling for feature flags at "+e},we=function(e){return'received streaming update for flag "'+e+'"'},be=function(e){return'received streaming update for flag "'+e+'" but ignored due to version check'},ke=function(e){return'received streaming deletion for flag "'+e+'"'},Ee=function(e){return'received streaming deletion for flag "'+e+'" but ignored due to version check'},Se=function(e){return'enqueueing "'+e+'" event'},De=function(e){return"sending "+e+" events"},G=Object.freeze({__proto__:null,clientInitialized:function(){return"LaunchDarkly client initialized"},clientNotReady:function(){return"LaunchDarkly client is not ready"},eventCapacityExceeded:function(){return"Exceeded event queue capacity. Increase capacity to avoid dropping events."},eventWithoutUser:function(){return"Be sure to call `identify` in the LaunchDarkly client: https://docs.launchdarkly.com/docs/js-sdk-reference#section-analytics-events"},invalidContentType:F,invalidKey:function(){return"Event key must be a string"},localStorageUnavailable:function(){return"localStorage is unavailable"},localStorageUnavailableForUserId:function(){return"localStorage is unavailable, so anonymous user ID cannot be cached"},networkError:x,unknownCustomEventKey:ge,environmentNotFound:C,environmentNotSpecified:pe,errorFetchingFlags:me,userNotSpecified:A,invalidUser:q,bootstrapOldFormat:he,bootstrapInvalid:function(){return"LaunchDarkly bootstrap data is not available because the back end could not read the flags."},deprecated:_,httpErrorMessage:ye,httpUnavailable:V,identifyDisabled:function(){return"identify() has no effect here; it must be called on the main client instance"},streamClosing:function(){return"Closing stream connection"},streamConnecting:J,streamError:z,unknownOption:M,wrongOptionType:K,wrongOptionTypeBoolean:$,optionBelowMinimum:H,debugPolling:B,debugStreamPing:function(){return"received ping message from stream"},debugStreamPut:function(){return"received streaming update for all flags"},debugStreamPatch:we,debugStreamPatchIgnored:be,debugStreamDelete:ke,debugStreamDeleteIgnored:Ee,debugEnqueueingEvent:Se,debugPostingEvents:De,debugPostingDiagnosticEvent:function(e){return"sending diagnostic event ("+e.kind+")"}});var Oe=function(r){var n=!1,t=!1,o=null,e=null,i=new Promise(function(n){r.on("ready",function e(){r.off("ready",e),n()})}).catch(function(){});return{getInitializationPromise:function(){return e||(n?Promise.resolve():t?Promise.reject(o):e=new Promise(function(n,t){r.on("initialized",function e(){r.off("initialized",e),n()}),r.on("failed",function e(n){r.off("failed",e),t(n)})}))},getReadyPromise:function(){return i},signalSuccess:function(){n||t||(n=!0,r.emit("initialized"),r.emit("ready"))},signalFailure:function(e){n||t||(t=!0,o=e,r.emit("failed",e),r.emit("ready")),r.maybeReportError(e)}}};function Pe(t,r,o,i,a){var u={};function s(){var e="",n=i.getUser();return n&&(e=o||h(JSON.stringify(n))),"ld:"+r+":"+e}return u.loadFlags=function(){return t.get(s()).then(function(e){if(null==e)return null;try{var n=JSON.parse(e);if(n){var t=n.$schema;void 0===t||t<1?n=y(n):delete n.$schema}return n}catch(e){return u.clearFlags().then(function(){return Promise.reject(e)})}}).catch(function(e){return a.warn("localStorage is unavailable"),Promise.reject(e)})},u.saveFlags=function(e){var n=ce({},e,{$schema:1});return t.set(s(),JSON.stringify(n)).catch(function(e){return a.warn("localStorage is unavailable"),Promise.reject(e)})},u.clearFlags=function(){return t.clear(s()).catch(function(e){return a.warn("localStorage is unavailable"),Promise.reject(e)})},u}function Ue(o,e,i,n){var a,u=e.streamUrl,s=e.logger,t={},c=u+"/eval/"+i,l=e.useReport,f=e.evaluationReasons,r=e.streamReconnectDelay,d=O(o,e),v=!1,g=null,p=null,m=null,h=null,y=null;function w(e){v||(s.warn(z(e,r)),v=!0),S(!1),E(),b(r)}function b(e){p||(e?p=setTimeout(k,e):k())}function k(){var e;p=null;var n="",t={headers:d,readTimeoutMillis:3e5};if(o.eventSourceFactory){for(var r in null!=h&&(n="h="+h),l?o.eventSourceAllowsReport?(e=c,t.method="REPORT",t.headers["Content-Type"]="application/json",t.body=JSON.stringify(m)):(e=u+"/ping/"+i,n=""):e=c+"/"+D(JSON.stringify(m)),f&&(n=n+(n?"&":"")+"withReasons=true"),e=e+(n?"?":"")+n,E(),s.info(J(e)),a=(new Date).getTime(),g=o.eventSourceFactory(e,t),y)le(y,r)&&g.addEventListener(r,y[r]);g.onerror=w}}function E(){g&&(s.info("Closing stream connection"),g.close(),g=null)}function S(e){a&&n&&n.recordStreamInit(a,!e,(new Date).getTime()-a),a=null}return t.connect=function(e,n,t){m=e,h=n,y={};function r(n){y[n]=function(e){S(!(v=!1)),t[n]&&t[n](e)}}for(var o in t||{})r(o);b()},t.disconnect=function(){clearTimeout(p),p=null,E()},t.isConnected=function(){return!!(g&&o.eventSourceIsActive&&o.eventSourceIsActive(g))},t}function je(v,g,a){var u=g.baseUrl,s=g.useReport,c=g.evaluationReasons,l=g.logger,e={},p={};function f(e,n){if(!v.httpRequest)return new Promise(function(e,n){n(new te(V()))});var t=n?"REPORT":"GET",r=O(v,g);n&&(r["Content-Type"]="application/json");var o,i,a,u,s,c,l=p[e];l||(o=function(){delete p[e]},(c={addPromise:function(n,e){i=n,a&&a(),a=e,n.then(function(e){i===n&&(u(e),o())},function(e){i===n&&(s(e),o())})}}).resultPromise=new Promise(function(e,n){u=e,s=n}),l=c,p[e]=l);var f=v.httpRequest(t,e,r,n),d=f.promise.then(function(e){if(200!==e.status)return Promise.reject(404===(n=e).status?new ee(C()):new te(me(n.statusText||String(n.status))));if(e.header("content-type")&&"application/json"===e.header("content-type").substring(0,"application/json".length))return JSON.parse(e.body);var n,t=F(e.header("content-type")||"");return Promise.reject(new te(t))},function(e){return Promise.reject(new te(x(e)))});return l.addPromise(d,function(){f.cancel&&f.cancel()}),l.resultPromise}return e.fetchJSON=function(e){return f(u+e,null)},e.fetchFlagSettings=function(e,n){var t,r,o,i="";return s?(r=[u,"/sdk/evalx/",a,"/user"].join(""),o=JSON.stringify(e)):(t=D(JSON.stringify(e)),r=[u,"/sdk/evalx/",a,"/users/",t].join("")),n&&(i="h="+n),c&&(i=i+(i?"&":"")+"withReasons=true"),r=r+(i?"?":"")+i,l.debug(B(r)),f(r,o)},e}function Re(o,i){var e={};return e.validateUser=function(e){if(!e)return Promise.reject(new a(A()));var r=oe(e);return null!==r.key&&void 0!==r.key?(r.key=r.key.toString(),Promise.resolve(r)):r.anonymous?(o?o.get("ld:$anonUserId").catch(function(){return null}):Promise.resolve(null)).then(function(e){if(e)return r.key=e,r;var n,t=T();return r.key=t,(n=t,o?o.set("ld:$anonUserId",n).catch(function(){i.warn("localStorage is unavailable, so anonymous user ID cannot be cached")}):Promise.resolve()).then(function(){return r})}):Promise.reject(new a(q()))},e}var X={baseUrl:{default:"https://app.launchdarkly.com"},streamUrl:{default:"https://clientstream.launchdarkly.com"},eventsUrl:{default:"https://events.launchdarkly.com"},sendEvents:{default:!0},streaming:{type:"boolean"},sendLDHeaders:{default:!0},inlineUsersInEvents:{default:!1},allowFrequentDuplicateEvents:{default:!1},sendEventsOnlyForVariation:{default:!1},useReport:{default:!1},evaluationReasons:{default:!1},eventCapacity:{default:100,minimum:1},flushInterval:{default:2e3,minimum:2e3},samplingInterval:{default:0,minimum:0},streamReconnectDelay:{default:1e3,minimum:0},allAttributesPrivate:{default:!1},privateAttributeNames:{default:[]},bootstrap:{type:"string|object"},diagnosticRecordingInterval:{default:9e5,minimum:2e3},diagnosticOptOut:{default:!1},wrapperName:{type:"string"},wrapperVersion:{type:"string"},stateProvider:{type:"object"},autoAliasingOptOut:{default:!1}};function Ie(e,n,t,r){var a=ce({logger:{default:r}},X,t),o={all_attributes_private:"allAttributesPrivate",private_attribute_names:"privateAttributeNames",samplingInterval:null};function u(e){ae(function(){n&&n.maybeReportError(new v(e))})}var s,c,i,l,f=ce({},e||{});return l=f,Object.keys(o).forEach(function(e){if(void 0!==l[e]){var n=o[e];r&&r.warn(_(e,n)),n&&(void 0===l[n]&&(l[n]=l[e]),delete l[e])}}),i=ce({},f),Object.keys(a).forEach(function(e){void 0!==i[e]&&null!==i[e]||(i[e]=a[e]&&a[e].default)}),s=f=i,c=ce({},s),Object.keys(s).forEach(function(e){var n=s[e];if(null!=n){var t=a[e];if(void 0===t)u(M(e));else{var r=t.type||d(t.default);if("any"!==r){var o=r.split("|"),i=d(n);o.indexOf(i)<0?"boolean"===r?(c[e]=!!n,u($(e,i))):(u(K(e,r,i)),c[e]=t.default):"number"===i&&void 0!==t.minimum&&n<t.minimum&&(u(H(e,n,t.minimum)),c[e]=t.minimum)}}}}),c;function d(e){if(null===e)return"any";if(void 0!==e){if(Array.isArray(e))return"array";var n=Q(e);return"boolean"===n||"string"===n||"number"===n||"function"===n?n:"object"}}}var W=Object.freeze({__proto__:null,baseOptionDefs:X,validate:Ie}).baseOptionDefs,Te=function(e){var n={diagnosticId:T()};return e&&(n.sdkKeySuffix=6<e.length?e.substring(e.length-6):e),n},Ne=function(e){var n,t,r,o;function i(e){n=e,r=t=0,o=[]}return i(e),{getProps:function(){return{dataSinceDate:n,droppedEvents:t,eventsInLastBatch:r,streamInits:o}},setProps:function(e){n=e.dataSinceDate,t=e.droppedEvents||0,r=e.eventsInLastBatch||0,o=e.streamInits||[]},incrementDroppedEvents:function(){t++},setEventsInLastBatch:function(e){r=e},recordStreamInit:function(e,n,t){var r={timestamp:e,failed:n,durationMillis:t};o.push(r)},reset:i}},Le=function(r,e,n,t,o,i){var a,u,s=!!r.diagnosticUseCombinedEvent,c="ld:"+t+":$diagnostics",l=o.eventsUrl+"/events/diagnostic/"+t,f=o.diagnosticRecordingInterval,d=e,v=!!o.streaming,g={};function p(){return{sdk:function(){var e=Y({},r.diagnosticSdkData);return o.wrapperName&&(e.wrapperName=o.wrapperName),o.wrapperVersion&&(e.wrapperVersion=o.wrapperVersion),e}(),configuration:(e={customBaseURI:o.baseUrl!==W.baseUrl.default,customStreamURI:o.streamUrl!==W.streamUrl.default,customEventsURI:o.eventsUrl!==W.eventsUrl.default,eventsCapacity:o.eventCapacity,eventsFlushIntervalMillis:o.flushInterval,reconnectTimeMillis:o.streamReconnectDelay,streamingDisabled:!v,allAttributesPrivate:!!o.allAttributesPrivate,inlineUsersInEvents:!!o.inlineUsersInEvents,diagnosticRecordingIntervalMillis:o.diagnosticRecordingInterval,usingSecureMode:!!o.hash,bootstrapMode:!!o.bootstrap,fetchGoalsDisabled:!o.fetchGoals,allowFrequentDuplicateEvents:!!o.allowFrequentDuplicateEvents,sendEventsOnlyForVariation:!!o.sendEventsOnlyForVariation,autoAliasingOptOut:!!o.autoAliasingOptOut},e),platform:r.diagnosticPlatformData};var e}function m(e){o.logger&&o.logger.debug(G.debugPostingDiagnosticEvent(e)),n.sendEvents(e,l,!0).then(function(){}).catch(function(){})}function h(){var e,n;m((e=(new Date).getTime(),n=Y({kind:s?"diagnostic-combined":"diagnostic",id:i,creationDate:e},d.getProps()),s&&(n=Y({},n,{},p())),d.reset(e),n)),u=setTimeout(h,f),a=(new Date).getTime(),s&&function(){if(r.localStorage){var e=Y({},d.getProps());r.localStorage.set(c,JSON.stringify(e),function(){})}}()}return g.start=function(){s?function(t){if(!r.localStorage)return t(!1);r.localStorage.get(c).then(function(e){if(e)try{var n=JSON.parse(e);d.setProps(n),a=n.dataSinceDate}catch(e){}t(!0)}).catch(function(){t(!1)})}(function(e){if(e){var n=(a||0)+f,t=(new Date).getTime();n<=t?h():u=setTimeout(h,n-t)}else 0===Math.floor(4*Math.random())?h():u=setTimeout(h,f)}):(m(Y({kind:"diagnostic-init",id:i,creationDate:d.getProps().dataSinceDate},p())),u=setTimeout(h,f))},g.stop=function(){u&&clearTimeout(u)},g.setStreaming=function(e){v=e},g};function Fe(e,n){var i,a=["debug","info","warn","error"];i=null!=n?""===n?"":n+" ":"LD: ";var u=0;e&&(u="none"===e?100:a.indexOf(e));var t={};function r(e,n,t){if(u<=e&&console){var r=console[n];if(r){var o=e<a.length?a[e]:"?";r.call(console,i+"["+o+"] "+t)}}}return t.debug=function(e){return r(0,"log",e)},t.info=function(e){return r(1,"info",e)},t.warn=function(e){return r(2,"warn",e)},t.error=function(e){return r(3,"error",e)},t}function xe(e,n,t,i,r){var a,o,u,s,c,l,f=t&&t.logger?t.logger:r&&r.logger&&r.logger.default||Fe("warn"),d=function(n){var e={},o={};return e.on=function(e,n,t){o[e]=o[e]||[],o[e]=o[e].concat({handler:n,context:t})},e.off=function(e,n,t){if(o[e])for(var r=0;r<o[e].length;r++)o[e][r].handler===n&&o[e][r].context===t&&(o[e]=o[e].slice(0,r).concat(o[e].slice(r+1)))},e.emit=function(e){if(o[e])for(var n=o[e].slice(0),t=0;t<n.length;t++)n[t].handler.apply(n[t].context,Array.prototype.slice.call(arguments,1))},e.getEvents=function(){return Object.keys(o)},e.getEventListenerCount=function(e){return o[e]?o[e].length:0},e.maybeReportError=function(e){e&&(o.error?this.emit("error",e):(n||console).error(e.message))},e}(f),v=Oe(d),g=Ie(t,d,r,f),p=g.sendEvents,m=e,h=g.hash,y=de(i,m,g),w=g.sendEvents&&!g.diagnosticOptOut,b=w?Te(m):null,k=w?Ne((new Date).getTime()):null,E=w?Le(i,k,y,m,g,b):null,S=Ue(i,g,m,k),D=g.eventProcessor||function(e,n,t,r,o,i){var a,u=3<arguments.length&&void 0!==r?r:null,s=4<arguments.length&&void 0!==o?o:null,c={},l=(5<arguments.length&&void 0!==i?i:null)||de(e,t,n),f=n.eventsUrl+"/events/bulk/"+t,d=function(){var e={},a=0,u=0,s={};return e.summarizeEvent=function(e){if("feature"===e.kind){var n=e.key+":"+(null!==e.variation&&void 0!==e.variation?e.variation:"")+":"+(null!==e.version&&void 0!==e.version?e.version:""),t=s[n];t?t.count=t.count+1:s[n]={count:1,key:e.key,variation:e.variation,version:e.version,value:e.value,default:e.default},(0===a||e.creationDate<a)&&(a=e.creationDate),e.creationDate>u&&(u=e.creationDate)}},e.getSummary=function(){var e={},n=!0;for(var t in s){var r=s[t],o=e[r.key];o||(o={default:r.default,counters:[]},e[r.key]=o);var i={value:r.value,count:r.count};void 0!==r.variation&&null!==r.variation&&(i.variation=r.variation),r.version?i.version=r.version:i.unknown=!0,o.counters.push(i),n=!1}return n?null:{startDate:a,endDate:u,features:e}},e.clearSummary=function(){u=a=0,s={}},e}(),v=ve(n),g=n.inlineUsersInEvents,p=n.samplingInterval,m=n.eventCapacity,h=n.flushInterval,y=n.logger,w=[],b=0,k=!1,E=!1;function S(){return 0===p||0===Math.floor(Math.random()*p)}function D(e){w.length<m?(w.push(e),E=!1):(E||(E=!0,y.warn("Exceeded event queue capacity. Increase capacity to avoid dropping events.")),u&&u.incrementDroppedEvents())}return c.enqueue=function(e){if(!k){var n=!1,t=!1;if(d.summarizeEvent(e),"feature"===e.kind?S()&&(n=!!e.trackEvents,t=function(e){return!!e.debugEventsUntilDate&&e.debugEventsUntilDate>b&&e.debugEventsUntilDate>(new Date).getTime()}(e)):n=S(),n&&D(function(e){var n=ce({},e);return"alias"===e.kind||(g||"identify"===e.kind?n.user=v.filterUser(e.user):(n.userKey=e.user.key,delete n.user),"feature"===e.kind&&(delete n.trackEvents,delete n.debugEventsUntilDate)),n}(e)),t){var r=ce({},e,{kind:"debug"});delete r.trackEvents,delete r.debugEventsUntilDate,delete r.variation,D(r)}}},c.flush=function(){if(k)return Promise.resolve();var e=w,n=d.getSummary();return d.clearSummary(),n&&(n.kind="summary",e.push(n)),u&&u.setEventsInLastBatch(e.length),0===e.length?Promise.resolve():(w=[],y.debug(De(e.length)),l.sendEvents(e,f).then(function(e){e&&(e.serverTime&&(b=e.serverTime),re(e.status)||(k=!0),400<=e.status&&ae(function(){s.maybeReportError(new Z(ye(e.status,"event posting","some events were dropped")))}))}))},c.start=function(){a=setTimeout(function e(){c.flush(),a=setTimeout(e,h)},h)},c.stop=function(){clearTimeout(a)},c}(i,g,m,k,d,y),O=je(i,g,m),P={},U={},j=g.streaming,R=!1,I=!1,T=!0,N=g.stateProvider,L=(c=function(e,n){var t;t=e,N||t&&x({kind:"identify",key:t.key,user:t,creationDate:(new Date).getTime()}),!g.autoAliasingOptOut&&n&&n.anonymous&&e&&!e.anonymous&&V(e,n)},{setUser:function(e){var n=l&&oe(l);(l=fe(e))&&c&&c(oe(l),n)},getUser:function(){return l?oe(l):null}}),F=Re(i.localStorage,f);function x(e){if(m&&!(N&&N.enqueueEvent&&N.enqueueEvent(e))){if("alias"!==e.kind){if(!e.user)return void(T&&(f.warn("Be sure to call `identify` in the LaunchDarkly client: https://docs.launchdarkly.com/docs/js-sdk-reference#section-analytics-events"),T=!1));T=!1}!p||I||i.isDoNotTrack()||(f.debug(Se(e.kind)),D.enqueue(e))}}function C(e,n,t,r){var o=L.getUser(),i=new Date,a=n?n.value:null;if(!g.allowFrequentDuplicateEvents){var u=JSON.stringify(a)+(o&&o.key?o.key:"")+e,s=P[u];if(s&&i-s<3e5)return;P[u]=i}var c={kind:"feature",key:e,user:o,value:a,variation:n?n.variationIndex:null,default:t,creationDate:i.getTime()};o&&o.anonymous&&(c.contextKind=_(o));var l=U[e];l&&(c.version=l.flagVersion?l.flagVersion:l.version,c.trackEvents=l.trackEvents,c.debugEventsUntilDate=l.debugEventsUntilDate),(r||l&&l.trackReason)&&n&&(c.reason=n.reason),x(c)}function A(e,n,t,r){var o;if(U&&le(U,e)&&U[e]&&!U[e].deleted){var i=U[e];o=q(i),null!==i.value&&void 0!==i.value||(o.value=n)}else o={value:n,variationIndex:null,reason:{kind:"ERROR",errorKind:"FLAG_NOT_FOUND"}};return t&&C(e,o,n,r),o}function q(e){return{value:e.value,variationIndex:void 0===e.variation?null:e.variation,reason:e.reason||null}}function _(e){return e.anonymous?"anonymousUser":"user"}function V(e,n){N||e&&n&&x({kind:"alias",key:e.key,contextKind:_(e),previousKey:n.key,previousContextKind:_(n),creationDate:(new Date).getTime()})}function J(){o=!0,L.getUser()&&S.connect(L.getUser(),h,{ping:function(){f.debug("received ping message from stream");var n=L.getUser();O.fetchFlagSettings(n,h).then(function(e){ie(n,L.getUser())&&M(e||{})}).catch(function(e){d.maybeReportError(new te(me(e)))})},put:function(e){var n=JSON.parse(e.data);f.debug("received streaming update for all flags"),M(n)},patch:function(e){var n=JSON.parse(e.data),t=U[n.key];if(!t||!t.version||!n.version||t.version<n.version){f.debug(we(n.key));var r={},o=ce({},n);delete o.key;var i=q(U[n.key]=o);r[n.key]=t?{previous:t.value,current:i}:{current:i},K(r)}else f.debug(be(n.key))},delete:function(e){var n=JSON.parse(e.data);if(!U[n.key]||U[n.key].version<n.version){f.debug(ke(n.key));var t={};U[n.key]&&!U[n.key].deleted&&(t[n.key]={previous:U[n.key].value}),U[n.key]={version:n.version,deleted:!0},K(t)}else f.debug(Ee(n.key))}})}function z(){o&&(S.disconnect(),o=!1)}function M(e){var n={};if(!e)return Promise.resolve();for(var t in U)le(U,t)&&U[t]&&(e[t]&&!ie(e[t].value,U[t].value)?n[t]={previous:U[t].value,current:q(e[t])}:e[t]&&!e[t].deleted||(n[t]={previous:U[t].value}));for(var r in e)le(e,r)&&e[r]&&(!U[r]||U[r].deleted)&&(n[r]={current:q(e[r])});return U=Y({},e),K(n).catch(function(){})}function K(o){var e=Object.keys(o);if(0<e.length){var i={};e.forEach(function(e){var n=o[e].current,t=n?n.value:void 0,r=o[e].previous;d.emit("change:"+e,t,r),i[e]=n?{current:t,previous:r}:{previous:r}}),d.emit("change",i),d.emit("internal-change",U),g.sendEventsOnlyForVariation||N||e.forEach(function(e){C(e,o[e].current)})}return a&&s?s.saveFlags(U).catch(function(){return null}):Promise.resolve()}function $(){var e=j||u&&void 0===j;e&&!o?J():!e&&o&&z(),E&&E.setStreaming(e)}function H(e){return"change"===e||"change:"===e.substr(0,"change".length+1)}if(i.localStorage&&(s=new Pe(i.localStorage,m,h,L,f)),"string"==typeof g.bootstrap&&"LOCALSTORAGE"===g.bootstrap.toUpperCase()&&(s?a=!0:f.warn("localStorage is unavailable")),"object"===Q(g.bootstrap)&&(U=function(t){var e=Object.keys(t),r=t.$flagsState;!r&&e.length&&f.warn(he()),!1===t.$valid&&f.warn("LaunchDarkly bootstrap data is not available because the back end could not read the flags.");var o={};return e.forEach(function(e){if("$flagsState"!==e&&"$valid"!==e){var n={value:t[e]};r&&r[e]?n=ce(n,r[e]):n.version=0,o[e]=n}}),o}(g.bootstrap)),N){var B=N.getInitialState();B?G(B):N.on("init",G),N.on("update",function(e){e.user&&L.setUser(e.user),e.flags&&M(e.flags)})}else(e?F.validateUser(n).then(function(e){return L.setUser(e),"object"===Q(g.bootstrap)?X():a?s.loadFlags().catch(function(){return null}).then(function(e){return null==e?(U={},O.fetchFlagSettings(L.getUser(),h).then(function(e){return M(e||{})}).then(X).catch(function(e){W(new te(me(e)))})):(U=e,ae(X),O.fetchFlagSettings(L.getUser(),h).then(function(e){return M(e)}).catch(function(e){return d.maybeReportError(e)}))}):O.fetchFlagSettings(L.getUser(),h).then(function(e){U=e||{},X()}).catch(function(e){U={},W(e)})}):Promise.reject(new ee(pe()))).catch(W);function G(e){m=e.environment,L.setUser(e.user),U=Y({},e.flags),ae(X)}function X(){f.info("LaunchDarkly client initialized"),R=!0,$(),v.signalSuccess()}function W(e){v.signalFailure(e)}return{client:{waitForInitialization:function(){return v.getInitializationPromise()},waitUntilReady:function(){return v.getReadyPromise()},identify:function(e,r,n){return I?ue(Promise.resolve({}),n):N?(f.warn("identify() has no effect here; it must be called on the main client instance"),ue(Promise.resolve(se(U)),n)):ue((a&&s?s.clearFlags():Promise.resolve()).then(function(){return F.validateUser(e)}).then(function(t){return O.fetchFlagSettings(t,r).then(function(e){var n=se(e);return L.setUser(t),h=r,e?M(e).then(function(){return n}):n})}).then(function(e){return o&&J(),e}).catch(function(e){return d.maybeReportError(e),Promise.reject(e)}),n)},getUser:function(){return L.getUser()},variation:function(e,n){return A(e,n,!0,!1).value},variationDetail:function(e,n){return A(e,n,!0,!0)},track:function(e,n,t){if("string"==typeof e){i.customEventFilter&&!i.customEventFilter(e)&&f.warn(ge(e));var r=L.getUser(),o={kind:"custom",key:e,user:r,url:i.getCurrentUrl(),creationDate:(new Date).getTime()};r&&r.anonymous&&(o.contextKind=_(r)),null!=n&&(o.data=n),null!=t&&(o.metricValue=t),x(o)}else d.maybeReportError(new ne(ge(e)))},alias:V,on:function(e,n,t){H(e)?(u=!0,R&&$(),d.on(e,n,t)):d.on.apply(d,arguments)},off:function(e){if(d.off.apply(d,arguments),H(e)){var n=!1;d.getEvents().forEach(function(e){H(e)&&0<d.getEventListenerCount(e)&&(n=!0)}),n||(u=!1,o&&void 0===j&&z())}},setStreaming:function(e){var n=null===e?void 0:e;n!==j&&(j=n,$())},flush:function(e){return ue(p?D.flush():Promise.resolve(),e)},allFlags:function(){var e={};if(!U)return e;for(var n in U)le(U,n)&&(e[n]=A(n,null,!g.sendEventsOnlyForVariation).value);return e},close:function(e){if(I)return ue(Promise.resolve(),e);function n(){I=!0,U={}}return ue(Promise.resolve().then(function(){if(z(),E&&E.stop(),p)return D.stop(),D.flush()}).then(n).catch(n),e)}},options:g,emitter:d,ident:L,logger:f,requestor:O,start:function(){p&&(E&&E.start(),D.start())},enqueueEvent:x,getFlagsInternal:function(){return U},getEnvironmentId:function(){return m},internalChangeEventName:"internal-change"}}function Ce(n,e){var t=Object.keys(n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(n);e&&(r=r.filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})),t.push.apply(t,r)}return t}function Ae(o){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?Ce(Object(i),!0).forEach(function(e){var n,t,r;n=o,r=i[t=e],t in n?Object.defineProperty(n,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):n[t]=r}):Object.getOwnPropertyDescriptors?Object.defineProperties(o,Object.getOwnPropertyDescriptors(i)):Ce(Object(i)).forEach(function(e){Object.defineProperty(o,e,Object.getOwnPropertyDescriptor(i,e))})}return o}var qe={promise:Promise.resolve({status:200,header:function(){return null},body:null})};function _e(e,n,t,r,o){if(o&&!function(){var e=window.navigator&&window.navigator.userAgent;if(e){var n=e.match(/Chrom(e|ium)\/([0-9]+)\./);if(n)return parseInt(n[2],10)<73}return!0}())return qe;var i=new window.XMLHttpRequest;for(var a in i.open(e,n,!o),t||{})Object.prototype.hasOwnProperty.call(t,a)&&i.setRequestHeader(a,t[a]);if(o)return i.send(r),qe;var u;return{promise:new Promise(function(e,n){i.addEventListener("load",function(){u||e({status:i.status,header:function(e){return i.getResponseHeader(e)},body:i.responseText})}),i.addEventListener("error",function(){u||n(new Error)}),i.send(r)}),cancel:function(){u=!0,i.abort()}}}var Ve=/[|\\{}()[\]^$+*?.]/g,Je=function(e){if("string"!=typeof e)throw new TypeError("Expected a string");return e.replace(Ve,"\\$&")};function ze(e,n,t,r){var o,i,a=(("substring"===e.kind||"regex"===e.kind)&&r.includes("/")?n:n.replace(r,"")).replace(t,"");switch(e.kind){case"exact":i=n,o=new RegExp("^"+Je(e.url)+"/?$");break;case"canonical":i=a,o=new RegExp("^"+Je(e.url)+"/?$");break;case"substring":i=a,o=new RegExp(".*"+Je(e.substring)+".*$");break;case"regex":i=a,o=new RegExp(e.pattern);break;default:return!1}return o.test(i)}function Me(e,r){for(var n={},t=null,o=[],i=0;i<e.length;i++)for(var a=e[i],u=a.urls||[],s=0;s<u.length;s++)if(ze(u[s],window.location.href,window.location.search,window.location.hash)){"pageview"===a.kind?r("pageview",a):(o.push(a),r("click_pageview",a));break}return 0<o.length&&(t=function(e){for(var n=function(e,n){for(var t=[],r=0;r<n.length;r++)for(var o=e.target,i=n[r],a=i.selector,u=document.querySelectorAll(a);o&&0<u.length;){for(var s=0;s<u.length;s++)o===u[s]&&t.push(i);o=o.parentNode}return t}(e,o),t=0;t<n.length;t++)r("click",n[t])},document.addEventListener("click",t)),n.dispose=function(){document.removeEventListener("click",t)},n}var Ke=300;function $e(o,n){var t,r,e={};function i(){r&&r.dispose(),t&&t.length&&(r=Me(t,a))}function a(e,n){var t=o.ident.getUser(),r={kind:e,key:n.key,data:null,url:window.location.href,user:t,creationDate:(new Date).getTime()};return t&&t.anonymous&&(r.contextKind="anonymousUser"),"click"===e&&(r.selector=n.selector),o.enqueueEvent(r)}function u(e,n){var t,r=window.location.href;function o(){(t=window.location.href)!==r&&(r=t,n())}!function e(n,t){n(),setTimeout(function(){e(n,t)},t)}(o,e),window.history&&window.history.pushState?window.addEventListener("popstate",o):window.addEventListener("hashchange",o)}return e.goalKeyExists=function(e){if(!t)return!0;for(var n=0;n<t.length;n++)if("custom"===t[n].kind&&t[n].key===e)return!0;return!1},o.requestor.fetchJSON("/sdk/goals/"+o.getEnvironmentId()).then(function(e){e&&0<e.length&&(r=Me(t=e,a),u(Ke,i)),n()}).catch(function(e){o.emitter.maybeReportError(new s.LDUnexpectedResponseError((e&&e.message,e.message))),n()}),e}var He="goalsReady",Be={fetchGoals:{default:!0},hash:{type:"string"},eventProcessor:{type:"object"},eventUrlTransformer:{type:"function"},disableSyncEventPost:{default:!1}};function Ge(e,n){var t=2<arguments.length&&void 0!==arguments[2]?arguments[2]:{},r=function(e){var n,i={synchronousFlush:!1};if(window.XMLHttpRequest){var a=e&&e.disableSyncEventPost;i.httpRequest=function(e,n,t,r){var o=i.synchronousFlush&!a;return i.synchronousFlush=!1,_e(e,n,t,r,o)}}i.httpAllowsPost=function(){return void 0===n&&(n=!!window.XMLHttpRequest&&"withCredentials"in new window.XMLHttpRequest),n},i.httpFallbackPing=function(e){(new window.Image).src=e};var r,t=e&&e.eventUrlTransformer;i.getCurrentUrl=function(){return t?t(window.location.href):window.location.href},i.isDoNotTrack=function(){var e;return 1===(e=window.navigator&&void 0!==window.navigator.doNotTrack?window.navigator.doNotTrack:window.navigator&&void 0!==window.navigator.msDoNotTrack?window.navigator.msDoNotTrack:window.doNotTrack)||!0===e||"1"===e||"yes"===e};try{window.localStorage&&(i.localStorage={get:function(n){return new Promise(function(e){e(window.localStorage.getItem(n))})},set:function(n,t){return new Promise(function(e){window.localStorage.setItem(n,t),e()})},clear:function(n){return new Promise(function(e){window.localStorage.removeItem(n),e()})}})}catch(e){i.localStorage=null}var o=e&&e.useReport;if(r=o&&"function"==typeof window.EventSourcePolyfill&&window.EventSourcePolyfill.supportedOptions&&window.EventSourcePolyfill.supportedOptions.method?(i.eventSourceAllowsReport=!0,window.EventSourcePolyfill):(i.eventSourceAllowsReport=!1,window.EventSource),window.EventSource){i.eventSourceFactory=function(e,n){var t=Ae(Ae({},{heartbeatTimeout:3e5,silentTimeout:3e5,skipDefaultHeaders:!0}),n);return new r(e,t)},i.eventSourceIsActive=function(e){return e.readyState===window.EventSource.OPEN||e.readyState===window.EventSource.CONNECTING}}return i.userAgent="JSClient",i.version="2.19.1",i.diagnosticSdkData={name:"js-client-sdk",version:"2.19.1"},i.diagnosticPlatformData={name:"JS"},i.diagnosticUseCombinedEvent=!0,i}(t),o=xe(e,n,t,r,Be),i=o.client,a=o.options,u=o.emitter,s=new Promise(function(e){var n=u.on(He,function(){u.off(He,n),e()})});if(i.waitUntilGoalsReady=function(){return s},a.fetchGoals){var c=$e(o,function(){return u.emit(He)});r.customEventFilter=c.goalKeyExists}else u.emit(He);"complete"!==document.readyState?window.addEventListener("load",o.start):o.start();function l(){r.synchronousFlush=!0,i.flush().catch(function(){}),r.synchronousFlush=!1}return window.addEventListener("beforeunload",l),window.addEventListener("unload",l),i}var Xe=Fe;var We={initialize:function(e,n){var t=2<arguments.length&&void 0!==arguments[2]?arguments[2]:{};return console&&console.warn&&console.warn(G.deprecated("default export","named LDClient export")),Ge(e,n,t)},version:"2.19.1"};e.createConsoleLogger=Xe,e.default=We,e.initialize=Ge,e.version="2.19.1",Object.defineProperty(e,"__esModule",{value:!0})});
//# sourceMappingURL=ldclient.min.js.map