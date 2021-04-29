# The Mounty Hall App
![mounty-with-beaver image](https://i.imgur.com/fpSzJsN.png)
## Purpose and Usage

This app is intended for educational and entertainment purposes, and the Mounty Hall App simulates a famous game-show puzzle with a similar name. As a user, you are invited to provide a username and play the game. Once you start the game, your mounty host will lead you through the process. Your goal is to pick the door with a car behind it, and not a small Canadian woodland critter.

To play the game, you first pick one of three doors. The host opens one of the other two doors, revealing that it was a losing door. Do you stay with your original pick or switch doors? Watch [this video]() to see how the game works.

After each round of the game, you are given the chance to view your user stats and game results. You can also view all of the users' results. Users are ranked their overall winning game percentages.

Can you see a pattern in the results as you play more games? What are your odds if you stay vs. if you switch. Play to find out!


## Installation
To install the program, open your terminal and run the following command:

```
git clone git@github.com:DavidRMorphew/mounty-hall-app-frontend.git

```

Also be sure to fork and clone the [Mounty-Hall-App-Api](https://github.com/DavidRMorphew/mounty-hall-app-api) repo in order to run the app.

All of the user and game data is persisted using this Rails API, and you can find the instructions to install and run the API in [this Readme](https://github.com/DavidRMorphew/mounty-hall-app-api/blob/main/README.md).

## Starting the App

First install and started the rails API server. (Again, follow the instructions [here](https://github.com/DavidRMorphew/mounty-hall-app-api/blob/main/README.md).) After you have the server running, open the frontend application directory:
```
cd mounty-hall-app-frontend
```
Run:
```
bundle install
```
Then:
```
open index.html
```

Now you can play the game in your browser.

## Seed Data

If you would like to take advantage of some seed data I have provided, run 
```
rails db:seed 
``` 
in the mounty-hall-app-api and restart the server.

## Contributing

Pull requests are welcome. If you want to make major changes, please open an issue first to discuss the proposed change.

Please feel free to add and update tests where appropriate.

This project is built for welcomed collaboration, and contributors are expected to adhere to the [Contributor Covenant](https://www.contributor-covenant.org/) code of conduct.

## Future Functionality

The following are areas open to future development:
- provide a drop-down selection of usernames
- make the mounty host more interactive

Further suggestions are welcome.

## License
The app is open source under the terms of the [MIT License](https://github.com/DavidRMorphew/mounty-hall-app-frontend/blob/main/LICENSE.txt).