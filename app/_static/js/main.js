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
    },
    buildUI() {
      console.log('UI Built?');
      
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
  }
};
app.initialize()
})();