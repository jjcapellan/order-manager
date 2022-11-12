!function(e,r){"object"==typeof exports&&"undefined"!=typeof module?r(exports):"function"==typeof define&&define.amd?define(["exports"],r):r((e||self).sixdb={})}(this,function(e){var r={init:function(){this.blockRgx=/\(.*?(?=\))/g,this.blockOperatorRgx=/[\&\|]+(?=(\s*\())/g,this.operatorRgx=/(=|>|<|>=|<=|!=|<>|\^|\$|~~)+/g,this.rightOperandRgx=/(?:([=><\^\$~]))\s*["']?[^"']+["']?\s*(?=[&\|])|(?:[=><\^\$~])\s*["']?[^"']+["']?(?=$)/g,this.leftOperandRgx=/([^"'\s])(\w+)(?=\s*[=|>|<|!|\^|\$~])/g},makeConditionsBlocksArray:function(e){var r=this,n=[],o=e.match(r.blockRgx),t=e.match(r.blockOperatorRgx)?e.match(r.blockOperatorRgx):null;if(!o)return r.pushConditionBlockToArray(e,null,n),n;r.deleteLeftParentheses(o),t&&(t="&"==t||"&&"==t?"and":"or");for(var a=0;a<o.length;a++)r.pushConditionBlockToArray(o[a],t,n);return n},deleteLeftParentheses:function(e){for(var r=e.length,n=0;n<r;n++)e[n]=e[n].substr(1)},pushConditionBlockToArray:function(e,r,n){for(var o=this,t=e.match(o.leftOperandRgx),a=e.match(o.rightOperandRgx),c=0;c<a.length;c++){for(;a[c][0].match(/[=><!\^\$~]/g);)a[c]=a[c].substr(1);a[c]=a[c].replace(/["']/g,"").trim()}for(var s=0;s<a.length;s++)e=e.replace(a[s],"");var i=e.match(o.operatorRgx),u=[];if(1==t.length)u.push({keyPath:t[0],cond:i[0],value:a[0]}),n.push({conditionsArray:u,internalLogOperator:null,externalLogOperator:r}),u=null;else{var l=e.match(/[\&\|]+/g)[0];l="&"==l||"&&"==l?"and":"or";for(var d=0;d<i.length;d++)u.push({keyPath:t[d],cond:i[d],value:a[d]});n.push({conditionsArray:u,internalLogOperator:l,externalLogOperator:r}),u=null}},testConditionBlock:function(e,r,n){for(var o="and"==n||!n,t=0;t<r.length;t++){if(o=this.testCondition(e.value[r[t].keyPath],r[t].cond,r[t].value),!("and"!=n&&n||o))return!1;if("or"==n&&o)return!0}return o},testCondition:function(e,r,n){var o;switch(r){case"=":o=e==n;break;case">":o=e>n;break;case"<":o=e<n;break;case">=":o=e>=n;break;case"<=":o=e<=n;break;case"!=":o=e!=n;break;case"<>":if("string"!=typeof e)return!1;o=-1!=e.indexOf(n);break;case"^":if("string"!=typeof e)return!1;o=0==e.indexOf(n);break;case"$":if("string"!=typeof e)return!1;o=e.indexOf(n)==e.length-n.length;break;case"~~":try{o=customOperator(e,n)}catch(e){o=!1}}return o}},n=!0,o=[];function t(){if(0==o.length)return n=!0,void u("No pending tasks");n=!1;var e=o[0];e.type?(u("Custom task"+i.begin),e.fn.apply(e.context,e.args),a()):e.fn.apply(this,e.args)}function a(){o.shift(),t()}function c(){n&&t()}var s,i={begin:"//---------------------------------------\x3e"};function u(e,r){consoleOff&&!r||(r?console.error(e):console.log(e))}var l=r;function d(r,n){s=null;try{s=e.db.transaction(r,n).objectStore(r)}catch(r){P("initStore()",r),u(e.lastErrorObj,!0)}a()}function f(e,r){o.push({args:[e,r],fn:d})}function g(r,n,o,t){var a,c=void 0===t?{}:t,s=c.successCallback,l=c.errorCallback,d="Store.newIndex()";if(u(d+i.begin),e.db.transaction(r).objectStore(r).indexNames.contains(n))return console.log("activated"),void W(null,d,s,'The index "'+n+'" already exists in store "'+r+'"');a=e.db.version,e.db.close();var f=window.indexedDB.open(e.dbName,a+1);f.onupgradeneeded=function(e){E(e.target.result);var t=e.target.transaction;try{t.objectStore(r).createIndex(n,o)}catch(e){return void X(d,e,l)}},f.onsuccess=function(e){W(e,d,s,'Index "'+n+'" created in store "'+r+'"')},f.onerror=function(){X(d,f.error,l)}}function b(e,r){var n=r.successCallback,o=r.errorCallback,t="Store.add()";u(t+i.begin);var a={obj:e,origin:t,successCallback:n,errorCallback:o};Array.isArray(e)?function(e){for(var r=e.obj,n=e.origin,o=e.successCallback,t=e.errorCallback,a=r.length,c=0,i=function(){var e=s.add(r[c]);c++,e.onerror=function(){X(n,e.error,t)}};c<a;)i();W(event,n,o,'New record/s added to store "'+s.name+'"')}(a):function(e){var r=e.origin,n=e.successCallback,o=e.errorCallback,t=s.add(e.obj);t.onsuccess=function(e){W(e,r,n,'New record/s added to store "'+s.name+'"')},t.onerror=function(e){X(r,e.target.error,o)}}(a)}function v(e,r){var n=null,o="Store.getAll()";u(o+i.begin),(n=Z(o,s,r))?(n.onsuccess=function(r){W(r.target.result,o,e,'All records returned from store "'+s.name+'"')},n.onerror=function(){X(o,n.error,r)}):t()}function p(r,n,o){var c="Store.get()";if(u(c+i.begin),ue(r))!function(r,n,o){var c,l="Store.getByKey()";u(l+i.begin),(c=ie(l,s,r,o))?(c.onsuccess=function(o){n(o.target.result,l,r),e.db.close(),u('Records with key "'+r+'" returned from store "'+s.name+'"'),a()},c.onerror=function(){X(l,c.error,o)}):t()}(r,n,o);else{var d=[],f=l.makeConditionsBlocksArray(r),g=f?f[0].externalLogOperator:null;Q({counter:0,source:s.name,extMode:g,event:d,resultFiltered:d,origin:c,query:r,conditionsBlocksArray:f,exitsInFirstTrue:null!=g&&"and"!=g,logFunction:se,cursorFunction:ne,successCallback:n});var b=ee(c,s,o);b?(b.onsuccess=function(e){re(e.target.result)},b.onerror=function(){X(c,b.error,o)}):t()}}function k(r,n,o){var c="Store.del()";if(u(c+i.begin),ue(r))!function(r,n,o){var t="Store.delByKey()";u(t+i.begin);var c=s.delete(r);c.onsuccess=function(o){n(o,t,r),e.db.close(),u('Records with primary key "'+r+'" deleted from store "'+s.name+'"'),a()},c.onerror=function(){X(t,c.error,o)}}(r,n,o);else{var d=null,f=l.makeConditionsBlocksArray(r),g=f?f[0].externalLogOperator:null;Q({counter:0,extMode:g,source:s.name,event:event,origin:c,query:r,conditionsBlocksArray:f,exitsInFirstTrue:null!=g&&"and"!=g,logFunction:se,cursorFunction:oe,successCallback:n}),(d=ee(c,s,o))?(d.onsuccess=function(e){re(e.target.result)},d.onerror=function(){X(c,d.error,o)}):t()}}function y(e,r,n){var o="Store.count()";if(u(o+i.begin),e){var t=l.makeConditionsBlocksArray(e),a=t?t[0].externalLogOperator:null;Q({counter:0,get event(){return this.counter},source:s.name,extMode:a,origin:o,query:e,conditionsBlocksArray:t,exitsInFirstTrue:null!=a&&"and"!=a,logFunction:ce,cursorFunction:te,successCallback:r}),le(s,n)}else!function(e,r){var n="Store.countAll()";u(n+i.begin);var o=s.count();o.onsuccess=function(r){W(r.target.result,n,e,r.target.result+' records in store "'+s.name+'"')},o.onerror=function(){X(n,o.error,r)}}(r,n)}function h(r,n){var o="Store.checkIndex()";u(o+i.begin);var t=s.indexNames.contains(r),c='Index "'+r+'" check result -> '+t;e.db.close(),n(t,o),u(c),a()}function m(r,n,o,t){var a,c="Store.delIndex()";u(c+i.begin),a=e.db.version,e.db.close();var s=window.indexedDB.open(e.dbName,a+1);s.onupgradeneeded=function(e){E(e.target.result);var o=null,a=e.target.transaction;try{o=a.objectStore(r)}catch(e){return void X(c,e,t)}o.deleteIndex(n)},s.onsuccess=function(e){W(e,c,o,'Index "'+n+'" deleted from object store "'+r+'"')},s.onerror=function(){X(c,s.error,t)}}function C(r,n,o,c,d){void 0===o&&(o=D);var f=d.query,g=d.errorCallback,b=void 0===g?D:g;u(c+i.begin);var v={origin:c,property:r,aggregatefn:n,successCallback:o,errorCallback:b};f?function(e,r){var n=r.origin,o=r.property,a=r.aggregatefn,c=r.successCallback,i=r.errorCallback;ue(e)&&(e=s.keyPath+"="+e);var u=l.makeConditionsBlocksArray(e),d=u?u[0].externalLogOperator:null;Q({counter:0,actualValue:null,get event(){return this.actualValue},property:o,aggregatefn:a,extMode:d,origin:n,query:e,conditionsBlocksArray:u,exitsInFirstTrue:null!=d&&"and"!=d,logFunction:H,cursorFunction:_,successCallback:c});var f=ee(n,s,i);f?(f.onsuccess=function(e){re(e.target.result)},f.onerror=function(){X(n,f.error,i)}):t()}(f,v):function(r){var n=r.origin,o=r.property,c=r.aggregatefn,i=r.successCallback,l=r.errorCallback,d=null,f=0,g=ee(n,s,l);g?(g.onsuccess=function(r){var t=r.target.result;t?(t.value[o]&&(f++,d=c(d,t.value[o],f)),t.continue()):(i(d,n),e.db.close(),u("Result of "+n+' on property "'+o+'": '+d),a())},g.onerror=function(){X(n,g.error,l)}):t()}(v)}function x(e,r,n){var o=n.successCallback,t=n.errorCallback,a="Store.update()";u(a+i.begin),ue(e)&&(e=s.keyPath+"="+e);var c=l.makeConditionsBlocksArray(e),d=c?c[0].externalLogOperator:null,f=null!=d&&"and"!=d;Q({counter:0,keys:Object.keys(r),newObjectValuesSize:Object.keys(r).length,extMode:d,source:s.name,objectValues:r,event:event,origin:a,query:e,conditionsBlocksArray:c,exitsInFirstTrue:f,logFunction:se,cursorFunction:ae,successCallback:o}),le(s,t)}function S(e){var r=e.successCallback,n=e.errorCallback,o="Store.clear()";u(o+i.begin);var t=null;try{t=s.clear()}catch(e){return void X(o,t.error,n)}t.onsuccess=function(e){W(e.target.result,o,r,'Store "'+s.name+'" cleared.')},t.onerror=function(e){X(o,t.error,n)}}function O(e,r,n){o.push(V),f(e,r),o.push(n)}var w=function(e){var r=e;this.name=function(){return r}};w.prototype.newIndex=function(e,r,n){var t=void 0===n?{}:n,a=t.unique,c=t.successCallback,s=void 0===c?D:c,i=t.errorCallback,u=void 0===i?D:i,l={args:[this.name(),e,r,{unique:a,successCallback:s,errorCallback:u}],fn:g};o.push(V),o.push(l)},w.prototype.openIndex=function(e){return new T(this.name(),e)},w.prototype.add=function(e,r){var n=void 0===r?{}:r,o=n.successCallback,t=n.errorCallback,a={args:[e,{successCallback:void 0===o?D:o,errorCallback:void 0===t?D:t}],fn:b};O(this.name(),"readwrite",a)},w.prototype.checkIndex=function(e,r){void 0===r&&(r=D);var n={args:[e,r],fn:h};O(this.name(),"readwrite",n)},w.prototype.getAll=function(e,r){void 0===e&&(e=D),void 0===r&&(r=D);var n={args:[e,r],fn:v};O(this.name(),"readonly",n)},w.prototype.get=function(e,r,n){void 0===r&&(r=D),void 0===n&&(n=D);var o={args:[e,r,n],fn:p};O(this.name(),"readonly",o)},w.prototype.del=function(e,r){var n=void 0===r?{}:r,o=n.successCallback,t=n.errorCallback,a={args:[e,void 0===o?D:o,void 0===t?D:t],fn:k};O(this.name(),"readwrite",a)},w.prototype.count=function(e,r){var n=void 0===r?{}:r,o=n.errorCallback,t={args:[n.query,e,void 0===o?D:o],fn:y};O(this.name(),"readonly",t)},w.prototype.delIndex=function(e,r){var n=void 0===r?{}:r,t=n.successCallback,a=void 0===t?D:t,c=n.errorCallback,s=void 0===c?D:c,i={args:[this.name(),e,a,s],fn:m};o.push(V),o.push(i)},w.prototype.aggregateFn=function(e,r,n,t){void 0===n&&(n=D);var a,c=void 0===t?{}:t,s=c.errorCallback,i={property:e,successCallback:n,aggregatefn:r,origin:"Store.aggregateFn()",query:c.query,errorCallback:void 0===s?D:s};o.push(V),f(this.name(),"readonly"),o.push({args:[(a=i).property,a.aggregatefn,a.successCallback,a.origin,{query:a.query,errorCallback:a.errorCallback}],fn:C})},w.prototype.update=function(e,r,n){var o=void 0===n?{}:n,t=o.successCallback,a=o.errorCallback,c={args:[e,r,{successCallback:void 0===t?D:t,errorCallback:void 0===a?D:a}],fn:x};O(this.name(),"readwrite",c)},w.prototype.clear=function(e){var r=e.successCallback,n=e.errorCallback,o={args:[{successCallback:void 0===r?D:r,errorCallback:void 0===n?D:n}],fn:S};O(this.name(),"readwrite",o)};var A=null,j=r;function B(r,n,o){A=null;try{var t=e.db.transaction(r,o).objectStore(r);A=t.index(n)}catch(r){P("initIndex()",r),u(e.lastErrorObj,!0)}a()}function F(e,r,n){o.push({args:[e,r,n],fn:B})}function N(e,r){var n="Index.getAll()";u(n+i.begin);var o=Z(n,A,r);o?(o.onsuccess=function(r){W(r.target.result,n,e,'All records returned from index "'+A.name+'"')},o.onerror=function(){X(n,o.error,r)}):t()}function I(r,n,o){var c="Index.get()";if(u(c+i.begin),ue(r))!function(r,n,o){var c="Index.getByKey()";u(c+i.begin);var s=ie(c,A,r,o);s?(s.onsuccess=function(o){n(o.target.result,c,r),e.db.close(),u('Records with key "'+r+'" returned from index "'+A.name+'"'),a()},s.onerror=function(){X(c,s.error,o)}):t()}(r,n,o);else{var s=[],l=j.makeConditionsBlocksArray(r),d=l?l[0].externalLogOperator:null;Q({counter:0,source:A.name,extMode:d,event:s,resultFiltered:s,origin:c,query:r,conditionsBlocksArray:l,exitsInFirstTrue:null!=d&&"and"!=d,logFunction:se,cursorFunction:ne,successCallback:n});var f=ee(c,A,o);f?(f.onsuccess=function(e){re(e.target.result)},f.onerror=function(){X(c,f.error,o)}):t()}}function q(e,r,n){var o="Index.count()";if(u(o+i.begin),e){var t=j.makeConditionsBlocksArray(e),a=t?t[0].externalLogOperator:null;Q({counter:0,get event(){return this.counter},source:A.name,extMode:a,origin:o,query:e,conditionsBlocksArray:t,exitsInFirstTrue:null!=a&&"and"!=a,logFunction:ce,cursorFunction:te,successCallback:r}),le(A,n)}else!function(e,r){var n="Index.countAll()";u(n+i.begin);var o=A.count();o.onsuccess=function(r){W(r.target.result,n,e,r.target.result+' records in index "'+A.name+'"')},o.onerror=function(){X(n,o.error,r)}}(r,n)}function L(r,n,o,c,s){void 0===o&&(o=D);var l=s.query,d=s.errorCallback,f=void 0===d?D:d;u(c+i.begin);var g={origin:c,property:r,aggregatefn:n,successCallback:o,errorCallback:f};l?function(e,r){var n=r.origin,o=r.property,a=r.aggregatefn,c=r.successCallback,s=r.errorCallback;ue(e)&&(e=A.keyPath+"="+e);var i=j.makeConditionsBlocksArray(e),u=i?i[0].externalLogOperator:null;Q({counter:0,actualValue:null,get event(){return this.actualValue},property:o,aggregatefn:a,extMode:u,origin:n,query:e,conditionsBlocksArray:i,exitsInFirstTrue:null!=u&&"and"!=u,logFunction:H,cursorFunction:_,successCallback:c});var l=ee(n,A,s);l?(l.onsuccess=function(e){re(e.target.result)},l.onerror=function(){X(n,l.error,s)}):t()}(l,g):function(r){var n=r.origin,o=r.property,c=r.aggregatefn,s=r.successCallback,i=r.errorCallback,l=null,d=0,f=ee(n,A,i);f?(f.onsuccess=function(r){var t=r.target.result;t?(t.value[o]&&(d++,l=c(l,t.value[o],d)),t.continue()):(s(l,n),e.db.close(),u("Result of "+n+' on property "'+o+'": '+l),a())},f.onerror=function(){X(n,f.error,i)}):t()}(g)}function R(e,r,n){o.push(V),F(e,r,"readonly"),o.push(n)}var T=function(e,r){var n=r,o=e;this.name=function(){return n},this.storeName=function(){return o}};function P(r,n){var o={};return n&&(o.type=n.name,o.origin=r,o.description=n.message),e.lastErrorObj=o,!0}T.prototype.getAll=function(e,r){void 0===e&&(e=D),void 0===r&&(r=D);var n={args:[e,r],fn:N};R(this.storeName(),this.name(),n)},T.prototype.get=function(e,r,n){void 0===r&&(r=D),void 0===n&&(n=D);var o={args:[e,r,n],fn:I};R(this.storeName(),this.name(),o)},T.prototype.count=function(e,r){void 0===e&&(e=D);var n=void 0===r?{}:r,o=n.errorCallback,t={args:[n.query,e,void 0===o?D:o],fn:q};R(this.storeName(),this.name(),t)},T.prototype.aggregateFn=function(e,r,n,t){void 0===n&&(n=D);var a,c=void 0===t?{}:t,s={property:e,successCallback:n,aggregatefn:r,origin:"Index.aggregateFn()",query:c.query,errorCallback:c.errorCallback};o.push(V),F(this.storeName(),this.name(),"readonly"),o.push({args:[(a=s).property,a.aggregatefn,a.successCallback,a.origin,{query:a.query,errorCallback:a.errorCallback}],fn:L})},e.lastErrorObj={},e.db=null,e.dbName=void 0;var D=function(){return 0},V={args:null,fn:function(){var r=window.indexedDB.open(e.dbName);r.onerror=function(){alert("Error. You must allow web app to use indexedDB.")},r.onsuccess=function(r){e.db=r.target.result,a()}}};function E(r){e.db=r}function M(r,n){var o="Sixdb.checkStore()";u(o+i.begin);var t=e.db.objectStoreNames.contains(r);e.db.close(),n(t,o),a()}function $(r,n){var o,t=void 0===n?{}:n,c=t.keyPath,s=t.autoIncrement,l=t.successCallback,d=t.errorCallback,f="Sixdb.newStore()";if(u(f+i.begin),e.db.objectStoreNames.contains(r))return e.db.close(),u('Object store "'+r+'" already exists'),void a();o=e.db.version,e.db.close();var g,b=window.indexedDB.open(e.dbName,o+1);b.onupgradeneeded=function(n){e.db=n.target.result;try{g=e.db.createObjectStore(r,{keyPath:c,autoIncrement:s})}catch(e){return void X(f,e,d)}g.onerror=function(e){X(f,e.target.error,d)}},b.onsuccess=function(e){W(e,f,l,'New object store "'+r+'" created')}}function K(r,n){var o=n.successCallback,t=n.errorCallback,a="Sixdb.delStore()";u(a+i.begin);var c=e.db.version;e.db.close();var s=window.indexedDB.open(e.dbName,c+1);s.onupgradeneeded=function(n){e.db=n.target.result,e.db.deleteObjectStore(r)},s.onsuccess=function(e){W(e,a,o,'Object store "'+r+'" deleted')},s.onerror=function(){X(a,s.error,t)}}function G(r){var n=r.successCallback,o=r.errorCallback,t="Sixdb.destroy()";u(t+i.begin);var c=window.indexedDB.deleteDatabase(e.dbName);c.onerror=function(){X(t,c.error,o)},c.onsuccess=function(r){n(r,t),u('Database "'+e.dbName+'" deleted'),a()}}function z(r){var n=r.store1Name,o=r.store2Name,t=r.indexName,a=[],c=[],s=[],l="getJoin()";u(l+i.begin);var d,f,g,b=e.db.transaction([n,o]),v=0,p=0,k=b.objectStore(n),y=k.keyPath;function h(){c[v][y]==s[p][d]?(a.push(Object.assign(s[p],c[v])),p++):v++,v==f||p==g?W(a,l,successCallback,"Join operation completed"):h()}k.getAll().onsuccess=function(e){f=(c=e.target.result).length;var r=b.objectStore(o).index(t);r.getAll().onsuccess=function(e){g=(s=e.target.result).length,console.log(g),d=r.keyPath,h()}}}window.Sixdb=function(n){e.dbName=n,r.init(),o.push({args:[void 0],fn:function(r){var n=window.indexedDB.open(e.dbName);u("Sixdb.newDB()"+i.begin);var o=!1;n.onupgradeneeded=function(){o=!0},n.onsuccess=function(r){r.target.result.close(),u(o?'Database "'+e.dbName+'" created':'Database "'+e.dbName+'" already exists'),a()}}}),c()},Sixdb.prototype.name=function(){return e.dbName},Sixdb.prototype.setConsoleOff=function(e){consoleOff=e},Sixdb.prototype.customTask=function(e,r,n){var t=[];if(n)for(var a=2,c=arguments.length;a<c;a++)t[2-a]=arguments[a];var s={type:"custom",fn:e,context:r,args:t};o.push(s)},Sixdb.prototype.aggregateFuncs={sum:function(e,r){return e+r},avg:function(e,r,n){return(e*(n-1)+r)/n},max:function(e,r){return r>e?r:e},min:function(e,r,n){return 1==n&&(e=r),r<e&&n>1?r:e}},Sixdb.prototype.setCustomOperator=function(e){e&&"function"==typeof e&&2==e.length&&(customOperator=e)},Sixdb.prototype.execTasks=function(){c()},Sixdb.prototype.checkStore=function(e,r){void 0===r&&(r=D);var n={args:[e,r],fn:M};o.push(V),o.push(n)},Sixdb.prototype.newStore=function(e,r){var n=void 0===r?{}:r,t=n.successCallback,a=n.errorCallback,c={args:[e,{keyPath:n.keyPath,autoIncrement:n.autoIncrement,successCallback:void 0===t?D:t,errorCallback:void 0===a?D:a}],fn:$};o.push(V),o.push(c)},Sixdb.prototype.openStore=function(e){return new w(e)},Sixdb.prototype.delStore=function(e,r){var n=void 0===r?{}:r,t=n.successCallback,a=n.errorCallback,c={args:[e,{successCallback:void 0===t?D:t,errorCallback:void 0===a?D:a}],fn:K};o.push(V),o.push(c)},Sixdb.prototype.destroy=function(e){var r=void 0===e?{}:e,n=r.successCallback,t=r.errorCallback;o.push({args:[{successCallback:void 0===n?D:n,errorCallback:void 0===t?D:t}],fn:G})},Sixdb.prototype.join=function(e){var r=e.succesCallback,n=e.errorCallback,t={args:[{store1Name:e.store1Name,store2Name:e.store2Name,indexName:e.indexName,succesCallback:void 0===r?D:r,errorCallback:void 0===n?D:n}],fn:z};o.push(V),o.push(t)};var J=r,U={};function Y(r,n,t){P(r,n),o.shift(),e.db.close(),t(e.lastErrorObj),u(e.lastErrorObj,!0)}function _(e){e.value[U.property]&&(U.counter++,U.actualValue=U.aggregatefn(U.actualValue,e.value[U.property],U.counter))}function H(){u("Result of "+U.origin+' on property "'+U.property+'": '+U.actualValue)}function Q(e){U=e}function W(r,n,o,t){o(r,n),e.db.close(),u(t),a()}function X(r,n,a){e.db.close(),P(r,n),u(e.lastErrorObj,!0),o.shift(),a(e.lastErrorObj),t()}function Z(e,r,n){var o=null;try{o=r.getAll()}catch(r){return Y(e,r,n),null}return o}function ee(e,r,n){var o=null;try{o=r.openCursor()}catch(r){return Y(e,r,n),null}return o}function re(r){if(r){var n=function(e,r,n){var o=!1,t=0,a=e.length;for(t=0;t<a&&(o=J.testConditionBlock(n,e[t].conditionsArray,e[t].internalLogOperator))!=r;t++);return o}(U.conditionsBlocksArray,U.exitsInFirstTrue,r);n&&U.cursorFunction(r),r.continue()}else U.successCallback(U.event,U.origin,U.query),e.db.close(),U.logFunction(),a()}function ne(e){U.resultFiltered.push(e.value),U.counter++}function oe(e){e.delete(),U.counter++}function te(){U.counter++}function ae(e){for(var r=e.value,n=0,o=U.newObjectValuesSize;n<o;n++)r[U.keys[n]]="function"==typeof U.objectValues[U.keys[n]]?U.objectValues[U.keys[n]](r[U.keys[n]]):U.objectValues[U.keys[n]];e.update(r),U.counter++}function ce(){u('Processed query finished: "'+U.query+'"\n '+U.counter+' records counted from the query to: "'+U.source+'"')}function se(){u('Processed query: "'+U.query+'" finished\n '+U.counter+' records returned from object store "'+U.source+'"')}function ie(e,r,n,o){var t=null;try{t=r.getAll(n)}catch(r){return Y(e,r,o),null}return t}function ue(e){var r=!1;return e&&(r="number"==typeof e||!e.match(J.operatorRgx)),r}function le(e,r){var n=ee(U.origin,e,r);n?(n.onsuccess=function(e){re(e.target.result)},n.onerror=function(){X(origin,n.error,r)}):t()}window.consoleOff=!1,window.customOperator=function(e,r){return e==r},e.Index=T,e.Store=w,e._qrySys=r,e.aggregateLog=H,e.checkTasks=t,e.countLog=ce,e.cursorAggregate=_,e.cursorCount=te,e.cursorDelRecords=oe,e.cursorGetRecords=ne,e.cursorLoop=re,e.cursorUpdate=ae,e.done=a,e.execTasks=c,e.initCursorLoop=le,e.isKey=ue,e.logEnum=i,e.logger=u,e.makeErrorObject=P,e.queryLog=se,e.requestErrorAction=X,e.requestSuccessAction=W,e.setDb=E,e.setSharedObj=Q,e.tasks=o,e.tkOpen=V,e.tryGetAll=Z,e.tryGetByKey=ie,e.tryOpenCursor=ee,e.voidFn=D});