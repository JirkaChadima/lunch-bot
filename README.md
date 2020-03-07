# Lunch bot



A simple NodeJS REST API that can serve daily lunch menus from multiple sources.
It is meant as a slack slash command. If you want a full-fledged bot, use
[lunchbuddy-bot](https://github.com/igorkulman/lunchbuddy-bot) which does a very similar
thing.


## Example command for testing
curl -X POST localhost:8080/ -H'content-type:application/x-www-form-urlencoded' -d '&command=/obed&text=sedleri'
