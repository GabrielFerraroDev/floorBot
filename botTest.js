var Discord = require('discord.io')
var logger = require('winston')
var auth = require('./auth.json')
const axios = require('axios')
const qs = require('qs')
// Configure logger settings
logger.remove(logger.transports.Console)
logger.add(new logger.transports.Console(), {
  colorize: true,
})
logger.level = 'debug'
// Initialize Discord Bot
var bot = new Discord.Client({
  token: auth.token,
  autorun: true,
})
bot.on('ready', function (evt) {
  logger.info('Connected')
  logger.info('Logged in as: ')
  logger.info(bot.username + ' - (' + bot.id + ')')
})
bot.on('message', function (user, userID, channelID, message, evt) {
  if (message.substring(0, 6) == '!floor') {
    var args = message.substring(7, message.length)
    console.log(args)
    let cmd = args
    console.log('Esse é o cmd', cmd)
    switch (cmd) {
      case 'clay nation':
        cmd = 'Clay Nation By Clay Mates'
        break
      case 'yummi':
        cmd = 'Yummi Universe - naru'
        break
      case 'warriors':
        cmd = 'Cardano Warriors'
        break
      case 'DeepVision':
        cmd = 'DeepVision by VisionAI'
        break
    }
    var data = qs.stringify({
      sort: 'price',
      order: 'asc',
      page: '1',
      verified: true,
      project: cmd,
    })

    var config = {
      method: 'post',
      url: 'https://api.cnft.io/market/listings',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: data,
    }
    console.log(cmd)
    const resAxios = axios(config)
      .then(function (response) {
        const floorObj = response.data.assets[0]
        const floor = floorObj.price / 1000000

        console.log(`O Floor do ${cmd} é ${floor}`)

        console.log(cmd)
        bot.sendMessage({
          to: channelID,
          message: `O Floor do ${cmd} é ${floor}`,
        })
      })
      .catch(function (error) {
        bot.sendMessage({
          to: channelID,
          message: `Projeto não encontrado`,
        })
      })

    /* bot.sendMessage({
      to: channelID,
      message: `teste`,
    }) */
    // Just add any case commands if you want to..
  }
})
