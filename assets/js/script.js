// UI Controller
const UIController = (() => {

  let DOMStrings = {
    sidenav: '.dashboard-box',
    icons: '.dash-icons',
    topnav: '.dashboard__nav',
    togglecontainer: '.sidenav',
    orderBox: '.dash__orders',
    orderIcon: '.fa-utensils-alt',
    tabsContainer: '.dash__tabs',
    toggle: '.sidenav__toggle-box',
    toggleText: '.sidenav__img--name',
    toggleMobileBtn: '.toggle-rightbar-1',
    tabs: "tabcontent",
    tabsIcons: "dash-icons",
    closeBtn: 'closeModal',
    modalContainer: '.section-modals',
    modalBox: '.section-modals-box',
    foodBtn: '.addFood',
    viewBtns: '.dash__orders--btn-view',
    acceptBtn: '.acceptBtn',
    toggleNotify: '.notiFY'
  }

  const getQuerySeletor = {
    toggleContainer: document.querySelector(DOMStrings.togglecontainer),
    toggleBtn: document.querySelector(DOMStrings.toggle),
    toggleText: document.querySelectorAll(DOMStrings.toggleText),
    TabConatiner: document.querySelectorAll(DOMStrings.tabsContainer),
    orderContainer: document.querySelector(DOMStrings.orderBox),
    orderIcons: document.querySelector(DOMStrings.orderIcon),
    mobileToggle: document.querySelector(DOMStrings.toggleMobileBtn),
    tabsContainer: document.getElementsByClassName(DOMStrings.tabs),
    tabsIcons: document.getElementsByClassName(DOMStrings.tabsIcons),
    close: document.getElementsByClassName(DOMStrings.closeBtn),
    modal: document.querySelector(DOMStrings.modalContainer),
    foodToggle: document.querySelectorAll(DOMStrings.foodBtn),
    viewIcons: document.querySelectorAll(DOMStrings.viewBtns),
    acceptToggle: document.querySelectorAll(DOMStrings.acceptBtn),
    modalBoxes: Array.from(document.querySelectorAll(DOMStrings.modalBox)),
    notification: document.querySelectorAll(DOMStrings.toggleNotify)
  };

  let container, toggle, text, tabBox, ordersNav, truthy, viewBtns, close, overlay, tabsArr, foodBtn, media, i, tabcontent, tablinks, notificationBtn;
  container = getQuerySeletor.toggleContainer;
  toggle = getQuerySeletor.toggleBtn;
  text = getQuerySeletor.toggleText;
  tabBox = getQuerySeletor.tabsContainer;
  ordersNav = getQuerySeletor.orderContainer;
  orderBtn = getQuerySeletor.orderIcons;
  overlay = getQuerySeletor.overlayBG;
  modalContainerBox = getQuerySeletor.modal;
  tabcontent = getQuerySeletor.tabsContainer;
  tablinks = getQuerySeletor.tabsIcons;
  notificationBtn = getQuerySeletor.notification;
  viewToggleBtn = Array.from(getQuerySeletor.viewIcons);
  tabsArr = Array.from(tabBox);
  foodBtn = Array.from(getQuerySeletor.foodToggle);
  close = Array.from(getQuerySeletor.close);
  acceptBtns = Array.from(getQuerySeletor.acceptToggle);
  media = window.matchMedia("(min-width: 1201px)");
  truthy = true;
  const svg = document.getElementsByClassName('svgs');
  const validator = document.getElementById('invalid');

  const toggleMobile = () => {
    if (truthy) {
      ordersNav.classList.add('oppLeft');
      orderBtn.classList.add('rotate');
      truthy = false;
    } else {
      ordersNav.classList.remove('oppLeft');
      orderBtn.classList.remove('rotate');
      truthy = true;
    }
  }

  {
    let slider, output;
    slider = document.getElementById("myRange");
    output = document.getElementById("demo");
    output.innerHTML = slider.value;

    slider.oninput = function() {
      output.value = this.value
    };
  }


  const toggleDesktop = () => {
    if (truthy) {
      ordersNav.classList.add('oppRight');
      orderBtn.classList.add('rotate');
      for (let cur of tabsArr) {
        cur.classList.add('w-80');
      }
      truthy = false;
    } else {
      ordersNav.classList.remove('oppRight');
      orderBtn.classList.remove('rotate');
      for (let cur of tabsArr) {
        cur.classList.remove('w-80');
      }
      truthy = true;
    }
  }

  const closeBars = () => {
    if (truthy) {
      for (let cur of tabsArr) {
        if (!media.matches) {
          cur.classList.add('w-90');
        } else {
          cur.classList.remove('w-90');
          cur.classList.add('w-80');
          truthy = true;
          toggleDesktop();
        }
      }
    }
  }

  const toggleFood = () => {
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].classList.remove('active');
      tablinks[1].classList.add('active');
    }

    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
      tabcontent[1].style.display = "block";
    }
  }

  viewToggleBtn.forEach(el => {
    el.addEventListener('click', () => {
      toggleFood();
      if (!media.matches) {
        toggleMobile();
      } else {
        closeBars();
      }
    });
  });


  acceptBtns.forEach(el => el.addEventListener('click', () => {
    modalContainerBox.classList.add('is-visible');
    getQuerySeletor.modalBoxes[3].classList.add('is-visible');
  }));

  notificationBtn.forEach(el => {
    el.addEventListener('click', () => {
      modalContainerBox.classList.add('is-visible');
      getQuerySeletor.modalBoxes[1].classList.add('is-visible');
    });
  });

  const submit = document.getElementById('submitBtn');
  submit.addEventListener('click', (e) => {
    e.preventDefault();

    const input = Array.from(document.querySelectorAll('.formInput'));

    for (let i = 0; i < input.length; i++) {
      if (input[i].value <= 10 || input[i].value === '') {
        validator.classList.add('is-visible');
      } else {
        getQuerySeletor.modalBoxes[3].classList.remove('is-visible');
        getQuerySeletor.modalBoxes[2].classList.add('is-visible');
        for (let i = 0; i < svg.length; i++) {
          svg[i].style.transform = 'scale(1)';
        }
        input[i].value = 0;
        input[i].style.border = "1px solid #d2d2d2 !important";
      }
    }
  });


  return {
    toggle: () => {
      orderBtn.addEventListener('click', () => {
        if (!media.matches) {
          toggleMobile();
        } else {
          toggleDesktop();
        }
      })

      toggle.addEventListener('click', () => {
        if (truthy) {
          container.classList.add('w-10');
          toggle.style.transform = 'rotate(360deg)';
          text.forEach((el) => el.classList.add('h-0'));
          truthy = false;
        } else {
          container.classList.remove('w-10');
          toggle.style.transform = 'rotate(0)';
          text.forEach((el) => el.classList.remove('h-0'));
          truthy = true;
        }

      });


      let bars = getQuerySeletor.mobileToggle;
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

    openTab: (evt, cityName) => {
      for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
      }

      for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
      }


      if (!media.matches) {
        for (i = 0; i < tablinks.length; i++) {
          tablinks[i].addEventListener('click', () => {
            getQuerySeletor.toggleContainer.style.left = '-100%';
            getQuerySeletor.mobileToggle.className = 'fad fa-bars toggle-rightbar toggle-rightbar-1';
          });
        }
      }

      tablinks[1].addEventListener('click', () => {
        closeBars();
      });

      tablinks[2].addEventListener('click', () => {
        closeBars();
      });

      document.getElementById(cityName).style.display = "block";
      evt.currentTarget.className += " active";
    },

    foodTab: () => {
      toggleFood();
    },

    modal: () => {
      foodBtn.forEach(el => {
        el.addEventListener('click', () => {
          modalContainerBox.classList.add('is-visible');
          getQuerySeletor.modalBoxes[0].classList.add('is-visible');
        });
      });

      close.forEach(el => {
        el.addEventListener('click', () => {
          for (let i = 0; i < svg.length; i++) {
            svg[i].style.transform = 'scale(0)';
          }
          validator.classList.remove('is-visible');
          modalContainerBox.classList.remove('is-visible');
          getQuerySeletor.modalBoxes.forEach(el => el.classList.remove('is-visible'));
        });
      });
    }
  }

})();



