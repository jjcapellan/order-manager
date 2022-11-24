const e="es"==navigator.language.substring(0,2)?{CLIENTS:"CLIENTES",PRODUCTS:"PRODUCTOS",ORDERS:"PEDIDOS",NEW_CLIENT:"NUEVO CLIENTE",NEW_PRODUCT:"NUEVO PRODUCTO",NEW_ORDER:"NUEVO PEDIDO",EDIT_PRODUCT:"MODIFICAR PRODUCTO",EDIT_CLIENT:"MODIFICAR CLIENTE",EDIT_ORDER:"MODIFICAR PEDIDO",VIEW_ORDER:"VISTA PEDIDO",Image:"Imagen",Zero_to_remove_product:"Cero borra este producto"}:{CLIENTS:"CLIENTS",PRODUCTS:"PRODUCTS",ORDERS:"ORDERS",NEW_CLIENT:"NEW CLIENT",NEW_PRODUCT:"NEW PRODUCT",NEW_ORDER:"NEW ORDER",EDIT_PRODUCT:"EDIT PRODUCT",EDIT_CLIENT:"EDIT_CLIENT",EDIT_ORDER:"EDIT ORDER",VIEW_ORDER:"VIEW_ORDER",Image:"Image",Zero_to_remove_product:"Zero removes this product"},t=document.getElementById("bt-select-client"),n=document.getElementById("bt-select-product"),r=(document.getElementById("form-order"),document.getElementById("change-orders-title")),o=document.getElementById("table-orders"),c=document.getElementById("popup-qty"),d=document.getElementById("screen-form-order"),l=document.getElementById("bt-submit-order"),i=document.getElementById("table-details"),s=document.getElementById("tb-qty"),a={date:null,client:null,details:[]};let u=null;function m(){T()}function b(e){let t=document.createElement("tr");a.details.push({productId:e.id,name:e.name,qty:"0"});let n=`<td>${e.name}</td><td>0</td>`;t.innerHTML=n,i.appendChild(t)}function E(e){t.style.display="none",a.client={id:e.id,name:e.name};let n=`<tr><th colspan="2">${e.name}</th></tr>`;i.innerHTML=n}function g(e){t.style.display="none",a.date=e.date,E(e.client),a.details=e.details;for(let t=0;t<e.details.length;t++){let n=document.createElement("tr"),r=`<td>${e.details[t].name}</td><td>${e.details[t].qty}</td>`;n.innerHTML=r,i.appendChild(n)}d.setAttribute("data-active","true")}function T(){orderIndex.getAll((e=>{let t="";for(let n=0;n<e.length;n++)t+=`<tr><td data-id="${e[n].id}">${e[n].date}</td><td>${e[n].client.name}</td></tr>`;o.innerHTML=t})),db.execTasks()}function w(){a.date=null,a.client=null,a.details=[],u=null,d.setAttribute("data-active",""),d.setAttribute("data-row",""),i.innerHTML="",t.style.display="block",n.style.display="block",l.style.display="initial",i.style.pointerEvents="auto"}function p(){const e=o.getAttribute("data-row");if(""==e)return;o.rows[e].className="",o.setAttribute("data-row","")}const I=document.getElementById("table-clients"),f=document.getElementById("form-client"),h=document.getElementById("change-clients-title"),A=document.getElementById("screen-form-order"),y=document.getElementById("screen-form-client");function v(){N()}function R(t){t.preventDefault();const n=function(e){const t=y.getAttribute("data-id"),n=e.elements[0].value,r=e.elements[1].value;return{id:t,name:n,tel:r}}(f);h.innerHTML==e.NEW_CLIENT?function(e){clientStore.add({name:e.name,tel:e.tel})}(n):function(e){clientStore.update(+e.id,{name:e.name,tel:e.tel})}(n),db.customTask((()=>{f.reset(),k()})),db.execTasks(),N(),scrollToAnchor("clients")}function D(){const e=I.getAttribute("data-row");if(""==e)return null;const t=I.rows[e];return{id:t.children[0].getAttribute("data-id"),name:t.children[0].innerText,tel:t.children[1].innerText}}function N(){clientIndex.getAll((e=>{let t="";for(let n=0;n<e.length;n++)t+=`<tr><td data-id="${e[n].id}">${e[n].name}</td><td>${e[n].tel}</td></tr>`;I.innerHTML=t})),db.execTasks()}function L(e){y.setAttribute("data-id",e)}function k(){const e=I.getAttribute("data-row");if(""==e)return;I.rows[e].className="",I.setAttribute("data-row","")}async function O(e,t,n,r){let o=await createImageBitmap(e);const c=document.createElement("canvas"),d=t/o.width,l=n/o.height;let i=l<d?l:d;c.width=o.width*i,c.height=o.height*i;const s=c.getContext("2d");s.scale(i,i),s.drawImage(o,0,0),c.toBlob(r,"image/jpeg",.92)}const S=document.getElementById("table-products"),x=document.getElementById("form-product"),B=document.getElementById("change-products-title"),C=(document.getElementById("screen-form-product"),document.getElementById("screen-form-order")),_=document.getElementById("product-thumbnail"),P=document.getElementById("product-img"),M=document.getElementById("photo-title"),U={name:null,price:null,imgblob:null};let H=null;function W(){F()}function $(t){var n;t.preventDefault(),B.innerHTML==e.NEW_PRODUCT?(n=U,productStore.add({name:n.name,price:n.price,imgblob:n.imgblob})):function(e){productStore.update(+H,{name:e.name,price:e.price,imgblob:e.imgblob})}(U),db.customTask((()=>{Z(),G()}),window,null),db.execTasks(),F(),scrollToAnchor("products")}async function V(e){const t=e.target.files[0];if(!t)return;O(t,window.innerWidth*devicePixelRatio,window.innerHeight*devicePixelRatio,(e=>{U.imgblob=e;let t=URL.createObjectURL(e);_.setAttribute("src",t)}))}function q(){U.name=x.elements[0].value}function j(){U.price=x.elements[1].value}function F(){productIndex.getAll((e=>{let t="";for(let n=0;n<e.length;n++)t+=`<tr><td data-id="${e[n].id}">${e[n].name}</td><td>${e[n].price}</td></tr>`;S.innerHTML=t})),db.execTasks()}function Z(){U.name=null,U.price=null,U.imgblob=null,H=null,x.reset(),_.setAttribute("src","")}function z(){const e=S.getAttribute("data-row");if(""==e)return null;const t=S.rows[e].children[0].getAttribute("data-id");H=t,productStore.get(+t,(e=>{U.name=e[0].name,U.price=e[0].price,U.imgblob=e[0].imgblob}))}function G(){const e=S.getAttribute("data-row");if(""==e)return;S.rows[e].className="",S.setAttribute("data-row","")}const J={"":()=>{},"bt-clients":()=>{scrollToAnchor("clients")},"bt-orders":()=>{scrollToAnchor("orders")},"bt-products":()=>{scrollToAnchor("products")},"bt-add-client":function(){L(""),console.log(h),h.innerHTML=e.NEW_CLIENT,scrollToAnchor("screen-form-client")},"bt-cancel-client":function(){f.reset(),scrollToAnchor("clients")},"bt-clients-back":function(){scrollToAnchor("menu"),k()},"bt-del-client":function(){const e=I.getAttribute("data-row");if(""==e)return void alert("No client selected");const t=I.rows[e],n=t.children[0].getAttribute("data-id");I.setAttribute("data-row",""),t.className="",clientStore.del(+n),db.execTasks(),t.remove()},"bt-edit-client":function(){const t=D();t?(L(t.id),h.innerHTML=e.EDIT_CLIENT,function(e){f.elements[0].value=e.name,f.elements[1].value=e.tel}(t),scrollToAnchor("screen-form-client")):alert("No client selected")},"table-clients":function(e){const t=e.target.parentElement;let n=t.rowIndex,r=I.getAttribute("data-row");""==r?(t.className="tr-selected",I.setAttribute("data-row",n)):r!=n?(I.rows[r].className="",t.className="tr-selected",I.setAttribute("data-row",n)):r==n&&(t.className="",I.setAttribute("data-row","")),""!=A.getAttribute("data-active")&&(E(D()),scrollToAnchor("screen-form-order"),k())},"bt-add-product":function(){Z(),B.innerHTML=e.NEW_PRODUCT,scrollToAnchor("screen-form-product")},"bt-cancel-product-view":function(){P.setAttribute("src",""),G(),scrollToAnchor("products")},"bt-cancel-product":function(){Z(),scrollToAnchor("products")},"bt-del-product":function(){const e=function(e){const t=S.getAttribute("data-row");if(""==t)return null;const n=S.rows[t],r=n.children[0].getAttribute("data-id");n.className="",S.setAttribute("data-row",""),e&&n.remove();return r}(!0);e?(productStore.del(+e),db.execTasks()):alert("No product selected")},"bt-edit-product":function(){z(),db.customTask((()=>{B.innerHTML=e.EDIT_PRODUCT,function(e){if(x.elements[0].value=e.name,x.elements[1].value=e.price,!e.imgblob)return;let t=URL.createObjectURL(e.imgblob);_.setAttribute("src",t)}(U),G()}),this,null),db.execTasks(),scrollToAnchor("screen-form-product")},"bt-products-back":function(){scrollToAnchor("menu"),G()},"bt-view-product":function(){z(),db.customTask((()=>{let e="assets/images/nophoto.png";M.innerHTML=U.name,U.imgblob&&(e=URL.createObjectURL(U.imgblob)),P.setAttribute("src",e)}),this,null),db.execTasks(),scrollToAnchor("product-view")},"table-products":function(e){const t=e.target.parentElement;let n=t.rowIndex,r=S.getAttribute("data-row");""==r?(t.className="tr-selected",S.setAttribute("data-row",n)):r!=n?(S.rows[r].className="",t.className="tr-selected",S.setAttribute("data-row",n)):r==n&&(t.className="",S.setAttribute("data-row","")),""!=C.getAttribute("data-active")&&(z(),db.customTask(b,window,U),db.customTask((()=>{scrollToAnchor("screen-form-order"),G()}),window,null),db.execTasks())},"bt-select-client":function(){d.setAttribute("data-active","true"),scrollToAnchor("clients")},"bt-add-order":function(){!function(){let e=new Date;a.date=e.toISOString().substring(0,10)}(),r.innerHTML=e.NEW_ORDER,scrollToAnchor("screen-form-order"),p()},"bt-cancel-order":function(){scrollToAnchor("orders"),w()},"bt-del-order":function(){const e=o.getAttribute("data-row");if(""==e)return void alert("No order selected");const t=o.rows[e],n=t.children[0].getAttribute("data-id");o.setAttribute("data-row",""),t.className="",orderStore.del(+n),db.execTasks(),t.remove()},"bt-edit-order":function(){let t=o.getAttribute("data-row");if(""==t)return void alert("No order selected");let n=o.rows[+t].children[0].getAttribute("data-id");u=n,orderStore.get(+n,(t=>{g(t[0]),d.setAttribute("data-active","true"),r.innerHTML=e.EDIT_ORDER,scrollToAnchor("screen-form-order")})),db.execTasks(),p()},"bt-orders-back":function(){scrollToAnchor("menu"),p()},"bt-select-product":function(){scrollToAnchor("products")},"bt-submit-order":function(){const t=d.getAttribute("data-row");t?function(e){const t=s.value,r=i.rows[e];t&&"0"!=t?(a.details[e-1].qty=t,r.children[1].innerText=t):(a.details.splice(e-1,1),r.remove());s.value="",c.setAttribute("hidden",""),i.removeAttribute("hidden"),n.style.display="block",d.setAttribute("data-row","")}(t):(r.innerHTML==e.NEW_ORDER?orderStore.add(a,{successCallback:()=>{T(),w(),scrollToAnchor("orders")}}):r.innerHTML==e.EDIT_ORDER&&orderStore.update(+u,a,{successCallback:()=>{w(),scrollToAnchor("orders")}}),db.execTasks())},"bt-view-order":function(){let t=o.getAttribute("data-row");if(""==t)return void alert("No order selected");let c=o.rows[+t].children[0].getAttribute("data-id");console.log(o.rows[+t].children[0]),orderStore.get(+c,(t=>{g(t[0]),n.style.display="none",l.style.display="none",i.style.pointerEvents="none",r.innerHTML=e.VIEW_ORDER,p(),scrollToAnchor("screen-form-order")})),db.execTasks()},"table-details":function(e){const t=e.target.parentElement,r=t.rowIndex;if(0==r)return;const o=+t.children[1].innerText;o>0&&(s.value=o),d.setAttribute("data-row",r),c.removeAttribute("hidden"),i.setAttribute("hidden",""),n.style.display="none"},"table-orders":function(e){const t=e.target.parentElement;let n=t.rowIndex,r=o.getAttribute("data-row");""==r?(t.className="tr-selected",o.setAttribute("data-row",n)):r!=n?(o.rows[r].className="",t.className="tr-selected",o.setAttribute("data-row",n)):r==n&&(t.className="",o.setAttribute("data-row",""))}};function K(){X(),window.visualViewport.onresize=e=>{X()},document.getElementById("menu").addEventListener("click",Q),document.getElementById("clients").addEventListener("click",Q),document.getElementById("screen-form-client").addEventListener("click",Q),document.getElementById("form-client").addEventListener("submit",R),document.getElementById("products").addEventListener("click",Q),document.getElementById("product-view").addEventListener("click",Q),document.getElementById("screen-form-product").addEventListener("click",Q),document.getElementById("form-product").addEventListener("submit",$),document.getElementById("photo").addEventListener("change",V),document.getElementById("product-name").addEventListener("change",q),document.getElementById("product-price").addEventListener("change",j),document.getElementById("orders").addEventListener("click",Q),document.getElementById("screen-form-order").addEventListener("click",Q),function(){let t=document.getElementsByClassName("string");for(let n=0;n<t.length;n++){let r=e[t[n].innerText];t[n].innerText=r}}()}function Q(e){let t="",n=e.composedPath();for(let e=0;e<n.length-4;e++){let r=n[e];if(r.classList.contains("clhl")){t=r.id;break}}J[t](e)}function X(){const e=Math.round(window.visualViewport.height+window.visualViewport.offsetTop);document.getElementById("css").innerHTML=`div.wrapper{height:${e}px;}`,scrollToAnchor(location.hash.substring(1))}window.currentAnchor="menu",window.scrollToAnchor=e=>{if(""==e)return;const t=document.getElementById(e);window.currentAnchor=e,t.scrollIntoView({inline:"start"})},window.onload=()=>{var e,t,n;K(),e=v,t=W,n=m,window.db=new Sixdb("maindb"),db.checkStore("clients",(t=>{t||db.newStore("clients",{keyPath:"id",autoIncrement:!0}),window.clientStore=db.openStore("clients"),clientStore.checkIndex("names",(t=>{t||clientStore.newIndex("names","name"),window.clientIndex=clientStore.openIndex("names"),db.customTask(e,window,null)}))})),db.checkStore("products",(e=>{e||db.newStore("products",{keyPath:"id",autoIncrement:!0}),window.productStore=db.openStore("products"),productStore.checkIndex("names",(e=>{e||productStore.newIndex("names","name"),window.productIndex=productStore.openIndex("names"),db.customTask(t,window,null)}))})),db.checkStore("orders",(e=>{e||db.newStore("orders",{keyPath:"id",autoIncrement:!0}),window.orderStore=db.openStore("orders"),orderStore.checkIndex("dates",(e=>{e||orderStore.newIndex("dates","date"),window.orderIndex=orderStore.openIndex("dates"),db.customTask(n,window,null)}))})),db.execTasks()};