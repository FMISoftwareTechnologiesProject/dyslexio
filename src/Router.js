'use strict';

var Dyslexio = Dyslexio || {};

Dyslexio.Router = {
  handlePage: function (template) {
    Dyslexio.Views.PageContainer.loadTemplate('pages/' + template);
  },
  handleGame: function (gameId) {
    //it is smart enough to resolve the promise immediately if
    //GameFactory is already initialized
    Dyslexio.Models.GameFactory.init()
    .done(function () {
      Dyslexio.Views.PageContainer.loadGame(gameId);
    });
  }
};