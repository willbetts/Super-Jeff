###Super Jeff


Background

Super Jeff is a game that's very similar to super mario.  The original super mario
is a one player game that is played in a side scrolling format.  The user will be
able to control Jeff and walk through the game.  As Jeff moves, he will encounter
several types of obstacles.  He will have to jump over stuff and squash monsters.
The longer Jeff stays alive, the higher your score.  

###Functionality & MVP

While playing Super Jeff, users will be able to:
 - [ ] move side to side, jump
 - [ ] die if hit by one of the monsters
 - [ ] destroy monsters by jumping on them

In addition, this project will include:

- [ ] An About modal describing the background and rules of the game.  
- [ ] A production README

### Wireframes

This app will consist of a single screen where Jeff will be able to walk around.  
Game controls will be left, right and jump.

This project will be implemented with the following technologies:
- Vanilla JavaScript
- 'HTML5 Canvas' and 'Easel.js' for DOM manipulation and rendering
- Webpack to bundle and serve up the various scripts.  

In addition to the webpack entry file, there will be three scripts involved in this project:

'scene.js': this script will handle the logic for creating and updating the necessary  
'Easel.js' elements and rendering them to the DOM.

'background.js': this script will handle the logic behind the scenes.  It will handle how
frequently a monster appears on the screen.   

'monster.js':  this script will handle the physical makeup of the monsters that Jeff is going
to have to kill.

'jeff.js': this script will handle the makeup of Jeff as well as the event listeners available
to the user to move him around.   

###Implementation Timeline

**Day 1**: Setup all necessary Node modules, including getting webpack up and running and
'Easel.js' installed.  Create 'webpack.config.js' as well as 'package.json'.  Write a basic
entry file and the bare bones of all 3 scripts outlines above.  Learn the basics of 'Easel.js'.  
Goals for the day:

- Get a green bundle with 'webpack'
- Learn enough 'Easel.js' to render an object to the 'Canvas element'

**Day 2**: Dedicate this day to learning the 'Easel.js' API.  First, build out the
'Jeff' object to be connected to the 'scene' object.  Then use the 'scene.js' to render
the background.  Goals for the day:

-Get Jeff to appear on the scene

**Day 3**  Build out functions that handle the rendering of obstacles and monsters.  
Incorporate the logic into the scene.  Goals for the day:

-Have obstacles and what not to appear on the screen.  

**Day 4**  Install the controls for the user to interact with the game.  Style the
front end making it look polished and professional.  Goals for the day:
-Create controls for moving, game speed, and collisions
-Have a styled canvas and title

###Bonus features

- [ ] Add the turtles that you can jump on twice to make the shell that flies
across the screen (like in real super mario)      
