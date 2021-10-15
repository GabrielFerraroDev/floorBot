const logger = require('winston')
module.exports = async (message, uuid) => {
  logger.info(`Entered Validate Message UUID:${uuid}`)
  if (message.substring(0, 6) == '!floor') {
    logger.info('Valid Message')
    return true
  }
  return false
}
