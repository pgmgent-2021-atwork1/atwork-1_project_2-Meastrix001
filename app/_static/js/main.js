const GET_EVENT_API = 'https://www.pgm.gent/data/gentsefeesten/events.json';
const GET_CATEGORIE_API = 'https://www.pgm.gent/data/gentsefeesten/categories.json';


(() => {
  const app = {
    initialize() {
      this.cacheElements();
      this.buildUI();
      this.mainMenuClickEvent();
    },

    cacheElements() {
      this.$navbarmenu = document.querySelector('.navbarmenubutton')
      this.$navbar = document.querySelector('.navbarlist')
      this.$navigateDays = document.querySelector('.header_daysmenu')
      this.$homePageHeaderEvents = document.querySelector('.header_events')
      this.$navbarimage = document.querySelector('.fullnavbar')
      this.$imageCarouselprint = document.querySelector('.carousel-images')
      this.$navbarexit = document.querySelector('.menu_exit-svg')
      this.$imgForward = document.getElementById('img-forward')
      this.$imgReverse = document.getElementById('img-back')
      this.$detailsHeader = document.querySelector('.detailsofday')
      
    },
    buildUI() {
      console.log('UI Built?');
      if (this.$navigateDays) {
        this.$navigateDays.innerHTML = this.CreateHTMLForSearchByDay()
      }
      //------------------PUT BACK ON BEFORE DEADLINE-------------------------------------------------------------------------------------
      // if (this.$homePageHeaderEvents) {
      //   this.$homePageHeaderEvents.innerHTML = this.getDataForEventsFromGFEventAPIEndPoint() 
      // this.imageCarousel()
      // }
      if (this.$navbarimage) {
        this.$navbarimage.innerHTML = this.randomImageprint();
      }
      if(this.$imageCarouselprint) {
        this.$imageCarouselprint.innerHTML = this.imageCarousel(); 
      }
      if (this.$detailsHeader) {
        this.$detailsHeader.innerHTML = this.getDataForDetailsPageFromGFEventAPIEndPoint();
      }
      console.log('Build OK');
    },
    CreateHTMLForSearchByDay() {
      let tempStr = this.$navigateDays.innerHTML;
    //   // navBarSearchByDays.forEach(print => {
    //   //   tempStr += `
    //   //  <div>
    //   //  <p>${print.day}</p>
    //   //  </div>
    //   //  `
    //   // })
    //   // return  tempStr

      navBarSearchByDays.map(dayOfEvents => { 
        tempStr += `
        <div class="event_day"><a href="detail.HTML?day=${dayOfEvents.day}">
        <p>${dayOfEvents.dayInStr}</p>
        <p>${dayOfEvents.day}${dayOfEvents.month}</p>
        </a>
        </div>
        `
      })
      return tempStr;
    },
    mainMenuClickEvent() {
      this.$navbarmenu.addEventListener('click', (evt) => {
        let toggle = this.$navbar;
        if (toggle.classList.contains('open')) {
          toggle.classList.remove('open')
        } else {
          toggle.classList.add('open')
        };

      })
      this.$navbarexit.addEventListener('click', (evt) => {
        let exit = this.$navbarexit
        if (this.$navbar.classList.contains('open')) {
          this.$navbar.classList.remove('open')
        }
      })
    },
    getDataForEventsFromGFEventAPIEndPoint() {
      //using promises
      //fetch the API
      fetch(GET_EVENT_API, {})
        .then(response => response.json())
        .then(json => this.updateEvents(json))
        .catch(error => console.log(error));
    },
    updateEvents(data) {
      this.$homePageHeaderEvents.innerHTML = data.slice(0, 3).map((item) => {
        return `  <article class="header_event-block">
                        <div class="event-img "  loading=lazy style="background: url(${item.image.thumb}); background-position: center center; background-size: cover;">
                        </div>
                        <div class="event-details easetrans">
                          <div class="event-time">
                           <h3>Zo ${item.day} Jul ${item.start} U.</h3>
                          </div>
                          <div class="event-items">
                           <h3>${item.title}</h3>
                           <h4>${item.location}</h4>
                          </div>
                      </div>
                    </article> `
      }).join('')
    },

    randomImageprint() {
      // ----this is not dependant on the number at the end of an img file / the file name in general*
      // ----the numbers at the end of the file names was for my own refference

      let min = 1;
      let max = 9;
      let number;
      lengthAmountImg = headerImages
      number = Math.floor(Math.random() * (max - min) + 1)
      console.log(`Main menu image number`)
      let imgprint = this.$navbarimage.innerHTML;
      imgprint += `<div class="navbar_img-div" style="background: url(${lengthAmountImg[number]}); background-repeat: no-repeat; background-size: cover;   background-position: center center; background-position-x: 30%; width: 100%;"></div>`
      return imgprint
    },
    imageCarousel() {
      // ----this is not dependant on the number at the end of the img file / the file name in general*
      // ----the numbers at the end of the file names was for my own refference
      let tempStr = document.querySelector('.carousel-images')
      for(let i = 0; i < images.length; i++){
        setTimeout(function(){ 
          console.log(images[i]);
          // = document.querySelector('.carousel-images').innerHTML
         tempStr.innerHTML = `<div class="carousel-img_show" style="background: url(${images[i]}); background-position: center center; background-size: cover; background-position-x: 50%;">
         <div class="carousel-img_amount"><span>${i+1}/${images.length}</button></span></div>`
        },i*5000);
      } return tempStr.innerHTML
      
    },
    getDataForDetailsPageFromGFEventAPIEndPoint() {
      fetch(GET_EVENT_API, {})
        .then(response => response.json())
        .then(json => this.getDetails(json))
        .catch(error => console.log(error));
    },
    getDetails(data) {
      //get the current url
      const searchURL = window.location.search
      //search the url for params
      const searchForParam = new URLSearchParams(searchURL)
      //get specified param
      const getParam = searchForParam.get('day')
      console.log(getParam)
      let tempStr = '';
      if (getParam !== null) {
      data.map((it, index)  => {
        if (it.day === getParam) {
          console.log(getParam)
          tempStr += `<div class="testdiv">
          <p>${it.title}</p>
          </div>`
          
        }
      })
     return this.$detailsHeader.innerHTML = tempStr
    }
    else {
      tempStr += `<div class="testdiv">
      <p>Error</p>
      </div>`
   }
   return this.$detailsHeader.innerHTML = tempStr
  }
 
  };
  app.initialize()
})();
