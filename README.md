# mypokemons
Pokemon picker, Angular.js application


This repository contains app files for pokemon previewer (api ver. 1) written by Yuri Zaliznyak in April, 2016, as test assignment for Kottans JavaScript course. This is an Angular.js application scaffolded with "yo angular", all files I wrote

( these are

app/index.html -- just an angular template with all "includes"

app/views/choosepockemon.html -- main html view template

app/styles/main.css -- few simple style instructions

app/scripts/app.js -- router config file

app/services/mainservice.js -- contains factories to get resources for one/chunk pokemon(s)

app/controllers/main.js -- controller and collection of functions for the main view

)

are located in "app/" subfolder.

Standalone running application is deployed at

http://mypokemons.16mb.com

and here at

http://yurizaliznyak.github.io/mypokemons

In order to run application locally you need to download files

app/*

bower.json

package.json

Gruntfile.js

into local directory of your choice, enter the directory and then run the following set of commands

-----system prompt-----> bower install

-----system prompt-----> npm install

-----system prompt-----> grunt serve

(node and bower must be installed prior to run this). Grunt will start local server to serve the application in default browser.
