const logger = require('winston')
const mappedProjects = require('../config/projects.json')

module.exports = async (message, uuid) => {
  try {
    var args = message.substring(7, message.length)

    logger.info(`Message catched ${message} UUID${uuid}`)

    let cmd = mappedProjects[args] || args

    logger.info(`project: ${cmd} UUID:${uuid}`)

    return cmd
  } catch (err) {
    logger.error(`Error in fixMessage  UUID:${uuid}`, err)
    throw err
  }
}
