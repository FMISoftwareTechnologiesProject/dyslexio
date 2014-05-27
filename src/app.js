/* Main JS file */


(function () {

  'use strict';

  Dyslexio.Models.GameFactory.init()
  .done(function (data) {
    Dyslexio.Views.SideNav.init(data);
    console.log('Initialized', data);
    Dyslexio.Models.GameFactory.getInstance()
    .getGame('game1');

    
  });

  Dyslexio.Models.DifficultyLevelManager.init()
  .done(function (data) {
    //Dyslexio.Models.DifficultyLevelManager.getInstance().getDifficultyLevels();
    console.log('DLM Initialized', data);
  });

  crossroads.addRoute('/',
    Dyslexio.Router.handlePage.bind(Dyslexio.Router, 'home.html'));
  crossroads.addRoute('/about',
    Dyslexio.Router.handlePage.bind(Dyslexio.Router, 'about.html'));
  crossroads.addRoute('/help',
    Dyslexio.Router.handlePage.bind(Dyslexio.Router, 'help.html'));
  crossroads.addRoute('/game/{id}',
    Dyslexio.Router.handleGame);

  function parseHash(newHash) {
    crossroads.parse(newHash);
  }
  hasher.initialized.add(parseHash);
  hasher.changed.add(parseHash);
  hasher.init();

}());