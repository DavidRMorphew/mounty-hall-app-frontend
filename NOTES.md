Play-Game
# 1.) Select or Create New User (will use findOrCreateBy on backend through a form or dropdown on the frontend)
## (i) fetch all users in db and display in dropdown menu (restrict never-switch and always-switch)
* (iia) select from dropdown and hit select button
* (iib) or hit new_user button -> create form for a new user (which needs to validate that the name is not already taken) & have button to go back to selecting from dropdown
## (ii) fetch post to create action (findOrCreateBy(:name))
    (iii) display logout option in navbar
# 2.) (a) Play Game or (b) See All Results?
## (a1) Load New Game
* (i) Random win assignment of new game
* (ii) create elements on page of doors 
* (iii) addEventListener on container with options of three doors
## (a2) Reveal & Ask for Final Pick
* (i) react to original_pick (store in new-game with JS object)
* (ii) Add border to original pick (red) and font below in red marking original pick
* (iii) alert: host_reveal - change door to reveal - nolonger clickable, store result in JS Object
* (iv) tell user to stay or pick the other remaining door
* (v) reveal other two doors - text below of win / lose, stay / switch
* (a3)See results button
## (b1) Show results for user (at top) 
* fetch-show-user
## (b2) Show results for all users below 
* grouped by users 
* fetch-index-games