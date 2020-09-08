(this["webpackJsonprefactored-spoon"]=this["webpackJsonprefactored-spoon"]||[]).push([[0],{122:function(e,t,n){e.exports=n(199)},127:function(e,t,n){},128:function(e,t,n){},199:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),i=n(24),l=n.n(i),o=(n(127),n(128),n(17)),u=n.n(o),c=n(27),s=n(9),d=n(32),m=n(10);function f(e){var t=Object(a.useState)(""),n=Object(s.a)(t,2),i=n[0],l=n[1],o=Object(a.useState)(""),u=Object(s.a)(o,2),c=u[0],f=u[1];return r.a.createElement("div",null,r.a.createElement("div",null,r.a.createElement(d.a,{onSubmit:function(t){t.preventDefault(),e.handleSubmit(i,c)}},r.a.createElement(d.a.Group,{controlId:"formBasicEmail"},r.a.createElement(d.a.Label,null,"Email address"),r.a.createElement(d.a.Control,{type:"email",placeholder:"Email",value:i,onChange:function(e){l(e.target.value)}})),r.a.createElement(d.a.Group,{controlId:"formBasicPassword"},r.a.createElement(d.a.Label,null,"Password"),r.a.createElement(d.a.Control,{type:"password",placeholder:"Password",value:c,onChange:function(e){f(e.target.value)}})),r.a.createElement(m.a,{variant:"primary",type:"submit"},"Submit"))))}var p=n(120),v=n(92),E=n(14);function h(){return localStorage.getItem("currentUser")}function b(){var e=Object(E.e)(),t=Object(a.useState)("login"),n=Object(s.a)(t,2),i=n[0],l=n[1],o=Object(a.useState)(""),d=Object(s.a)(o,2),m=d[0],b=d[1],g=function(){var t=Object(c.a)(u.a.mark((function t(n,a,r){var i,l;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("https://shielded-earth-02834.herokuapp.com/"+r,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({email:n,password:a})});case 2:return i=t.sent,t.next=5,i.text();case 5:l=t.sent,"login"===r&&302===i.status||"signup"===r&&201===i.status?(localStorage.setItem("currentUser",JSON.stringify(l)),h(),e.push("/days")):b("error with "+r+"\n"+l);case 7:case"end":return t.stop()}}),t)})));return function(e,n,a){return t.apply(this,arguments)}}();return r.a.createElement("div",null,r.a.createElement(p.a,{id:"signin-tabs",activeKey:i,onSelect:function(e){l(e),b("")}},r.a.createElement(v.a,{eventKey:"login",title:"Login"},r.a.createElement(f,{handleSubmit:function(e,t){g(e,t,"login")}})),r.a.createElement(v.a,{eventKey:"signup",title:"Sign Up"},r.a.createElement(f,{handleSubmit:function(e,t){g(e,t,"signup")}}))),m&&r.a.createElement("div",{style:{color:"red"}},"sign in unsuccessful :("))}var g=n(115),y=n.n(g),O=(n(135),n(60)),j=n(50);function C(){var e=Object(E.e)();return r.a.createElement(O.a,{bg:"light",expand:"lg"},r.a.createElement(O.a.Brand,null,"Refactored Spoon"),r.a.createElement(O.a.Toggle,{"aria-controls":"basic-navbar-nav"}),r.a.createElement(O.a.Collapse,{id:"basic-navbar-nav"},r.a.createElement(j.a,{className:"mr-auto"},r.a.createElement(j.a.Link,{href:"/days"},"Days"),r.a.createElement(j.a.Link,{href:"/foodsearch"},"Food Search"))),r.a.createElement(m.a,{variant:"secondary",onClick:function(){localStorage.removeItem("currentUser"),e.push("/signin")}},"Logout"))}var S=n(98),x=n(59),k=n(43),I=n(22),N=n(71),w={ENERGY:1008,CALCIUM:1087,IRON:1089,VITAMIN_A:1104,VITAMIN_C:1162,PROTEIN:1003,FAT:1004,CARBOHYDRATE:1005,SUGAR:2e3,FIBER:1079,POTASSIUM:1092,SODIUM:1093,CHOLESTEROL:1253};function A(e){var t=Object(a.useState)(""),n=Object(s.a)(t,2),i=n[0],l=n[1],o=Object(a.useState)([]),f=Object(s.a)(o,2),p=f[0],v=f[1],E=function(){var e=Object(c.a)(u.a.mark((function e(t){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.next=3,h(i);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),h=function(){var e=Object(c.a)(u.a.mark((function e(t){var n,a,r,i,l,o,c;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://shielded-earth-02834.herokuapp.com/food/search",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({food:t,pageSize:"9"})});case 2:return n=e.sent,a=[],e.next=6,n.json();case 6:return(r=e.sent).forEach((function(e){a.push(e.fdcId)})),i=r.TotalPages,console.log("totalPages"),console.log(i),e.next=13,fetch("https://shielded-earth-02834.herokuapp.com/foods/detail",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({foods:a})});case 13:return l=e.sent,e.next=16,l.json();case 16:o=e.sent,c=[],r.forEach((function(e){var t={result:e,details:o.filter((function(t){return t.fdcId===e.fdcId}))[0]};c.push(t)})),v(c);case 20:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return r.a.createElement("div",{style:{display:"flex",flexDirection:"row",justifyContent:"center"}},r.a.createElement("span",{style:{flexDirection:"column"}},r.a.createElement(d.a,{inline:!0,onSubmit:E,style:{margin:"10px"}},r.a.createElement(k.a,{type:"text",placeholder:"Search",className:"mr-sm-2",value:i,onChange:function(e){l(e.target.value)}}),r.a.createElement(m.a,{type:"submit"},"Search")),r.a.createElement("div",{style:{display:"flex",flexWrap:"wrap",justifyContent:"center"}},p&&p.map((function(t){var n,a;return r.a.createElement(I.a,{key:t.result.fdcId,border:"primary",style:{width:"30%",margin:"10px"}},r.a.createElement(I.a.Header,null,t.result.description),r.a.createElement(I.a.Body,null,"FdcId: ",t.result.fdcId,r.a.createElement("br",null),t.result.brandOwner&&r.a.createElement("span",null,"Brand: ",t.result.brandOwner),r.a.createElement("br",null),t.result.ingredients&&r.a.createElement("span",null,"Ingredients: ",t.result.ingredients),r.a.createElement("br",null),t.details&&r.a.createElement(N.a,{style:{marginTop:"5px"}},r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"Nutrient"),r.a.createElement("th",null,"Amount (per 100 grams)"))),r.a.createElement("tbody",null,t.details.foodNutrients.filter((function(e){return[w.ENERGY,w.PROTEIN,w.CARBOHYDRATE,w.FAT].includes(e.nutrient.id)})).map((function(e){return r.a.createElement("tr",{key:e.id},r.a.createElement("td",null,e.nutrient.name),r.a.createElement("td",null,e.amount," ",e.nutrient.unitName))})))),e.showSelect&&!(null===(n=e.fdcIds)||void 0===n?void 0:n.includes(t.result.fdcId))&&r.a.createElement(m.a,{onClick:function(){return e.selectFood(t.result,t.details)}},"Select food"),e.showSelect&&(null===(a=e.fdcIds)||void 0===a?void 0:a.includes(t.result.fdcId))&&r.a.createElement("span",{style:{color:"green"}},"Food selected")))})))))}function T(e){return e&&!(0===Object.keys(e).length&&e.constructor===Object)}function M(e){return r.a.createElement("span",{style:{display:"block",overflowY:"scroll",overflowX:"hidden",maxHeight:e.height?e.height:"300px",border:"1px solid lightGrey",maxWidth:"450px",margin:"0 auto"}},r.a.createElement(N.a,null,r.a.createElement("thead",{style:{display:"block",marginLeft:"27%",position:"sticky",top:"0",backgroundColor:"white"}},r.a.createElement("tr",null,r.a.createElement("th",{style:{position:"sticky",top:"0"}},"Nutrient"),r.a.createElement("th",{style:{position:"sticky",top:"0"}},"Amount"))),r.a.createElement("tbody",{style:{marginLeft:"25%",float:"left"}},!!e.nutrition.calories&&r.a.createElement("tr",null,r.a.createElement("td",null,"Calories"),r.a.createElement("td",null,e.nutrition.calories)),!!e.nutrition.protein&&r.a.createElement("tr",null,r.a.createElement("td",null,"Protein"),r.a.createElement("td",null,e.nutrition.protein)),!!e.nutrition.carbs&&r.a.createElement("tr",null,r.a.createElement("td",null,"Carbs"),r.a.createElement("td",null,e.nutrition.carbs)),!!e.nutrition.fat&&r.a.createElement("tr",null,r.a.createElement("td",null,"Fat"),r.a.createElement("td",null,e.nutrition.fat)),!!e.nutrition.sugar&&r.a.createElement("tr",null,r.a.createElement("td",null,"Sugar"),r.a.createElement("td",null,e.nutrition.sugar)),!!e.nutrition.fiber&&r.a.createElement("tr",null,r.a.createElement("td",null,"Fiber"),r.a.createElement("td",null,e.nutrition.fiber)),!!e.nutrition.sodium&&r.a.createElement("tr",null,r.a.createElement("td",null,"Sodium"),r.a.createElement("td",null,e.nutrition.sodium)),!!e.nutrition.calcium&&r.a.createElement("tr",null,r.a.createElement("td",null,"Calcium"),r.a.createElement("td",null,e.nutrition.calcium)),!!e.nutrition.iron&&r.a.createElement("tr",null,r.a.createElement("td",null,"Iron"),r.a.createElement("td",null,e.nutrition.iron)),!!e.nutrition.cholesterol&&r.a.createElement("tr",null,r.a.createElement("td",null,"Cholesterol"),r.a.createElement("td",null,e.nutrition.cholesterol)),!!e.nutrition.potassium&&r.a.createElement("tr",null,r.a.createElement("td",null,"Potassium"),r.a.createElement("td",null,e.nutrition.potassium)),!!e.nutrition.vitaminA&&r.a.createElement("tr",null,r.a.createElement("td",null,"Vitamin A"),r.a.createElement("td",null,e.nutrition.vitaminA)),!!e.nutrition.vitaminC&&r.a.createElement("tr",null,r.a.createElement("td",null,"Vitamin C"),r.a.createElement("td",null,e.nutrition.vitaminC)))))}function R(e){var t=Object(a.useState)(!1),n=Object(s.a)(t,2),i=n[0],l=n[1];return r.a.createElement(I.a,{style:{width:"30%",margin:"10px"},className:"mb-2"},r.a.createElement(I.a.Header,null,e.food.fdcId),e.food.fdcId&&r.a.createElement("span",{style:{margin:"5px"}},"FDC ID: ",e.food.fdcId,r.a.createElement("br",null)),e.food.name&&r.a.createElement("span",{style:{margin:"5px"}},"Name: ",e.food.name,r.a.createElement("br",null)),e.food.details&&r.a.createElement("span",{style:{margin:"5px"}},"Description: ",e.food.details.description,r.a.createElement("br",null)),r.a.createElement("span",{style:{margin:"5px"}},"Calories: ",e.food.nutrition.calories,r.a.createElement("br",null)),!i&&r.a.createElement("span",null,r.a.createElement(m.a,{variant:"secondary",onClick:function(){return l(!0)}},"See nutrition"),r.a.createElement("br",null)),i&&r.a.createElement("span",null,"Food nutrition",r.a.createElement(M,{nutrition:e.food.nutrition}),r.a.createElement(m.a,{variant:"secondary",onClick:function(){return l(!1)}},"Hide nutrition"),r.a.createElement("br",null)),r.a.createElement("span",null,"Serving size:",r.a.createElement(k.a,{type:"number",placeholder:100,style:{width:"80px",display:"inline-block",margin:"5px"},value:e.food.serving,onChange:function(t){return e.updateServingSize(e.food,t.target.value)}}),"g"),r.a.createElement("br",null),r.a.createElement(m.a,{variant:"danger",onClick:function(){return e.removeFood(e.food._id?e.food._id:e.food.fdcId)}},"Remove"))}var D=[{value:"breakfast",label:"Breakfast"},{value:"lunch",label:"Lunch"},{value:"dinner",label:"Dinner"}];function F(e){var t,n,i,l=Object(a.useState)((null===(t=e.meal)||void 0===t?void 0:t.foods)?e.meal.foods:[]),o=Object(s.a)(l,2),u=o[0],c=o[1],d=Object(a.useState)((null===(n=e.meal)||void 0===n?void 0:n.name)?e.meal.name:""),f=Object(s.a)(d,2),p=f[0],v=f[1],E=Object(a.useState)((null===(i=e.meal)||void 0===i?void 0:i.nutrition)?e.meal.nutrition:{}),h=Object(s.a)(E,2),b=h[0],g=h[1],y=Object(a.useState)([]),O=Object(s.a)(y,2),j=O[0],C=O[1],k=function(e,t){var n=u.map((function(n){return(e._id?n._id===e._id:n.fdcId===e.fdcId)?(e.serving=parseInt(t),e.nutrition={calories:N(n.usdaNutrition.calories,t),protein:I(n.usdaNutrition.protein,t),carbs:I(n.usdaNutrition.carbs,t),fat:I(n.usdaNutrition.fat,t),sugar:I(n.usdaNutrition.sugar,t),fiber:I(n.usdaNutrition.fiber,t),sodium:N(n.usdaNutrition.sodium,t),calcium:N(n.usdaNutrition.calcium,t),iron:I(n.usdaNutrition.iron,t),cholesterol:N(n.usdaNutrition.cholesterol,t),potassium:N(n.usdaNutrition.potassium,t),vitaminA:I(n.usdaNutrition.vitaminA,t),vitaminC:I(n.usdaNutrition.vitaminC,t)},e):n}));c(n),function(){var e={calories:0,protein:0,carbs:0,fat:0,sugar:0,fiber:0,sodium:0,calcium:0,iron:0,cholesterol:0,potassium:0,vitaminA:0,vitaminC:0};u.forEach((function(t){e.calories+=t.nutrition.calories,e.protein+=t.nutrition.protein,e.carbs+=t.nutrition.carbs,e.fat+=t.nutrition.fat,e.sugar+=t.nutrition.sugar,e.fiber+=t.nutrition.fiber,e.sodium+=t.nutrition.sodium,e.calcium+=t.nutrition.calcium,e.iron+=t.nutrition.iron,e.cholesterol+=t.nutrition.cholesterol,e.potassium+=t.nutrition.potassium,e.vitaminA+=t.nutrition.vitaminA,e.vitaminC+=t.nutrition.vitaminC})),g(e)}()},I=function(e,t){return Math.round(e*t)/100},N=function(e,t){return Math.round(e/100*t)},F=function(e){var t=u.filter((function(t){return t.fdcId===e}))[0];c(u.filter((function(t){return t.fdcId!==e}))),C(j.filter((function(t){return t!==e})));var n=_(t,-1);g(n)},U=function(e){var t=u.filter((function(t){return t._id===e}))[0];c(u.filter((function(t){return t._id!==e})));var n=_(t,-1);g(n)},_=function(e,t){return{calories:P(b.calories,e.nutrition.calories,t),protein:P(b.protein,e.nutrition.protein,t),carbs:P(b.carbs,e.nutrition.carbs,t),fat:P(b.fat,e.nutrition.fat,t),sugar:P(b.sugar,e.nutrition.sugar,t),fiber:P(b.fiber,e.nutrition.fiber,t),sodium:P(b.sodium,e.nutrition.sodium,t),calcium:P(b.calcium,e.nutrition.calcium,t),iron:P(b.iron,e.nutrition.iron,t),cholesterol:P(b.cholesterol,e.nutrition.cholesterol,t),potassium:P(b.potassium,e.nutrition.potassium,t),vitaminA:P(b.vitaminA,e.nutrition.vitaminA,t),vitaminC:P(b.vitaminC,e.nutrition.vitaminC,t)}},P=function(e,t,n){return(e||0)+n*(t||0)};return r.a.createElement("div",{style:{margin:"50px"}},r.a.createElement("div",null,r.a.createElement("div",{style:{borderStyle:"solid",borderWidth:"1px",padding:"20px"}},r.a.createElement("div",null,"Meal:"),"Meal nutrition summary",T(b)&&r.a.createElement(M,{nutrition:b}),r.a.createElement(x.a,{onSelect:v,value:p},r.a.createElement(x.a.Toggle,{style:{backgroundColor:"white",color:"black"}},p||"Meal"),r.a.createElement(x.a.Menu,null,D.map((function(e){return r.a.createElement(x.a.Item,{key:e.value,eventKey:e.value},e.label)})))),r.a.createElement("div",null,"Foods:"),r.a.createElement("span",{style:{display:"flex",flexWrap:"wrap",justifyContent:"center"}},u.map((function(t){return r.a.createElement(R,{key:t._id?t._id:t.fdcId,food:t,updateServingSize:k,removeFood:e.meal?U:F})}))),r.a.createElement("div",{style:{paddingTop:"20px"}},r.a.createElement(m.a,{variant:"secondary",type:"button",onClick:e.cancel,style:{marginRight:"5px"}},"Cancel"),r.a.createElement(m.a,{variant:"primary",type:"submit",onClick:function(t){var n;t.preventDefault();var a=u.map((function(e){return e.name=e.name?e.name:e.details.description,e})),r={_id:null===(n=e.meal)||void 0===n?void 0:n._id,name:p,foods:a,nutrition:b};e.submit(r)}},!e.meal&&"Add Meal",e.meal&&"Update Meal")),r.a.createElement(A,{selectFood:function(e,t){var n,a,r,i,l,o,u,s,d,m,f,p,v,E,h,b,y,O,j,x,k,I,N,A,T,M,R=null===t||void 0===t||null===(n=t.foodNutrients)||void 0===n||null===(a=n.filter((function(e){return(null===e||void 0===e?void 0:e.nutrient.id)===w.ENERGY}))[0])||void 0===a?void 0:a.amount,D=null===t||void 0===t||null===(r=t.foodNutrients)||void 0===r||null===(i=r.filter((function(e){return(null===e||void 0===e?void 0:e.nutrient.id)===w.PROTEIN}))[0])||void 0===i?void 0:i.amount,F=null===t||void 0===t||null===(l=t.foodNutrients)||void 0===l||null===(o=l.filter((function(e){return(null===e||void 0===e?void 0:e.nutrient.id)===w.CARBOHYDRATE}))[0])||void 0===o?void 0:o.amount,U=null===t||void 0===t||null===(u=t.foodNutrients)||void 0===u||null===(s=u.filter((function(e){return(null===e||void 0===e?void 0:e.nutrient.id)===w.FAT}))[0])||void 0===s?void 0:s.amount,P=null===t||void 0===t||null===(d=t.foodNutrients)||void 0===d||null===(m=d.filter((function(e){return(null===e||void 0===e?void 0:e.nutrient.id)===w.SUGAR}))[0])||void 0===m?void 0:m.amount,L=null===t||void 0===t||null===(f=t.foodNutrients)||void 0===f||null===(p=f.filter((function(e){return(null===e||void 0===e?void 0:e.nutrient.id)===w.FIBER}))[0])||void 0===p?void 0:p.amount,B=null===t||void 0===t||null===(v=t.foodNutrients)||void 0===v||null===(E=v.filter((function(e){return(null===e||void 0===e?void 0:e.nutrient.id)===w.SODIUM}))[0])||void 0===E?void 0:E.amount,H=null===t||void 0===t||null===(h=t.foodNutrients)||void 0===h||null===(b=h.filter((function(e){return(null===e||void 0===e?void 0:e.nutrient.id)===w.CALCIUM}))[0])||void 0===b?void 0:b.amount,Y=null===t||void 0===t||null===(y=t.foodNutrients)||void 0===y||null===(O=y.filter((function(e){return(null===e||void 0===e?void 0:e.nutrient.id)===w.IRON}))[0])||void 0===O?void 0:O.amount,G=null===t||void 0===t||null===(j=t.foodNutrients)||void 0===j||null===(x=j.filter((function(e){return(null===e||void 0===e?void 0:e.nutrient.id)===w.CHOLESTEROL}))[0])||void 0===x?void 0:x.amount,J=null===t||void 0===t||null===(k=t.foodNutrients)||void 0===k||null===(I=k.filter((function(e){return(null===e||void 0===e?void 0:e.nutrient.id)===w.POTASSIUM}))[0])||void 0===I?void 0:I.amount,z=null===t||void 0===t||null===(N=t.foodNutrients)||void 0===N||null===(A=N.filter((function(e){return(null===e||void 0===e?void 0:e.nutrient.id)===w.VITAMIN_A}))[0])||void 0===A?void 0:A.amount,V=null===t||void 0===t||null===(T=t.foodNutrients)||void 0===T||null===(M=T.filter((function(e){return(null===e||void 0===e?void 0:e.nutrient.id)===w.VITAMIN_C}))[0])||void 0===M?void 0:M.amount,W={brand:e.brandOwner,ingredients:e.ingredients,fdcId:e.fdcId,serving:100,nutrition:{calories:R||0,protein:D||0,carbs:F||0,fat:U||0,sugar:P||0,fiber:L||0,sodium:B||0,calcium:H||0,iron:Y||0,cholesterol:G||0,potassium:J||0,vitaminA:z||0,vitaminC:V||0},usdaNutrition:{calories:R||0,protein:D||0,carbs:F||0,fat:U||0,sugar:P||0,fiber:L||0,sodium:B||0,calcium:H||0,iron:Y||0,cholesterol:G||0,potassium:J||0,vitaminA:z||0,vitaminC:V||0},details:t};c((function(e){return[].concat(Object(S.a)(e),[W])})),C((function(t){return[].concat(Object(S.a)(t),[e.fdcId])}));var K=_(W,1);g(K)},showSelect:!0,fdcIds:j}))))}var U=n(93),_=n(95);function P(e){var t,n,i=Object(a.useState)(!1),l=Object(s.a)(i,2),o=l[0],u=l[1];return r.a.createElement("span",null,e.food.name,r.a.createElement("br",null),r.a.createElement("span",null,"group: ",e.food.group,r.a.createElement("br",null),"serving: ",e.food.serving,r.a.createElement("br",null),"calories: ",null===(t=e.food)||void 0===t||null===(n=t.nutrition)||void 0===n?void 0:n.calories,r.a.createElement("br",null),!o&&r.a.createElement("span",null,r.a.createElement(m.a,{variant:"secondary",onClick:function(){return u(!0)}},"See nutrition"),r.a.createElement("br",null)),o&&T(e.food.nutrition)&&r.a.createElement("span",null,"Food nutrition",r.a.createElement(M,{nutrition:e.food.nutrition,height:"180px"}),r.a.createElement(m.a,{variant:"secondary",onClick:function(){return u(!1)}},"Hide nutrition"),r.a.createElement("br",null))))}function L(e){var t,n,a;return r.a.createElement(I.a,{style:{width:"24rem",margin:"0 auto"},className:"mb-2"},r.a.createElement(I.a.Header,null,r.a.createElement("span",null,e.meal.name),r.a.createElement("br",null),r.a.createElement(m.a,{variant:"link",size:"sm",onClick:function(){return e.updateMeal(e.meal)}},r.a.createElement(U.a,{icon:_.a,style:{color:"black"}})),r.a.createElement(m.a,{variant:"link",size:"sm",onClick:function(){return e.deleteMeal(e.meal._id)}},r.a.createElement(U.a,{icon:_.b,style:{color:"black"}}))),r.a.createElement(I.a.Body,null,r.a.createElement(I.a.Text,null,null===(t=e.meal)||void 0===t||null===(n=t.foods)||void 0===n?void 0:n.map((function(e,t){return r.a.createElement("span",{key:t},r.a.createElement(P,{food:e}))})))),r.a.createElement("div",null,"Meal nutrition",T(null===(a=e.meal)||void 0===a?void 0:a.nutrition)&&r.a.createElement(M,{nutrition:e.meal.nutrition})))}var B=h();function H(){var e=Object(a.useState)(),t=Object(s.a)(e,2),n=t[0],i=t[1],l=Object(a.useState)(new Date),o=Object(s.a)(l,2),d=o[0],f=o[1],p=Object(a.useState)(!1),v=Object(s.a)(p,2),E=v[0],h=v[1],b=Object(a.useState)(""),g=Object(s.a)(b,2),O=g[0],j=g[1];Object(a.useEffect)((function(){S(B,d)}),[]);var S=function(){var e=Object(c.a)(u.a.mark((function e(t,n){var a;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x(t,n);case 2:a=e.sent,i(a);case 4:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),x=function(){var e=Object(c.a)(u.a.mark((function e(t,n){var a,r,i;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=n.getFullYear()+"-"+(n.getMonth()+1)+"-"+n.getUTCDate(),e.next=3,fetch("https://shielded-earth-02834.herokuapp.com/days/"+a+"?user="+t,{method:"GET",headers:{Accept:"application/json","Content-Type":"application/json"}});case 3:return r=e.sent,e.next=6,r.json();case 6:if("000000000000000000000000"!==(i=e.sent)._id){e.next=9;break}return e.abrupt("return",null);case 9:return e.abrupt("return",i);case 10:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),k=function(){var e=Object(c.a)(u.a.mark((function e(t){var n;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getUTCDate(),e.next=3,fetch("https://shielded-earth-02834.herokuapp.com/days/"+n+"/meals?user="+B,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(t)});case 3:S(B,d),h(!1);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),I=function(){var e=Object(c.a)(u.a.mark((function e(t){var n;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getUTCDate(),e.next=3,fetch("https://shielded-earth-02834.herokuapp.com/days/"+n+"/meals/"+t._id+"?user="+B,{method:"PUT",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(t)});case 3:S(B,d),j("");case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),N=function(){var e=Object(c.a)(u.a.mark((function e(t){var n;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getUTCDate(),e.next=3,fetch("https://shielded-earth-02834.herokuapp.com/days/"+n+"/meals/"+t+"?user="+B,{method:"DELETE",headers:{Accept:"application/json","Content-Type":"application/json"}});case 3:S(B,d);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),w=function(e){j(O?"":e)};return r.a.createElement("div",null,r.a.createElement(C,null),r.a.createElement("div",{style:{margin:"10px"}},r.a.createElement(y.a,{selected:d,onChange:function(e){f(e),S(B,e),h(!1)}})),n&&r.a.createElement("div",null,r.a.createElement("div",{style:{display:"flex",flexDirection:"row"}},n.meals&&n.meals.map((function(e,t){return r.a.createElement(L,{key:t,meal:e,updateMeal:w,deleteMeal:N})}))),r.a.createElement("div",null,T(n.nutrition)&&r.a.createElement("span",null,"Nutrition summary of the day",r.a.createElement(M,{nutrition:n.nutrition})))),!n&&r.a.createElement("div",null,"no data for this date"),!E&&r.a.createElement(m.a,{onClick:function(){h(!0)}},"Add meal"),E&&r.a.createElement(F,{submit:k,cancel:function(){h(!1)}}),O&&r.a.createElement(F,{submit:I,cancel:function(){return j("")},meal:O}))}var Y=n(42);n(198);var G=function(){return r.a.createElement("div",null,"what is happening",r.a.createElement(Y.a,null,r.a.createElement("div",null,r.a.createElement(E.a,{exact:!0,path:"/",component:b}),r.a.createElement(E.a,{path:"/blog",component:H}))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var J=r.a.createElement(Y.a,{basename:"/refactored-spoon"},r.a.createElement(G,null));l.a.render(J,document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[122,1,2]]]);
//# sourceMappingURL=main.214be30e.chunk.js.map