const e="es"==navigator.language.substring(0,2)?{AMOUNT:"CANTIDAD",CLIENTS:"CLIENTES",DELETE_CONFIRM:"¿Eliminar este elemento?",EDIT_CLIENT:"MODIFICAR CLIENTE",EDIT_ORDER:"MODIFICAR PEDIDO",EDIT_PRODUCT:"MODIFICAR PRODUCTO",Image:"Imagen",NAME:"NOMBRE",NEW_CLIENT:"NUEVO CLIENTE",NEW_ORDER:"NUEVO PEDIDO",NEW_PRODUCT:"NUEVO PRODUCTO",ORDERS:"PEDIDOS",PRICE:"PRECIO",PRODUCTS:"PRODUCTOS",TELEPHONE:"TELEFONO",VIEW_ORDER:"VISTA PEDIDO",Zero_to_remove_product:"Cero borra este producto"}:{AMOUNT:"AMOUNT",CLIENTS:"CLIENTS",DELETE_CONFIRM:"Delete this item?",EDIT_CLIENT:"EDIT_CLIENT",EDIT_ORDER:"EDIT ORDER",EDIT_PRODUCT:"EDIT PRODUCT",Image:"Image",NAME:"NAME",NEW_CLIENT:"NEW CLIENT",NEW_ORDER:"NEW ORDER",NEW_PRODUCT:"NEW PRODUCT",ORDERS:"ORDERS",PRICE:"PRICE",PRODUCTS:"PRODUCTS",TELEPHONE:"TELEPHONE",VIEW_ORDER:"VIEW_ORDER",Zero_to_remove_product:"Zero removes this product"},t=document.getElementById("bt-select-client"),n=document.getElementById("bt-select-product"),r=(document.getElementById("form-order"),document.getElementById("change-orders-title")),o=document.getElementById("table-orders"),c=document.getElementById("popup-qty"),d=document.getElementById("screen-form-order"),l=document.getElementById("bt-submit-order"),i=document.getElementById("table-details"),s=document.getElementById("tb-qty"),a={date:null,client:null,details:[]};let u=null;function m(){g()}function b(e){let t=document.createElement("tr");a.details.push({productId:e.id,name:e.name,qty:"0"});let n=`<td>${e.name}</td><td>0</td>`;t.innerHTML=n,i.appendChild(t)}function E(e){t.style.display="none",a.client={id:e.id,name:e.name};let n=`<tr><th colspan="2">${e.name}</th></tr>`;i.innerHTML=n}function T(e){t.style.display="none",a.date=e.date,E(e.client),a.details=e.details;for(let t=0;t<e.details.length;t++){let n=document.createElement("tr"),r=`<td>${e.details[t].name}</td><td>${e.details[t].qty}</td>`;n.innerHTML=r,i.appendChild(n)}d.setAttribute("data-active","true")}function g(){orderIndex.getAll((e=>{let t="";for(let n=0;n<e.length;n++)t+=`<tr><td data-id="${e[n].id}">${e[n].date}</td><td>${e[n].client.name}</td></tr>`;o.innerHTML=t})),db.execTasks()}function I(){a.date=null,a.client=null,a.details=[],u=null,d.setAttribute("data-active",""),d.setAttribute("data-row",""),i.innerHTML="",t.style.display="block",n.style.display="block",l.style.display="initial",i.style.pointerEvents="auto"}function w(){const e=o.getAttribute("data-row");if(""==e)return;o.rows[e].className="",o.setAttribute("data-row","")}const p=document.getElementById("table-clients"),f=document.getElementById("form-client"),A=document.getElementById("change-clients-title"),h=document.getElementById("screen-form-order"),N=document.getElementById("screen-form-client");function y(){D()}function R(t){t.preventDefault();const n=function(e){const t=N.getAttribute("data-id"),n=e.elements[0].value,r=e.elements[1].value;return{id:t,name:n,tel:r}}(f);A.innerHTML==e.NEW_CLIENT?function(e){clientStore.add({name:e.name,tel:e.tel})}(n):function(e){clientStore.update(+e.id,{name:e.name,tel:e.tel})}(n),db.customTask((()=>{f.reset(),O()})),db.execTasks(),D(),scrollToAnchor("clients")}function v(){const e=p.getAttribute("data-row");if(""==e)return null;const t=p.rows[e];return{id:t.children[0].getAttribute("data-id"),name:t.children[0].innerText,tel:t.children[1].innerText}}function D(){clientIndex.getAll((e=>{let t="";for(let n=0;n<e.length;n++)t+=`<tr><td data-id="${e[n].id}">${e[n].name}</td><td>${e[n].tel}</td></tr>`;p.innerHTML=t})),db.execTasks()}function L(e){N.setAttribute("data-id",e)}function O(){const e=p.getAttribute("data-row");if(""==e)return;p.rows[e].className="",p.setAttribute("data-row","")}async function S(e,t,n,r){let o=await createImageBitmap(e);const c=document.createElement("canvas"),d=t/o.width,l=n/o.height;let i=l<d?l:d;c.width=o.width*i,c.height=o.height*i;const s=c.getContext("2d");s.scale(i,i),s.drawImage(o,0,0),c.toBlob(r,"image/jpeg",.92)}const k=document.getElementById("table-products"),C=document.getElementById("form-product"),x=document.getElementById("change-products-title"),B=(document.getElementById("screen-form-product"),document.getElementById("screen-form-order")),M=document.getElementById("product-thumbnail"),_=document.getElementById("product-img"),P=document.getElementById("photo-title"),U={name:null,price:null,imgblob:null};let H=null;function W(){J()}function $(t){var n;t.preventDefault(),x.innerHTML==e.NEW_PRODUCT?(n=U,productStore.add({name:n.name,price:n.price,imgblob:n.imgblob})):function(e){productStore.update(+H,{name:e.name,price:e.price,imgblob:e.imgblob})}(U),db.customTask((()=>{z(),K()}),window,null),db.execTasks(),localStorage.removeItem("product"),localStorage.removeItem("title"),J(),scrollToAnchor("products")}function V(){localStorage.setItem("product",JSON.stringify(U)),localStorage.setItem("title",x.innerHTML)}async function F(e){const t=e.target.files[0];if(!t)return;S(t,window.innerWidth*devicePixelRatio,window.innerHeight*devicePixelRatio,(e=>{U.imgblob=e;let t=URL.createObjectURL(e);M.setAttribute("src",t)}))}function q(){U.name=C.elements[0].value}function j(){U.price=C.elements[1].value}function Z(e){if(C.elements[0].value=e.name,C.elements[1].value=e.price,!e.imgblob)return;let t=URL.createObjectURL(e.imgblob);M.setAttribute("src",t)}function J(){productIndex.getAll((e=>{let t="";for(let n=0;n<e.length;n++)t+=`<tr><td data-id="${e[n].id}">${e[n].name}</td><td>${e[n].price}</td></tr>`;k.innerHTML=t})),db.execTasks()}function z(){U.name=null,U.price=null,U.imgblob=null,H=null,C.reset(),M.setAttribute("src","")}function G(){const e=k.getAttribute("data-row");if(""==e)return null;const t=k.rows[e].children[0].getAttribute("data-id");H=t,productStore.get(+t,(e=>{U.name=e[0].name,U.price=e[0].price,U.imgblob=e[0].imgblob}))}function K(){const e=k.getAttribute("data-row");if(""==e)return;k.rows[e].className="",k.setAttribute("data-row","")}const Q={"":()=>{},"bt-clients":()=>{scrollToAnchor("clients")},"bt-orders":()=>{scrollToAnchor("orders")},"bt-products":()=>{scrollToAnchor("products")},"bt-add-client":function(){L(""),console.log(A),A.innerHTML=e.NEW_CLIENT,scrollToAnchor("screen-form-client")},"bt-cancel-client":function(){f.reset(),scrollToAnchor("clients")},"bt-clients-back":function(){scrollToAnchor("menu"),O()},"bt-del-client":function(){const t=p.getAttribute("data-row");if(""==t)return void alert("No client selected");if(!window.confirm(e.DELETE_CONFIRM))return;const n=p.rows[t],r=n.children[0].getAttribute("data-id");p.setAttribute("data-row",""),n.className="",clientStore.del(+r),db.execTasks(),n.remove()},"bt-edit-client":function(){const t=v();t?(L(t.id),A.innerHTML=e.EDIT_CLIENT,function(e){f.elements[0].value=e.name,f.elements[1].value=e.tel}(t),scrollToAnchor("screen-form-client")):alert("No client selected")},"table-clients":function(e){const t=e.target.parentElement;let n=t.rowIndex,r=p.getAttribute("data-row");""==r?(t.className="tr-selected",p.setAttribute("data-row",n)):r!=n?(p.rows[r].className="",t.className="tr-selected",p.setAttribute("data-row",n)):r==n&&(t.className="",p.setAttribute("data-row","")),""!=h.getAttribute("data-active")&&(E(v()),scrollToAnchor("screen-form-order"),O())},"bt-add-product":function(){z(),x.innerHTML=e.NEW_PRODUCT,scrollToAnchor("screen-form-product")},"bt-cancel-product-view":function(){_.setAttribute("src",""),K(),scrollToAnchor("products")},"bt-cancel-product":function(){z(),localStorage.removeItem("product"),localStorage.removeItem("title"),scrollToAnchor("products")},"bt-del-product":function(){const t=function(e){const t=k.getAttribute("data-row");if(""==t)return null;const n=k.rows[t],r=n.children[0].getAttribute("data-id");n.className="",k.setAttribute("data-row",""),e&&n.remove();return r}(!0);t?window.confirm(e.DELETE_CONFIRM)&&(productStore.del(+t),db.execTasks()):alert("No product selected")},"bt-edit-product":function(){G(),db.customTask((()=>{x.innerHTML=e.EDIT_PRODUCT,Z(U),K()}),this,null),db.execTasks(),scrollToAnchor("screen-form-product")},"bt-products-back":function(){scrollToAnchor("menu"),K()},"bt-view-product":function(){G(),db.customTask((()=>{let e="assets/images/nophoto.png";P.innerHTML=U.name,U.imgblob&&(e=URL.createObjectURL(U.imgblob)),_.setAttribute("src",e)}),this,null),db.execTasks(),scrollToAnchor("product-view")},"table-products":function(e){const t=e.target.parentElement;let n=t.rowIndex,r=k.getAttribute("data-row");""==r?(t.className="tr-selected",k.setAttribute("data-row",n)):r!=n?(k.rows[r].className="",t.className="tr-selected",k.setAttribute("data-row",n)):r==n&&(t.className="",k.setAttribute("data-row","")),""!=B.getAttribute("data-active")&&(G(),db.customTask(b,window,U),db.customTask((()=>{scrollToAnchor("screen-form-order"),K()}),window,null),db.execTasks())},"bt-select-client":function(){d.setAttribute("data-active","true"),scrollToAnchor("clients")},"bt-add-order":function(){!function(){let e=new Date;a.date=e.toISOString().substring(0,10)}(),r.innerHTML=e.NEW_ORDER,scrollToAnchor("screen-form-order"),w()},"bt-cancel-order":function(){scrollToAnchor("orders"),I()},"bt-del-order":function(){const t=o.getAttribute("data-row");if(""==t)return void alert("No order selected");if(!window.confirm(e.DELETE_CONFIRM))return;const n=o.rows[t],r=n.children[0].getAttribute("data-id");o.setAttribute("data-row",""),n.className="",orderStore.del(+r),db.execTasks(),n.remove()},"bt-edit-order":function(){let t=o.getAttribute("data-row");if(""==t)return void alert("No order selected");let n=o.rows[+t].children[0].getAttribute("data-id");u=n,orderStore.get(+n,(t=>{T(t[0]),d.setAttribute("data-active","true"),r.innerHTML=e.EDIT_ORDER,scrollToAnchor("screen-form-order")})),db.execTasks(),w()},"bt-orders-back":function(){scrollToAnchor("menu"),w()},"bt-select-product":function(){scrollToAnchor("products")},"bt-submit-order":function(){const t=d.getAttribute("data-row");t?function(e){const t=s.value,r=i.rows[e];t&&"0"!=t?(a.details[e-1].qty=t,r.children[1].innerText=t):(a.details.splice(e-1,1),r.remove());s.value="",c.setAttribute("hidden",""),i.removeAttribute("hidden"),n.style.display="block",d.setAttribute("data-row","")}(t):(r.innerHTML==e.NEW_ORDER?orderStore.add(a,{successCallback:()=>{g(),I(),scrollToAnchor("orders")}}):r.innerHTML==e.EDIT_ORDER&&orderStore.update(+u,a,{successCallback:()=>{I(),scrollToAnchor("orders")}}),db.execTasks())},"bt-view-order":function(){let t=o.getAttribute("data-row");if(""==t)return void alert("No order selected");let c=o.rows[+t].children[0].getAttribute("data-id");console.log(o.rows[+t].children[0]),orderStore.get(+c,(t=>{T(t[0]),n.style.display="none",l.style.display="none",i.style.pointerEvents="none",r.innerHTML=e.VIEW_ORDER,w(),scrollToAnchor("screen-form-order")})),db.execTasks()},"table-details":function(e){const t=e.target.parentElement,r=t.rowIndex;if(0==r)return;const o=+t.children[1].innerText;o>0&&(s.value=o),d.setAttribute("data-row",r),c.removeAttribute("hidden"),i.setAttribute("hidden",""),n.style.display="none"},"table-orders":function(e){const t=e.target.parentElement;let n=t.rowIndex,r=o.getAttribute("data-row");""==r?(t.className="tr-selected",o.setAttribute("data-row",n)):r!=n?(o.rows[r].className="",t.className="tr-selected",o.setAttribute("data-row",n)):r==n&&(t.className="",o.setAttribute("data-row",""))}};function X(){ee(),window.visualViewport.onresize=e=>{ee()},document.getElementById("menu").addEventListener("click",Y),document.getElementById("clients").addEventListener("click",Y),document.getElementById("screen-form-client").addEventListener("click",Y),document.getElementById("form-client").addEventListener("submit",R),document.getElementById("products").addEventListener("click",Y),document.getElementById("product-view").addEventListener("click",Y),document.getElementById("screen-form-product").addEventListener("click",Y),document.getElementById("form-product").addEventListener("submit",$),document.getElementById("photo").addEventListener("click",V),document.getElementById("photo").addEventListener("change",F),document.getElementById("product-name").addEventListener("change",q),document.getElementById("product-price").addEventListener("change",j),document.getElementById("orders").addEventListener("click",Y),document.getElementById("screen-form-order").addEventListener("click",Y),function(){let t=document.getElementsByClassName("string");for(let n=0;n<t.length;n++){let r=e[t[n].innerText];t[n].innerText=r}}()}function Y(e){let t="",n=e.composedPath();for(let e=0;e<n.length-4;e++){let r=n[e];if(r.classList.contains("clhl")){t=r.id;break}}Q[t](e)}function ee(){const e=Math.round(window.visualViewport.height+window.visualViewport.offsetTop);document.getElementById("css").innerHTML=`div.wrapper{height:${e}px;}`,scrollToAnchor(window.currentAnchor)}window.currentAnchor="menu",window.scrollToAnchor=e=>{if(""==e)return;const t=document.getElementById(e);window.currentAnchor=e,t.scrollIntoView({inline:"start"})},window.onload=()=>{var e,t,n;X(),e=y,t=W,n=m,window.db=new Sixdb("maindb"),db.checkStore("clients",(t=>{t||db.newStore("clients",{keyPath:"id",autoIncrement:!0}),window.clientStore=db.openStore("clients"),clientStore.checkIndex("names",(t=>{t||clientStore.newIndex("names","name"),window.clientIndex=clientStore.openIndex("names"),db.customTask(e,window,null)}))})),db.checkStore("products",(e=>{e||db.newStore("products",{keyPath:"id",autoIncrement:!0}),window.productStore=db.openStore("products"),productStore.checkIndex("names",(e=>{e||productStore.newIndex("names","name"),window.productIndex=productStore.openIndex("names"),db.customTask(t,window,null)}))})),db.checkStore("orders",(e=>{e||db.newStore("orders",{keyPath:"id",autoIncrement:!0}),window.orderStore=db.openStore("orders"),orderStore.checkIndex("dates",(e=>{e||orderStore.newIndex("dates","date"),window.orderIndex=orderStore.openIndex("dates"),db.customTask(n,window,null)}))})),db.execTasks();const r=localStorage.getItem("title");if(r){const e=JSON.parse(localStorage.getItem("product"));o=r,Z(e),x.innerHTML=o,scrollToAnchor("screen-form-product")}var o};