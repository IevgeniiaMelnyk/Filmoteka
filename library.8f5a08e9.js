!function(){function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},r={},a=t.parcelRequired7c6;null==a&&((a=function(e){if(e in n)return n[e].exports;if(e in r){var t=r[e];delete r[e];var a={id:e,exports:{}};return n[e]=a,t.call(a.exports,a,a.exports),a.exports}var s=new Error("Cannot find module '"+e+"'");throw s.code="MODULE_NOT_FOUND",s}).register=function(e,t){r[e]=t},t.parcelRequired7c6=a),a("4Nugj"),a("cP2Tz");var s=a("cP2Tz"),i=a("4Nugj"),c=new(0,s.SStorage);(0,i.getRefs)().libraryLogo.addEventListener("click",(function(){c.clear()})),a("KXFuB"),a("e3MQG"),a("cFCN7"),a("lx5Y0");var o=a("bpxeT"),l=a("2TvXO"),d=a("lRkNt"),u=a("5uvrp"),p=(i=a("4Nugj"),a("ilDAP")),f=(p=a("ilDAP"),a("kyTY7")),g=(f=a("kyTY7"),a("g1n8n")),m=(g=a("g1n8n"),(0,i.getRefs)());function b(){m.libraryBtnW.classList.remove("current-btn"),m.libraryBtnQ.classList.add("current-btn"),u.fbFilmsAuth.isLogin&&(m.library.classList.add("min-height"),(0,p.spinnerOn)(),(0,g.emptyLibraryHide)(),m.library.innerHTML="",function(){return h.apply(this,arguments)}().then((function(e){return e.films.map((function(e){return{id:e.id,posters:e.posters,title:e.title,genres:e.genres,year:e.year,vote:e.vote}}))})).then((function(e){0!==e.length&&(e.forEach((function(e){1===e.genres.length&&(e.genres=[e.genres[0].name]),2===e.genres.length&&(e.genres=[e.genres[0].name,e.genres[1].name]),e.genres.length>2&&(e.genres=[e.genres[0].name,e.genres[1].name,"Other"])})),(0,p.spinnerOff)(),(0,f.renderMarkupList)(m.library,e,f.markupCreating)),0===e.length&&(m.library.classList.remove("min-height"),(0,p.spinnerOff)(),(0,g.emptyLibraryShow)())})))}function h(){return(h=e(o)(e(l).mark((function t(){var n;return e(l).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!u.fbFilmsAuth.isLogin){e.next=12;break}return e.prev=1,e.next=4,d.fbFilmsData.getFilms(d.PLACE_Q);case 4:if(!(n=e.sent)){e.next=7;break}return e.abrupt("return",n);case 7:e.next=12;break;case 9:e.prev=9,e.t0=e.catch(1),console.log(e.t0);case 12:case"end":return e.stop()}}),t,null,[[1,9]])})))).apply(this,arguments)}m.libraryBtnQ.addEventListener("click",b);o=a("bpxeT"),l=a("2TvXO"),d=a("lRkNt"),u=a("5uvrp"),i=a("4Nugj"),p=a("ilDAP"),p=a("ilDAP"),f=a("kyTY7"),f=a("kyTY7"),g=a("g1n8n"),g=a("g1n8n");a("4zSSb"),a("53Mtm"),a("4zSSb");var v=(0,i.getRefs)();function y(){v.libraryBtnW.classList.add("current-btn"),v.libraryBtnQ.classList.remove("current-btn"),u.fbFilmsAuth.isLogin&&(v.library.classList.add("min-height"),(0,p.spinnerOn)(),(0,g.emptyLibraryHide)(),v.library.innerHTML="",function(){return L.apply(this,arguments)}().then((function(e){return e.films.map((function(e){return{id:e.id,posters:e.posters,title:e.title,genres:e.genres,year:e.year,vote:e.vote}}))})).then((function(e){0!==e.length&&(e.forEach((function(e){1===e.genres.length&&(e.genres=[e.genres[0].name]),2===e.genres.length&&(e.genres=[e.genres[0].name,e.genres[1].name]),e.genres.length>2&&(e.genres=[e.genres[0].name,e.genres[1].name,"Other"])})),(0,p.spinnerOff)(),(0,f.renderMarkupList)(v.library,e,f.markupCreating)),0===e.length&&(v.library.classList.remove("min-height"),(0,p.spinnerOff)(),(0,g.emptyLibraryShow)())})))}function L(){return(L=e(o)(e(l).mark((function t(){var n;return e(l).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!u.fbFilmsAuth.isLogin){e.next=12;break}return e.prev=1,e.next=4,d.fbFilmsData.getFilms(d.PLACE_W);case 4:if(!(n=e.sent)){e.next=7;break}return e.abrupt("return",n);case 7:e.next=12;break;case 9:e.prev=9,e.t0=e.catch(1),console.log(e.t0);case 12:case"end":return e.stop()}}),t,null,[[1,9]])})))).apply(this,arguments)}v.libraryBtnW.addEventListener("click",y),a("4zSSb");o=a("bpxeT"),l=a("2TvXO"),i=a("4Nugj");var w=a("aYHWX");var x=a("5ibPU"),k=a("4DLKi");a("5uvrp");d=a("lRkNt");var F=new(0,a("glS4B").default),T=(0,i.getRefs)(),E=new(0,w.default),q=null;!function(){function t(e){return n.apply(this,arguments)}function n(){return(n=e(o)(e(l).mark((function t(n){var r;return e(l).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!n.target.classList.contains("remove-from-watched")){e.next=8;break}return e.next=3,d.fbFilmsData.removeFilm(q,"WA");case 3:e.sent,(0,k.addMod)(n.target,"watched"),y(),e.next=17;break;case 8:if(!n.target.classList.contains("add-to-watched")){e.next=17;break}return e.next=11,E.getById(q);case 11:return r=e.sent,e.next=14,d.fbFilmsData.writeTo(r,"WA");case 14:e.sent,(0,k.removeMod)(n.target,"watched"),y();case 17:case"end":return e.stop()}}),t)})))).apply(this,arguments)}function r(e){return a.apply(this,arguments)}function a(){return(a=e(o)(e(l).mark((function t(n){var r;return e(l).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!n.target.classList.contains("remove-from-queue")){e.next=8;break}return e.next=3,d.fbFilmsData.removeFilm(q,"QU");case 3:e.sent,(0,k.addMod)(n.target,"queue"),b(),e.next=17;break;case 8:if(!n.target.classList.contains("add-to-queue")){e.next=17;break}return e.next=11,E.getById(q);case 11:return r=e.sent,e.next=14,d.fbFilmsData.writeTo(r,"QU");case 14:e.sent,(0,k.removeMod)(n.target,"queue"),y();case 17:case"end":return e.stop()}}),t)})))).apply(this,arguments)}function s(e){u()}function i(e){"Escape"===e.key&&(u(),document.removeEventListener("keydown",i))}function c(e){e.target===e.currentTarget&&(u(),T.modal.removeEventListener("click",c))}function u(){document.body.classList.toggle("modal-open"),T.modal.classList.toggle("is_hidden")}function p(e){F.filmID=q,F.showTrailer(),s()}T.library.addEventListener("click",(function(e){var n=e.target.hasAttribute("data-id");if(q=e.target.dataset.id,e.target===e.currentTarget)return;if(!1===n)return;T.modalFilmWrapper.innerHTML="",document.addEventListener("keydown",i),T.modal.addEventListener("click",c),u(),E.getById(q).then((function(e){var n,a,s,i,c,o,l,u,f,g,m,b;e,n=T.modalFilmWrapper,i=(s=e).title,c=s.vote,o=s.votes,l=s.popularity,u=s.original_title,f=s.genres,g=s.about,s.poster_path,m=s.posters,s.year,b=f.map((function(e){return e.name})).join(", "),a='<div class="modal-container">\n        <div class="poster-thumb">\n          <picture>\n              <source\n              srcset="\n              '.concat(m[4].path," 1x,\n              ").concat(m[5].path,' 2x\n              "\n              media="(min-width: 1200px)"\n            />\n              <source\n              srcset="\n              ').concat(m[3].path," 1x,\n              ").concat(m[4].path,' 2x\n              "\n              media="(min-width: 768px)"\n            />\n              <source\n              srcset="\n              ').concat(m[3].path," 1x,\n              ").concat(m[4].path,' 2x\n              "\n              media="(max-width: 767px)"\n            />\n  \n            <img\n              class="movie-poster"\n              src="').concat(m[3].path,'"\n              alt="').concat(i,'"\n  \n              loading="lazy"\n            />\n          </picture>\n          <div class="trailer-overlay">\n          <button type="button" class="trailer-play-btn">\n          &#9655;\n              </button>\n          \n          </div>\n        </div>\n  \n        <div>\n          <table class="info">\n            <caption class="movie-title">\n            ').concat(i.toUpperCase(),'\n            </caption>\n            <tbody>\n              <tr class="table-row">\n                <td class="td">\n                  <p class="characteristic">Vote / Votes</p>\n                </td>\n                <td class="description">\n                  <span class="vote">').concat(c,' </span> &nbsp;\n                  <span class="characteristic">/</span> ').concat(o,'\n                </td>\n              </tr>\n              <tr class="table-row">\n                <td class="td">\n                  <p class="characteristic">Popularity</p>\n                </td>\n                <td class="description">').concat(l,'</td>\n              </tr>\n              <tr class="table-row">\n                <td class="td">\n                  <p class="characteristic">Original Title</p>\n                </td>\n                <td class="description">').concat(u.toUpperCase(),'</td>\n              </tr>\n              <tr class="table-row">\n                <td class="td">\n                  <p class="characteristic">Genre</p>\n                </td>\n                <td class="description">').concat(b,'</td>\n              </tr>\n            </tbody>\n          </table>\n          <h3 class="about">About</h3>\n          <p class="about-descr">\n            ').concat(g,'\n          </p>\n          <div class="buttons-wrapper">\n            <button\n              type="button"\n              class="button-modal add-to-watched"\n              data-action="add-to-watched"\n            >\n            add to watched</button\n            ><button\n              type="button"\n              class="button-modal add-to-queue"\n              data-action="add-to-queue"\n            >\n            add to queue\n            </button>\n          </div>\n        </div>\n      </div>\n      '),n.insertAdjacentHTML("beforeend",a);var h=T.modalFilmWrapper.querySelector(".add-to-watched"),v=T.modalFilmWrapper.querySelector(".add-to-queue");return T.modalFilmWrapper.querySelector(".trailer-play-btn").addEventListener("click",p),h.addEventListener("click",t),v.addEventListener("click",r),d.fbFilmsData.getFilmById(q)})).then((function(e){var t=T.modalFilmWrapper.querySelector(".add-to-watched"),n=T.modalFilmWrapper.querySelector(".add-to-queue");e&&(null==e?void 0:e.place)&&(e.place==d.PLACE_W&&(0,k.removeMod)(t,"watched"),e.place==d.PLACE_Q&&(0,k.removeMod)(n,"queue"))})).catch(x.default)})),T.closeModalBtn.addEventListener("click",s)}();new(0,a("glS4B").default)}();
//# sourceMappingURL=library.8f5a08e9.js.map
