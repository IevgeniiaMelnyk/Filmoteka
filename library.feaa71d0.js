var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},r={},t=e.parcelRequired7c6;null==t&&((t=function(e){if(e in n)return n[e].exports;if(e in r){var t=r[e];delete r[e];var i={id:e,exports:{}};return n[e]=i,t.call(i.exports,i,i.exports),i.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,n){r[e]=n},e.parcelRequired7c6=t),t("krGWQ"),t("4aPXr");var i=t("4aPXr"),o=t("krGWQ");const s=new(0,i.SStorage);(0,o.getRefs)().libraryLogo.addEventListener("click",(function(){s.clear()})),t("2lP43"),t("3tw01");var a=t("hqPq9"),l=t("sgMsR"),c=(o=t("krGWQ"),t("gzWlL")),u=(c=t("gzWlL"),t("fK7aK")),f=(u=t("fK7aK"),t("4AmR3"));f=t("4AmR3");const d=(0,o.getRefs)();d.libraryBtnQ.addEventListener("click",(function(){d.libraryBtnW.classList.remove("current-btn"),d.libraryBtnQ.classList.add("current-btn"),l.fbFilmsAuth.isLogin&&((0,c.spinnerOn)(),(0,f.emptyLibraryHide)(),d.library.innerHTML="",async function(){if(l.fbFilmsAuth.isLogin)try{const e=await a.fbFilmsData.getFilms(a.PLACE_Q);if(e)return e}catch(e){console.log(e)}}().then((({films:e})=>e.map((({id:e,posters:n,title:r,genres:t,year:i,vote:o})=>({id:e,posters:n,title:r,genres:t,year:i,vote:o}))))).then((e=>{e.forEach((e=>{1===e.genres.length&&(e.genres=[e.genres[0].name]),2===e.genres.length&&(e.genres=[e.genres[0].name,e.genres[1].name]),e.genres.length>2&&(e.genres=[e.genres[0].name,e.genres[1].name,"Other"])})),(0,c.spinnerOff)(),(0,u.renderMarkupList)(d.library,e,u.markupCreating)})))}));a=t("hqPq9"),l=t("sgMsR"),o=t("krGWQ"),c=t("gzWlL"),c=t("gzWlL"),u=t("fK7aK"),u=t("fK7aK"),f=t("4AmR3"),f=t("4AmR3");t("ihsYy"),t("7jxxg"),t("ihsYy");const g=(0,o.getRefs)();async function m(){if(l.fbFilmsAuth.isLogin)try{const e=await a.fbFilmsData.getFilms(a.PLACE_W);if(e)return e}catch(e){console.log(e)}}function h(e){return e.forEach((e=>{1===e.genres.length&&(e.genres=[e.genres[0].name]),2===e.genres.length&&(e.genres=[e.genres[0].name,e.genres[1].name]),e.genres.length>2&&(e.genres=[e.genres[0].name,e.genres[1].name,"Other"])}))}l.fbFilmsAuth.isLogin&&((0,c.spinnerOn)(),(0,f.emptyLibraryHide)(),g.library.innerHTML="",m().then((({films:e})=>e.map((({id:e,posters:n,title:r,genres:t,year:i,vote:o})=>({id:e,posters:n,title:r,genres:t,year:i,vote:o}))))).then((e=>{h(e),(0,c.spinnerOff)(),(0,u.renderMarkupList)(g.library,e,u.markupCreating)}))),g.libraryBtnW.addEventListener("click",(function(){g.libraryBtnW.classList.add("current-btn"),g.libraryBtnQ.classList.remove("current-btn"),l.fbFilmsAuth.isLogin&&((0,c.spinnerOn)(),(0,f.emptyLibraryHide)(),g.library.innerHTML="",m().then((({films:e})=>e.map((({id:e,posters:n,title:r,genres:t,year:i,vote:o})=>({id:e,posters:n,title:r,genres:t,year:i,vote:o}))))).then((e=>{h(e),(0,c.spinnerOff)(),(0,u.renderMarkupList)(g.library,e,u.markupCreating)})))})),t("ihsYy");o=t("krGWQ");var b=t("2shzp"),y={};y=function e(n,r,t){function i(s,a){if(!r[s]){if(!n[s]){var l=void 0;if(!a&&l)return l(s,!0);if(o)return o(s,!0);var c=new Error("Cannot find module '"+s+"'");throw c.code="MODULE_NOT_FOUND",c}var u=r[s]={exports:{}};n[s][0].call(u.exports,(function(e){return i(n[s][1][e]||e)}),u,u.exports,e,n,r,t)}return r[s].exports}for(var o=void 0,s=0;s<t.length;s++)i(t[s]);return i}({1:[function(e,n,r){Object.defineProperty(r,"__esModule",{value:!0}),r.create=r.visible=void 0;var t=function(e){var n=arguments.length>1&&void 0!==arguments[1]&&arguments[1],r=document.createElement("div");return r.innerHTML=e.trim(),!0===n?r.children:r.firstChild},i=function(e,n){var r=e.children;return 1===r.length&&r[0].tagName===n},o=function(e){return null!=(e=e||document.querySelector(".basicLightbox"))&&!0===e.ownerDocument.body.contains(e)};r.visible=o,r.create=function(e,n){var r=function(e,n){var r=t('\n\t\t<div class="basicLightbox '.concat(n.className,'">\n\t\t\t<div class="basicLightbox__placeholder" role="dialog"></div>\n\t\t</div>\n\t')),o=r.querySelector(".basicLightbox__placeholder");e.forEach((function(e){return o.appendChild(e)}));var s=i(o,"IMG"),a=i(o,"VIDEO"),l=i(o,"IFRAME");return!0===s&&r.classList.add("basicLightbox--img"),!0===a&&r.classList.add("basicLightbox--video"),!0===l&&r.classList.add("basicLightbox--iframe"),r}(e=function(e){var n="string"==typeof e,r=e instanceof HTMLElement==1;if(!1===n&&!1===r)throw new Error("Content must be a DOM element/node or string");return!0===n?Array.from(t(e,!0)):"TEMPLATE"===e.tagName?[e.content.cloneNode(!0)]:Array.from(e.children)}(e),n=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(null==(e=Object.assign({},e)).closable&&(e.closable=!0),null==e.className&&(e.className=""),null==e.onShow&&(e.onShow=function(){}),null==e.onClose&&(e.onClose=function(){}),"boolean"!=typeof e.closable)throw new Error("Property `closable` must be a boolean");if("string"!=typeof e.className)throw new Error("Property `className` must be a string");if("function"!=typeof e.onShow)throw new Error("Property `onShow` must be a function");if("function"!=typeof e.onClose)throw new Error("Property `onClose` must be a function");return e}(n)),s=function(e){return!1!==n.onClose(a)&&function(e,n){return e.classList.remove("basicLightbox--visible"),setTimeout((function(){return!1===o(e)||e.parentElement.removeChild(e),n()}),410),!0}(r,(function(){if("function"==typeof e)return e(a)}))};!0===n.closable&&r.addEventListener("click",(function(e){e.target===r&&s()}));var a={element:function(){return r},visible:function(){return o(r)},show:function(e){return!1!==n.onShow(a)&&function(e,n){return document.body.appendChild(e),setTimeout((function(){requestAnimationFrame((function(){return e.classList.add("basicLightbox--visible"),n()}))}),10),!0}(r,(function(){if("function"==typeof e)return e(a)}))},close:s};return a}},{}]},{},[1])(1),t("4Dq8E");(0,o.getRefs)();const p=new class{async showTrailer(){try{const e=await this.fetchTrailer();if(0===e.length||void 0===e)return console.log(e.length),void alert("Sorry, trailer not found.");let n="";e.forEach((e=>{"Trailer"===e.type&&e.name.includes("Official")&&(n=e.key)})),n||(n=e[0].key);y.create(`\n                <div>\n                    <iframe class="youtube-modal" src="https://www.youtube.com/embed/${n}" frameborder="0" allowfullscreen></iframe>\n                </div>\n            `).show()}catch(e){alert("Sorry, trailer not found.")}}async fetchTrailer(){const e=`https://api.themoviedb.org/3/movie/${this.filmID}/videos?api_key=c1b8c874be54ebc5c34c225dbd6a36f5&language=en-US`;return(await b.default.get(e)).data.results}constructor(){this.filmID=0}};let v;v=document.querySelector(".testplayer"),v.addEventListener("click",(function(e){p.filmID=593643,p.showTrailer()}));
//# sourceMappingURL=library.feaa71d0.js.map