const controller = ((UICtrl) => {

  // Charts 

  var ctx = document.getElementById('myChart').getContext('2d');
  var ctx2 = document.getElementById('myChart2').getContext('2d');
  var ctx3 = document.getElementById('myChart3').getContext('2d');
  var ctx4 = document.getElementById('myChart4').getContext('2d');
  let defaults = Chart.defaults.global;
  defaults.defaultFontFamily = 'Poppins';
  defaults.defaultFontSize = 12;
  defaults.defaultFontColor = '#777';

  let myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June'],
      datasets: [{
        label: ['Completed Transcations'],
        data: [12, 19, 3, 8, 2, 11],
        backgroundColor: [
          'rgba(236, 134, 51, .8)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 3,
      }]
    },
    options: {
      title: {
        display: true,
        text: `Average Completed Transcation for ${new Date().toLocaleDateString()}`,
        fontSize: 20,

      },
      legend: {
        display: false,
      },

      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });

  let myChart2 = new Chart(ctx2, {
    type: 'pie',
    data: {
      labels: ['Excellent', 'Good', 'Fair', 'Bad'],
      datasets: [{
        data: [12, 19, 8, 3],
        backgroundColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)',
          'rgb(247, 9, 9)'
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)',
          'rgb(247, 9, 9)'
        ],
        borderWidth: 3,
      }]
    },
    options: {
      legend: {
        display: true,
        position: 'left'
      },
    }
  });

  let myChart3 = new Chart(ctx3, {
    type: 'horizontalBar',
    data: {
      labels: ['Excellent', 'Good', 'Fair', 'Bad'],
      datasets: [{
        data: [19, 12, 8, 3],
        backgroundColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)',
          'rgb(247, 9, 9)'
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)',
          'rgb(247, 9, 9)'
        ],
        borderWidth: 3,
      }]
    },
    options: {
      legend: {
        display: false,
      },
    }
  });

  let myChart4 = new Chart(ctx4, {
    type: 'doughnut',
    data: {
      labels: ['Excellent', 'Good', 'Fair', 'Bad'],
      datasets: [{
        data: [19, 12, 8, 3],
        backgroundColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)',
          'rgb(247, 9, 9)'
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)',
          'rgb(247, 9, 9)'
        ],
        borderWidth: 3,
      }]
    },
    options: {
      legend: {
        display: true,
        position: 'left'
      },
    }
  });

  return {
    init: () => {
      document.getElementById("defaultOpen").click();
      console.log('Application has started!');
      UICtrl.toggle();
      UICtrl.modal();
    }
  }

})(UIController);

controller.init();