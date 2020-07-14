// UI Controller
const UIController = (() => {

  let DOMStrings = {
    sidenav: '.dashboard-box',
    icons: '.dash-icons',
    topnav: '.dashboard__nav',
    togglecontainer: '.sidenav',
    orderBox: '.dash__orders',
    orderIcon: '.fa-utensils-alt',
    tabsContainer: '.dash__tabs'
  }

  return {
    activeClass: () => {
      let activeBox = document.querySelector(DOMStrings.sidenav);
      const icons = document.querySelectorAll(DOMStrings.icons);
      let iconArr = Array.from(icons);

      iconArr.forEach(el => {
        el.addEventListener('click', function () {
          let current = document.getElementsByClassName("active");
          current[0].className = current[0].className.replace(" active", "");
          this.className += " active";
        });
      });
    },

    toggle: () => {
      let container = document.querySelector(DOMStrings.togglecontainer);
      let toggle = document.querySelector('.sidenav__toggle-box');
      let text = document.querySelectorAll('.sidenav__img--name');
      let tabBox = document.querySelectorAll(DOMStrings.tabsContainer);
      const tabsArr = Array.from(tabBox);
      let ordersNav = document.querySelector(DOMStrings.orderBox);
      const orderBtn = document.querySelector(DOMStrings.orderIcon);
      let truthy = true;

      function toggleMobile() {
        if (truthy) {
          ordersNav.style.left = '-100%';
          orderBtn.style.transform = 'rotate(180deg)';
          truthy = false;
        } else {
          ordersNav.style.left = '100%';
          orderBtn.style.transform = 'rotate(0)';
          truthy = true;
        }
      }


      function toggleDesktop() {
        if (truthy) {
          ordersNav.style.right = '0';
          orderBtn.style.transform = 'rotate(180deg)';
          for (let cur of tabsArr) {
            cur.style.width = '60%';
          }
          truthy = false;
        } else {
          ordersNav.style.right = '-100%';
          orderBtn.style.transform = 'rotate(0)';
          truthy = true;
          for (let cur of tabsArr) {
            cur.style.width = '80%';
          }
        }
      }

      orderBtn.addEventListener('click', () => {
        const media = window.matchMedia("(min-width: 1201px)");
        if (!media.matches) {
          toggleMobile();
          console.log('i am mobile')
        } else {
          toggleDesktop();
          console.log('i am desktop')
        }
      })

      toggle.addEventListener('click', () => {

        if (truthy) {
          container.style.width = '10rem';
          toggle.style.transform = 'rotate(360deg)';
          text.forEach((el) => el.style.height = '0');
          truthy = false;
        } else {
          container.style.width = '15rem';
          toggle.style.transform = 'rotate(0)';
          text.forEach((el) => el.style.height = '1.5rem');
          truthy = true;
        }

      });
      let bars = document.querySelector('.toggle-rightbar-1');
      bars.addEventListener('click', () => {
          
        if (container.style.left === '-100%') {
          container.style.left = '-.8rem';
          bars.className = 'fad fa-times toggle-rightbar toggle-rightbar-1';
        } else {
          container.style.left = '-100%';
          bars.className = 'fad fa-bars toggle-rightbar toggle-rightbar-1';
          
        }

      });
    },
    openCity: (evt, cityName) => {
      console.log('i was clicked')
      let i, tabcontent, tablinks;
      tabcontent = document.getElementsByClassName("tabcontent");
      for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
      }
      tablinks = document.getElementsByClassName("dash-icons");
      for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
      }
      document.getElementById(cityName).style.display = "block";
      evt.currentTarget.className += " active";
    }
  }

})();



const controller = ((UICtrl) => {
  

  return {
    init: () => {
      document.getElementById("defaultOpen").click();
      console.log('Application has started!');
      UICtrl.toggle();
      // UICtrl.onScroll();
    }
  }

})(UIController);

controller.init();