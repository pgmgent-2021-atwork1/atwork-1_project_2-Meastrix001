// const GET_EVENT_API = 'https://www.pgm.gent/data/gentsefeesten/events.json';
const GET_EVENT_API = 'https://www.pgm.gent/data/gentsefeesten/events_500.json';
const GET_CATEGORIE_API = 'https://www.pgm.gent/data/gentsefeesten/categories.json';


(() => {
  const app = {
    initialize() {
      this.cacheElements();
      this.buildUI();
      this.ClickEventListener();
    },
    cacheElements() {
      this.$navbarmenu = document.querySelector('.navbarmenubutton')
      this.$navbar = document.querySelector('.navbarlist')
      this.$navigateDays = document.querySelector('.header_daysmenu')
      this.$homePageHeaderEvents = document.querySelector('.header_events')
      this.$navbarimage = document.querySelector('.fullnavbar')
      this.$newsArticles = document.querySelector('.news')
      this.$imageCarouselprint = document.querySelector('.carousel-images')
      this.$navbarexit = document.querySelector('.menu_exit-svg')
      this.$imgForward = document.getElementById('img-forward')
      this.$imgReverse = document.getElementById('img-back')
      this.$detailsHeader = document.querySelector('.detailsofday')
      this.$detailsOfDayMobile = document.querySelector('.details_selected-day')
      this.$categoriesLinedUp = document.querySelector('.details_categories-list')
      this.$eventsAndcatsSortedLarge = document.querySelector('.events_sorted')
      this.$detailsPageInGridButton = document.querySelector('.details_extra-viewstyle-grid')
      this.$detailsPageInListButton = document.querySelector('.details_extra-viewstyle-list')
      this.$eventSpecifickDetails = document.querySelector('.event_specifick-details')
      this.$eventSpecifickDetailsMoreOf = document.querySelector('.event_specifick-moreof-ul')
      this.$detailsEventBlock = document.querySelector('.details_event-block')
    },
    buildUI() {
      console.log('UI Built?');
      if (this.$navigateDays) {
        this.$navigateDays.innerHTML = this.CreateHTMLForSearchByDay()
      }
      if (this.$homePageHeaderEvents) {
        this.$homePageHeaderEvents.innerHTML = this.getDataForEventsFromGFEventAPIEndPoint() 
      }
      if (this.$navbarimage) {
        this.$navbarimage.innerHTML = this.randomImageprint();
      }
      if (this.$newsArticles) {
        this.$newsArticles.innerHTML = this.createHTMLforNewsArticles();
      }
      if(this.$imageCarouselprint) {
        this.$imageCarouselprint.innerHTML = this.imageCarousel(); 
      }
      if (this.$detailsHeader) {
        this.$detailsHeader.innerHTML = this.getDataForDetailsPageFromGFEventAPIEndPoint();
      }
      if (this.$detailsOfDayMobile) {
        this.$detailsOfDayMobile.innerHTML = this.createHTMLforSelectedDay();
      }
      if (this.$categoriesLinedUp) {
        this.$categoriesLinedUp.innerHTML = this.getAllCategoriesFromAPI()
      }
      if (this.$eventsAndcatsSortedLarge) {
        this.$eventsAndcatsSortedLarge.innerHTML = this.getCategoriesForSorting()
      }
      if (this.$eventsAndcatsSortedSmall) {
        this.$eventsAndcatsSortedSmall.innerHTML = this.getCategoriesForSorting()
      }
      if (this.$eventSpecifickDetails) {
        this.$eventSpecifickDetails.innerHTML = this.getAPIForDaySpecifickDetails()
      }
    },
    CreateHTMLForSearchByDay() {
      let tempStr = this.$navigateDays.innerHTML;
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
    ClickEventListener() {
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
      if (this.$detailsPageInGridButton) {
        this.$detailsPageInGridButton.addEventListener('click', (evt) => {
          if (this.$eventsAndcatsSortedLarge.classList.contains('open')) {
                  this.$eventsAndcatsSortedLarge.classList.add('open')
          } else {
            this.$eventsAndcatsSortedLarge.classList.add('open')
          }
        })
      }
      if (this.$detailsPageInListButton) {
        this.$detailsPageInListButton.addEventListener('click', (evt) => {
          if (this.$eventsAndcatsSortedLarge.classList.contains('open')) {
              this.$eventsAndcatsSortedLarge.classList.remove('open')
          }
        })
      }
    },
    createHTMLforNewsArticles() {
      let tempStr = ''
      newsArticles.map((article, index) => {
        console.log(article.backgroundImage)
             tempStr += `
         <article class="news-article">
         <div class="news-img" style="background: url(${article.backgroundImage}); background-position: center center; background-size: cover; ">
           <div class="news-date">
             <p>${article.date}</p>
           </div>
         </div>
         <div class="news-wrap">
           <h2>${article.title}</h2>
           <p>${article.description !== undefined ? article.description : "geen beschrijving gevonden"}</p>
           <img class="news-arrow" src="${article.arrow}">
         </div>
       </article>
         ` 
      })   
      return this.$newsArticles.innerHTML += tempStr
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
      let imgprint = this.$navbarimage.innerHTML;
      imgprint += `<div class="navbar_img-div" style="background-image: url(${lengthAmountImg[number]});"></div>`
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
         tempStr.innerHTML = `<div class="carousel-img_show" style="background-image: url(${images[i]})">
         <div class="carousel-img_amount"><span>${i+1}/${images.length}</button></span></div>`
        },i*5000);
      } return tempStr.innerHTML
      
    },
    createHTMLforSelectedDay() {
      const searchUrlforParam = window.location.search
      const searchForparam = new URLSearchParams(searchUrlforParam)
      const getParamFromUrl = searchForparam.get('day')
       let tempStr = '';
        navBarSearchByDays.map(days => {
        if ( getParamFromUrl !== null && getParamFromUrl === days.day) {
          tempStr += `
           <p>Geselecteerde dag</p><h1>${days.dayInStrFull} ${days.day} ${days.monthFull}</h1>
           ` 
        } 
      })
      return this.$detailsOfDayMobile.innerHTML += tempStr
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
       let tempStr = '';
      console.log(getParam)
      if (getParam !== null) {
      data.map((it, index)  => {
        if (it.day === getParam) {
          tempStr += `
         <article class="header_event-block">
                        <div class="event-img "  loading=lazy style="background: url(${it.image !== null ? it.image.thumb : "static/media/default.jpg"}); background-position: center center; background-size: cover;">
                        </div>
                        <div class="event-details easetrans">
                          <div class="event-time">
                           <h3>Zo ${it.day} Jul ${it.start} U.</h3>
                          </div>
                          <div class="event-items">
                           <h3>${it.title}</h3>
                           <h4>${it.location}</h4>
                          </div>
                      </div>
                    </article> 
          `
        }
        
      })
    }
    else {
      tempStr += `<div class="testdiv">
      <p>Error</p>
      </div>`
   }
   return this.$detailsHeader.innerHTML = tempStr
    },
    getAllCategoriesFromAPI() {
    fetch(GET_CATEGORIE_API, {})
    .then(response => response.json())
    .then(json => this.getCategories(json))
    .catch(error => console.log(error));
    },
    getCategories(cats) {
      this.$categoriesLinedUp.innerHTML = cats.map((category, index) =>{
      shortendID = category.replace(/'/g, '').replace(/ /g, '').replace(/'/g, '')
      return  `<li><p><a href="#${shortendID}">${category}</a></p></li>`
    }).join('')
    },
    getCategoriesForSorting(){
      console.log('fetching')
      fetch(GET_CATEGORIE_API, {})
        .then(response => response.json())
        .then((json) => {
         this.fetchCategories = json;
        this.getAllEvents();
        })
         .catch(error => console.log(error));
        

    },
    getAllEvents() {
        fetch(GET_EVENT_API, {})
        .then(response => response.json())
        .then(json => {
          this.getEvents = json;
      this.sortEventsAndCategorieslarge();
      // this.sortEventsAndCategoriesSmall()
        })
        .catch(error => console.log(error));
    },
    sortEventsAndCategorieslarge() {
        // this.getEvents
        // this.fetchCategories
        let mapEvents = this.fetchCategories.map((evtCat) => {
          const filterTroughEvents = this.getEvents.filter((filterEvt) => {
            return filterEvt.category.indexOf(evtCat) > -1;
          });
          filterTroughEvents.sort((sortKey1, sortKey2) => {
            return sortKey1.sort_key.localeCompare(sortKey2.sort_key)
          })
          let filterdEvents = filterTroughEvents.map((mapEvt) =>{
            return `
            <li><a href="dag.html?slug=${mapEvt.slug}&Cat=${mapEvt.organizer}">
            <article class="details_page-event-large" style="background-image: url(${mapEvt.image !== null ? mapEvt.image.thumb : "static/media/default.jpg"});">
            </article>
            <div class="details_page-inner">
             <p>${mapEvt.start} U.</p>
            <h3>${mapEvt.title}</h3>
            <h4>${mapEvt.organizer}</h4>
            </div>
            </a>
            </li>`
            // let tempStr = '';
          }).join('');
          let shortendID = evtCat.replace(/'/g, '').replace(/ /g, '').replace(/'/g, '')
          return `<section id="${shortendID}" class="details_event-block">
          <h2 id="${evtCat}">${evtCat}</h2>
          <ul>
          ${filterdEvents}
          </ul>
          </section> `
        }).join('')
        return this.$eventsAndcatsSortedLarge.innerHTML = mapEvents
    },
    getAPIForDaySpecifickDetails() {
        fetch(GET_EVENT_API, {})
        .then(response => response.json())
        .then(json => this.CreateHTMLForEventSpecifickDetails(json))
        .catch(error => console.log(error));
    },
    CreateHTMLForEventSpecifickDetails(data) {
      const searchURL = window.location.search
      const searchForParam = new URLSearchParams(searchURL)
      const getParam = searchForParam.get('slug')
      const getParamOfOrg = searchForParam.get('Cat')
      data.map(check => {
        let tempString = '';
           if (check.organizer === getParamOfOrg) {
             
          tempString += `
          <li>
            <a href="dag.html?slug=${check.slug}&Cat=${check.organizer}">
            <article class="events_sorted moreof_organizer">
            <p>${check.start}</p>
            <h3>${check.title}</h3>
            <h4>${check.organizer}</h4>
             </article>
            </a>
            </li>`
          this.$eventSpecifickDetailsMoreOf = document.querySelector('.event_specifick-moreof-ul')   
        }
       return this.$eventSpecifickDetailsMoreOf.innerHTML += tempString
      });
      data.map(check2 => {
        if (check2.slug === getParam) {
          navBarSearchByDays.map(days => {
            if (days.day === check2.day) { 
            let tempStr = '';
          tempStr = `
          <div class="event_specifick_details">
           <div class="event_specifick_details-day">
            <h1>Overzicht ${days.dayInStrFull} ${days.day} ${days.month}</h1>
             <div class="event_specifick_details-title">
              <h2>${check2.title}</h2>
              </div>
              <div class="event_wrap">
              <div class="event_specifick_details-img">
              <img src="${check2.image !== null ? check2.image.full : "static/media/Default.jpg"}">
              </div>
              <div class="event_specifick_details-desc">
              <h1>${days.dayInStrFull} ${days.day} ${days.month} - ${check2.start} U. > ${check2.end} U.</h1>
               <p>${check2.description !== undefined ? check2.description : "Dit Evenement heeft geen beschrijving "}</p>
               <div>
               <p>Website</p>
               <p><a href="">${check2.url !== null ? check2.url : "Dit Evenement heeft geen website"}</a></p>
               </div>
               <div>
               <p>Organisator</p>
               <p><a>${check2.organizer}</a></p>
               </div>
              <div>
              <p>Categorieën</p>
              <p><a>${check2.category}</a></p>
              </div>
              </div>
          </div>
          `
         return this.$eventSpecifickDetails.innerHTML = tempStr 
            }
          })
        }
      })
    }
    
    /*
    make a fucntion to loop trough the categories,
    inject a div's with each catagory into the HTML,
    -----------------------------------
    make a function to loop trough the events and compare the previous DIV class name to the current EVENT CATEGORY.
    IF div class name === event category => inject the event into the matching DIV.innerHTML
    */

  };
  app.initialize()
})();

