(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{iSoX:function(e,t,a){"use strict";a.d(t,"a",(function(){return l}));a("KKXr");var n=a("q1tI"),r=a.n(n),i=(a("x0tl"),a("Wbzz")),m={homepage:{title:"עמוד ראשי",path:"/"},blogs:{title:"בלוגים",path:"blogs"},articles:{title:"כתבו עלינו בעיתון",path:"articles"}},l=function(e){var t=e.path,a=e.entityLabel,n=t.split(".");return r.a.createElement("ul",{className:"breadcrumb"},n.map((function(e,t){return t+1===n.length?"<entityLabel>"===e?a:r.a.createElement("li",{key:t,className:"crumb"},m[e].title):r.a.createElement("li",{key:t,className:"crumb"},r.a.createElement(i.a,{to:m[e].path,state:{fromFeed:!0},className:"simple-link"},m[e].title)," >>")})))}},qGWU:function(e,t,a){},ubkq:function(e,t,a){var n;a("a1Th"),a("h7Nl"),a("Btvt"),a("LK8F"),a("SRfc"),a("pIFo"),function(r){"use strict";var i,m,l,s=(i=/d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZWN]|"[^"]*"|'[^']*'/g,m=/\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,l=/[^-+\dA-Z]/g,function(e,t,a,n){if(1!==arguments.length||"string"!==u(e)||/\d/.test(e)||(t=e,e=void 0),(e=e||new Date)instanceof Date||(e=new Date(e)),isNaN(e))throw TypeError("Invalid date");var r=(t=String(s.masks[t]||t||s.masks.default)).slice(0,4);"UTC:"!==r&&"GMT:"!==r||(t=t.slice(4),a=!0,"GMT:"===r&&(n=!0));var c=a?"getUTC":"get",h=e[c+"Date"](),g=e[c+"Day"](),M=e[c+"Month"](),f=e[c+"FullYear"](),p=e[c+"Hours"](),T=e[c+"Minutes"](),b=e[c+"Seconds"](),N=e[c+"Milliseconds"](),D=a?0:e.getTimezoneOffset(),v=d(e),S=y(e),E={d:h,dd:o(h),ddd:s.i18n.dayNames[g],dddd:s.i18n.dayNames[g+7],m:M+1,mm:o(M+1),mmm:s.i18n.monthNames[M],mmmm:s.i18n.monthNames[M+12],yy:String(f).slice(2),yyyy:f,h:p%12||12,hh:o(p%12||12),H:p,HH:o(p),M:T,MM:o(T),s:b,ss:o(b),l:o(N,3),L:o(Math.round(N/10)),t:p<12?s.i18n.timeNames[0]:s.i18n.timeNames[1],tt:p<12?s.i18n.timeNames[2]:s.i18n.timeNames[3],T:p<12?s.i18n.timeNames[4]:s.i18n.timeNames[5],TT:p<12?s.i18n.timeNames[6]:s.i18n.timeNames[7],Z:n?"GMT":a?"UTC":(String(e).match(m)||[""]).pop().replace(l,""),o:(D>0?"-":"+")+o(100*Math.floor(Math.abs(D)/60)+Math.abs(D)%60,4),S:["th","st","nd","rd"][h%10>3?0:(h%100-h%10!=10)*h%10],W:v,N:S};return t.replace(i,(function(e){return e in E?E[e]:e.slice(1,e.length-1)}))});function o(e,t){for(e=String(e),t=t||2;e.length<t;)e="0"+e;return e}function d(e){var t=new Date(e.getFullYear(),e.getMonth(),e.getDate());t.setDate(t.getDate()-(t.getDay()+6)%7+3);var a=new Date(t.getFullYear(),0,4);a.setDate(a.getDate()-(a.getDay()+6)%7+3);var n=t.getTimezoneOffset()-a.getTimezoneOffset();t.setHours(t.getHours()-n);var r=(t-a)/6048e5;return 1+Math.floor(r)}function y(e){var t=e.getDay();return 0===t&&(t=7),t}function u(e){return null===e?"null":void 0===e?"undefined":"object"!=typeof e?typeof e:Array.isArray(e)?"array":{}.toString.call(e).slice(8,-1).toLowerCase()}s.masks={default:"ddd mmm dd yyyy HH:MM:ss",shortDate:"m/d/yy",mediumDate:"mmm d, yyyy",longDate:"mmmm d, yyyy",fullDate:"dddd, mmmm d, yyyy",shortTime:"h:MM TT",mediumTime:"h:MM:ss TT",longTime:"h:MM:ss TT Z",isoDate:"yyyy-mm-dd",isoTime:"HH:MM:ss",isoDateTime:"yyyy-mm-dd'T'HH:MM:sso",isoUtcDateTime:"UTC:yyyy-mm-dd'T'HH:MM:ss'Z'",expiresHeaderFormat:"ddd, dd mmm yyyy HH:MM:ss Z"},s.i18n={dayNames:["Sun","Mon","Tue","Wed","Thu","Fri","Sat","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],monthNames:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","January","February","March","April","May","June","July","August","September","October","November","December"],timeNames:["a","p","am","pm","A","P","AM","PM"]},void 0===(n=function(){return s}.call(t,a,t,e))||(e.exports=n)}()},x0tl:function(e,t,a){},yZlL:function(e,t,a){"use strict";a.r(t),a.d(t,"query",(function(){return d}));a("f3/d");var n=a("q1tI"),r=a.n(n),i=a("uVCN"),m=a("iSoX"),l=(a("qGWU"),a("ubkq")),s=a.n(l),o=a("qhky");t.default=function(e){var t=e.data.drupal.nodeById;return r.a.createElement(i.a,null,r.a.createElement(o.a,null,r.a.createElement("meta",{charSet:"utf-8"}),r.a.createElement("title",null,"פנסיה פתוחה | בלוג | ",t.title),r.a.createElement("link",{rel:"canonical",href:"https://www.openpension.org.il"+t.path.alias})),r.a.createElement("div",{className:"inner-page blog"},r.a.createElement(m.a,{path:"homepage.blogs.<entityLabel>",entityLabel:t.title}),r.a.createElement("h1",null,t.title),r.a.createElement("span",{className:"created"},"נוצר בתאריך ",r.a.createElement("b",null,s()(1e3*t.created,"dd/mm/yyyy"))," על ידי ",r.a.createElement("b",null,t.entityOwner.name)),r.a.createElement("div",{className:"blog-content",dangerouslySetInnerHTML:{__html:t.body.value}})))};var d="2870775022"}}]);
//# sourceMappingURL=component---src-templates-blog-post-js-e89c43ec8a52a0c55743.js.map