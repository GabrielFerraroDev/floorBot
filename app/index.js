const logger = require('winston')
const axios = require('axios')
const createDataPayload = require('../services/createDataPayload')
const initializeBot = require('../services/initializeBot')
const validateMessage = require('../services/validateMessage')
const config = require('./config')
const fixMessage = require('../services/fixMessage')
const { v4: uuidv4 } = require('uuid')
// Configure logger settings

const bot = initializeBot()

bot.on('message', async function (user, userID, channelID, message, evt) {
  const uuid = uuidv4()

  const validatedMessage = await validateMessage(message, uuid)
  console.log('Message:', message)
  if (validatedMessage) {
    const cmd = await fixMessage(message, uuid)

    logger.info(`project: ${cmd} UUID:${uuid}`)

    const data = await createDataPayload(cmd, uuid)

    const configReq = {
      method: config.get('cnftParams.method'),
      url: config.get('cnftParams.url'),
      headers: {
        'Content-Type': config.get('cnftParams.ContentType'),
      },
      data,
    }
    try {
      const resAxios = await axios(configReq)

      logger.info(`Res Axios: ${resAxios} UUID:${uuid}`)

      const floorObj = resAxios.data.assets[0]

      const floor = floorObj.price / 1000000

      logger.info(`O Floor do ${cmd} é ${floor} UUID:${uuid}`)

      bot.sendMessage({
        to: channelID,
        message: `O Floor do ${cmd} é ${floor}`,
      })
    } catch (err) {
      logger.error(`Error: ${err} UUID:${uuid}`)

      bot.sendMessage({
        to: channelID,
        message: `Projeto não encontrado`,
      })
    }
  }
})
