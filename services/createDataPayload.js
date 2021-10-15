const qs = require('qs')
const config = require('../app/config')
const logger = require('winston')

module.exports = async (project, uuid) => {
  try {
    logger.info(`Entered createDataPayload UUID:${uuid}`)

    return qs.stringify({
      sort: config.get('cnftParams.sort'),
      order: config.get('cnftParams.order'),
      page: config.get('cnftParams.page'),
      verified: config.get('cnftParams.verified'),
      project,
    })
  } catch (err) {
    logger.error(`Error in createDataPayload UUID:${uuid}`, err)
    throw err
  }
}
