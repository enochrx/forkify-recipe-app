import View from "./View";
import icons from "url:../../img/icons.svg";

class HamburgerView extends View {
  _sidebar = document.querySelector(".sidebar");
  closeSidebarBtn = document.querySelector(".btn--close-sidebar");
  _parentElement = document.querySelector(".nav__mobile");
  hamburger = document.querySelector(".nav__hamburger");
  navMobile = document.querySelector(".nav__mobile");
  container = document.querySelector(".recipe");
  constructor() {
    super();
    // this.addhandlerHam();
    // this.addHandlerCont();
    // this.addHandlerEsc();
  }

  //   renderSidebar() {
  //     const markup = `

  //     <div class="sidebar">
  //       <ul class="sidebar__list">
  //       <li class="nav__item">
  //           <button class="nav__btn nav__btn--add-recipe">
  //             <svg class="nav__icon">
  //               <use href="${icons}#icon-edit"></use>
  //           </svg>
  //           <span>Add recipe</span>
  //         </button>
  //       </li>
  //       <li class="nav__item">
  //         <button class="nav__btn nav__btn--bookmarks">
  //           <svg class="nav__icon">
  //             <use href="${icons}#icon-bookmark"></use>
  //           </svg>
  //           <span>Bookmarks</span>
  //         </button>
  //         <div class="bookmarks">
  //           <ul class="bookmarks__list">
  //             <div class="message">
  //               <div>
  //                 <svg>
  //                   <use href="${icons}#icon-smile"></use>
  //                 </svg>
  //               </div>
  //               <p>
  //                 No bookmarks yet. Find a nice recipe and bookmark it :)
  //               </p>
  //             </div>

  //             <!-- <li class="preview">
  //               <a class="preview__link" href="#23456">
  //                 <figure class="preview__fig">
  //                   <img src="src/img/test-1.jpg" alt="Test" />
  //                 </figure>
  //                 <div class="preview__data">
  //                   <h4 class="preview__name">
  //                     Pasta with Tomato Cream ...
  //                   </h4>
  //                   <p class="preview__publisher">The Pioneer Woman</p>
  //                 </div>
  //               </a>
  //             </li> -->
  //           </ul>
  //         </div>
  //       </li>
  //       <li class="nav__item">
  //         <button class="nav__btn nav__btn--shopping-list">
  //           <div class="nav__icon">
  //             <svg>
  //               <use href="${icons}#icon-list"></use>
  //             </svg>
  //             <span class="shop__count">0</span>
  //           </div>
  //           <span>Shopping</span>
  //         </button>
  //         <div class="shop">
  //           <ul class="shop__list">
  //             <div class="message">
  //               <div>
  //                 <svg>
  //                   <use href="${icons}#icon-smile"></use>
  //                 </svg>
  //               </div>
  //               <p>Create your shopping cart here...</p>
  //             </div>

  //               <!-- <li>
  //                <p><span class="remove__ingredient">&#10005;</span><span>125 g</span> ball mozzarella torn into pieces</p>
  //               <hr />
  //             </li> -->
  //             <!-- <div class="shop__btn">
  //               <button class="btn--small recipe__btn shop__btn__clear">
  //                 <span>&#10005;</span>
  //                 <span>Clear list</span>
  //               </button>
  //               <button class="btn--small recipe__btn buy--now">
  //                 <svg>
  //                   <use href="${icons}#icon-buy"></use>
  //                 </svg>
  //                 <span>Buy Now</span>
  //               </button>
  //             </div> -->
  //       </li>
  //       </ul>
  //     </div>

  // `;

  //     this._parentElement.insertAdjacentHTML("beforeend", markup);
  //   }

  // addhandlerHam() {
  //   this.hamburger.addEventListener("click", e => {
  //     const btn = e.target.closest(".nav__hamburger");
  //     if (!btn) return;

  //     if (this.hamburger.classList.toggle("active")) this.renderSidebar();
  //     this.navMobile.classList.toggle("active");
  //   });
  // }

  // addHandlerCont() {
  //   this.container.addEventListener("click", () => {
  //     this.hamburger.classList.remove("active");
  //     this.navMobile.classList.remove("active");
  //   });
  // }

  // addHandlerEsc() {
  //   document.addEventListener("keydown", e => {
  //     if (e.key === "Escape") hamburger.classList.remove("active");
  //     navMobile.classList.remove("active");
  //   });
  // }
}

export default new HamburgerView();
