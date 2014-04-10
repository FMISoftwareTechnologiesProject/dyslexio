Dyslexio
========

# How to deploy

You need node.js, bower and gulp installed. When you resolve these dependencies enter root and:

```shell
npm install
bower install
gulp watch
open http://localhost:55555/
```

# Add new games

1. Insert JSON object with id, title and description of the game at `/games/games.json`.
2. Add folder named after the game id. The folder should contain `index.html` file, which keeps references to all scripts and styles used.

**Note** your game will be visible inside an iframe, which means that you won't have direct access to the document of the web page.

# License

The project is being developed under the terms of the MIT license.