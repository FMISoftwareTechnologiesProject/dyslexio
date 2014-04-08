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
3. Do not insert `html`, `body`, or `head` tags. Wrap your game inside a `section` tag.
4. For taking care of style collisions use custom prefix of all class names.
5. For taking care of JavaScript variable names collisions use IIFE or namespaces.
6. Do not attach event listeners to `window`, `document` or any other DOM object outside of your `index.html` file.

# License

The project is being developed under the terms of the MIT license.