function e(){return{gallery:document.querySelector(".gallery"),search:document.getElementById("search-form"),mBtnToQueue:document.querySelector(".add-to-queue-btn"),nBtnToWatched:document.querySelector(".add-to-watched-btn"),filmotekaLogo:document.querySelector(".header__logo-filmoteka"),modal:document.querySelector("[data-modal-film]"),modalFilmWrapper:document.querySelector("#data-modal-film-wrapper"),closeModalBtn:document.querySelector("[data-modal-close]"),spinner:document.querySelector(".loader"),buttonUp:document.querySelector(".up-button"),message:document.querySelector(".failure-message"),searchError:document.querySelector(".search-error"),emptyLibraryError:document.querySelector(".empty-library-error"),autofocusBtn:document.querySelector(".input-autofocus-btn"),home:document.getElementById("home"),library:document.getElementById("library"),input:document.querySelector(".header__input"),modeButton:document.querySelector(".toggle-theme-btn"),moon:document.querySelector(".moon"),sun:document.querySelector(".sun"),loginModal:document.querySelector(".modallogin"),regModal:document.querySelector(".modalreg"),loginForm:document.querySelector(".login-form"),regForm:document.querySelector(".reg-form"),loginFormBtn:document.querySelector(".logbtn"),regFormBtn:document.querySelector(".regbtn"),tuiContainer:document.getElementById("tui-pagination-container"),galleryPosterTitle:document.querySelector(".gallery-poster-title"),signOut:document.querySelector("#signout"),signUp:document.querySelector("#signup"),signIn:document.querySelector("#signin"),userIcon:document.querySelector("#usericon"),libraryLogo:document.querySelector(".header__logo-library")}}const o=new class{save(e,o){try{const t=JSON.stringify(o);sessionStorage.setItem(e,t)}catch(e){console.error("Set state error: ",e.message)}}get(e){try{const o=sessionStorage.getItem(e);return JSON.parse(o)}catch(e){console.error("Get state error: ",e.message)}}load(e){try{const o=sessionStorage.getItem(e);return null===o?void 0:JSON.parse(o)}catch(e){console.error("Get state error: ",e.message)}}remove(e){try{sessionStorage.removeItem(e)}catch(e){console.error("Get state error: ",e.message)}}clear(){try{sessionStorage.clear()}catch(e){console.error("Get state error: ",e.message)}}constructor(){}};e().libraryLogo.addEventListener("click",(function(){o.clear()}));const t=e();t.modeButton.addEventListener("click",(function(){document.body.classList.contains("moon")?(document.body.classList.remove("moon"),t.moon.classList.add("visually-hidden"),t.sun.classList.remove("visually-hidden"),localStorage.setItem("mode",!1)):(document.body.classList.add("moon"),localStorage.setItem("mode","moon"),t.sun.classList.add("visually-hidden"),t.moon.classList.remove("visually-hidden"))})),"moon"===localStorage.getItem("mode")&&(document.body.classList.add("moon"),t.sun.classList.add("visually-hidden"),t.moon.classList.remove("visually-hidden"));({el:e().buttonUp,show(){this.el.classList.remove("up-button_hiden")},hide(){this.el.classList.add("up-button_hiden")},addEventListener(){window.addEventListener("scroll",(()=>{(window.scrollY||document.documentElement.scrollTop)>400?this.show():this.hide()})),document.querySelector(".up-button").onclick=()=>{window.scrollTo({top:0,left:0,behavior:"smooth"})}}}).addEventListener();
//# sourceMappingURL=library.f1de4fb8.js.map