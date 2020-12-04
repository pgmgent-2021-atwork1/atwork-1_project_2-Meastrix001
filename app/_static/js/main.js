const GET_EVENT_API = 'https://www.pgm.gent/data/gentsefeesten/events.json';
const GET_CATEGORIE_API = 'https://www.pgm.gent/data/gentsefeesten/categories.json';


(() => {
  const app = {
    initialize() {
    this.cacheElements();
    this.buildUI();
    this.mainMenuClickEvent();
    // this.getDataFromGFEventAPIEndpoint();
    },
    
    cacheElements() {
      this.$navbarmenu = document.querySelector('.navbarmenubutton')
      this.$navbar = document.querySelector('.navbarlist')
      this.$navigateDays = document.querySelector('.header_daysmenu')
      this.$homePageHeaderEvents = document.querySelector('.header_events')
    },
    buildUI() {
      console.log('UI Built?');
      if(this.$navigateDays) {
        this.$navigateDays.innerHTML = ('')
      }
      if(this.$homePageHeaderEvents) {
        this.$homePageHeaderEvents.innerHTML = ('')
      }
      console.log('Build OK');
    },

    mainMenuClickEvent() {
      console.log('menu listener?')
      this.$navbarmenu.addEventListener('click', (evt) => {
        if (this.$navbar.classList.contains('open')) {
          this.$navbar.classList.remove('open')
        }
        else {
          this.$navbar.classList.add('open')
        }
        console.log('Menu OK')
      }) 
  },
  getDataFromGFEventAPIEndpoint() {
//using promises
//fetch the API
fetch(GET_EVENT_API, {})
.then(response => response.json())
.then(json => this.updateEvents(json))
.catch(error => console.log(error));
  },
  updateEvents(data) {
    this.$homePageHeaderEvents.innerHTML = data.slice(0,3).map((item) =>{
      return `
      <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-3">
                    <article class="card">
                        <img src="${item.image.thumb}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${item.description}</h5>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">${item.title}</li>
                            <li class="list-group-item">${item.organizer}</li>
                        </ul>
                    </article>
                </div>
      `
    }) 
  }
};
app.initialize()
})();