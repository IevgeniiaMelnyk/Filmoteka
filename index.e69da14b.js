!function(){var e={openModalBtn:document.querySelector("[data-modal-open]"),closeModalBtn:document.querySelector("[data-modal-footer-close]"),modal:document.querySelector("[data-modal-footer]")};function d(){e.modal.classList.add("is-hidden"),window.removeEventListener("keydown",o)}function o(e){e.code,d()}e.openModalBtn.addEventListener("click",(function(){e.modal.classList.remove("is-hidden"),window.addEventListener("keydown",o)})),e.closeModalBtn.addEventListener("click",d),e.modal.addEventListener("click",(function(d){d.target===d.currentTarget&&e.modal.classList.add("is-hidden")}))}();
//# sourceMappingURL=index.e69da14b.js.map
