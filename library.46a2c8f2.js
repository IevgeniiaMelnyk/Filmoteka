var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},r={},n={},t=e.parcelRequired7c6;null==t&&((t=function(e){if(e in r)return r[e].exports;if(e in n){var t=n[e];delete n[e];var i={id:e,exports:{}};return r[e]=i,t.call(i.exports,i,i.exports),i.exports}var s=new Error("Cannot find module '"+e+"'");throw s.code="MODULE_NOT_FOUND",s}).register=function(e,r){n[e]=r},e.parcelRequired7c6=t),t("krGWQ"),t("4aPXr");var i=t("4aPXr"),s=t("krGWQ");const a=new(0,i.SStorage);(0,s.getRefs)().libraryLogo.addEventListener("click",(function(){a.clear()})),t("2lP43"),t("3tw01"),t("cgCOF");document.querySelector(".need-register");var l=t("hqPq9"),g=t("sgMsR"),o=(s=t("krGWQ"),t("gzWlL")),c=(o=t("gzWlL"),t("fK7aK")),f=(c=t("fK7aK"),t("4AmR3"));f=t("4AmR3");const d=(0,s.getRefs)();d.libraryBtnQ.addEventListener("click",(function(){d.libraryBtnW.classList.remove("current-btn"),d.libraryBtnQ.classList.add("current-btn"),g.fbFilmsAuth.isLogin&&(d.library.classList.add("min-height"),(0,o.spinnerOn)(),(0,f.emptyLibraryHide)(),d.library.innerHTML="",async function(){if(g.fbFilmsAuth.isLogin)try{const e=await l.fbFilmsData.getFilms(l.PLACE_Q);if(e)return e}catch(e){console.log(e)}}().then((({films:e})=>e.map((({id:e,posters:r,title:n,genres:t,year:i,vote:s})=>({id:e,posters:r,title:n,genres:t,year:i,vote:s}))))).then((e=>{0!==e.length&&(e.forEach((e=>{1===e.genres.length&&(e.genres=[e.genres[0].name]),2===e.genres.length&&(e.genres=[e.genres[0].name,e.genres[1].name]),e.genres.length>2&&(e.genres=[e.genres[0].name,e.genres[1].name,"Other"])})),(0,o.spinnerOff)(),(0,c.renderMarkupList)(d.library,e,c.markupCreating)),0===e.length&&(d.library.classList.remove("min-height"),(0,o.spinnerOff)(),(0,f.emptyLibraryShow)())})))}));l=t("hqPq9"),g=t("sgMsR"),s=t("krGWQ"),o=t("gzWlL"),o=t("gzWlL"),c=t("fK7aK"),c=t("fK7aK"),f=t("4AmR3"),f=t("4AmR3");t("ihsYy"),t("7jxxg"),t("ihsYy");const h=(0,s.getRefs)();async function m(){if(g.fbFilmsAuth.isLogin)try{const e=await l.fbFilmsData.getFilms(l.PLACE_W);if(e)return e}catch(e){console.log(e)}}function y(e){return e.forEach((e=>{1===e.genres.length&&(e.genres=[e.genres[0].name]),2===e.genres.length&&(e.genres=[e.genres[0].name,e.genres[1].name]),e.genres.length>2&&(e.genres=[e.genres[0].name,e.genres[1].name,"Other"])}))}h.libraryBtnW.addEventListener("click",(function(){h.libraryBtnW.classList.add("current-btn"),h.libraryBtnQ.classList.remove("current-btn"),g.fbFilmsAuth.isLogin&&(h.library.classList.add("min-height"),(0,o.spinnerOn)(),(0,f.emptyLibraryHide)(),h.library.innerHTML="",m().then((({films:e})=>e.map((({id:e,posters:r,title:n,genres:t,year:i,vote:s})=>({id:e,posters:r,title:n,genres:t,year:i,vote:s}))))).then((e=>{0!==e.length&&(y(e),(0,o.spinnerOff)(),(0,c.renderMarkupList)(h.library,e,c.markupCreating)),0===e.length&&(h.library.classList.remove("min-height"),(0,o.spinnerOff)(),(0,f.emptyLibraryShow)())})))})),t("ihsYy");new(0,t("6sNdw").default);
//# sourceMappingURL=library.46a2c8f2.js.map
