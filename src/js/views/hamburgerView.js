import View from "./View";

class HamburgerView extends View {
  hamburgerBtn = document.querySelector(".nav__hamburger");
  sidebar = document.querySelector(".sidebar");
  closeSidebarBtn = document.querySelector(".btn--close-sidebar");
  overlay = document.querySelector(".overlay");

  renderSidebar(visible) {
    if (visible) {
      sidebar.classList.add("visible");
      overlay.classList.add("visible");
    } else {
      sidebar.classList.remove("visible");
      overlay.classList.remove("visible");
    }
  }

  addHandlerHamburger(handler) {
    hamburgerBtn.addEventListener("click", handler);
    closeSidebarBtn.addEventListener("click", handler);
    overlay.addEventListener("click", handler);
  }
}

export default new HamburgerView();
