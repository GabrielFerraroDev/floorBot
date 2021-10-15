const axios = require('axios')
const qs = require('qs')
const run = async (project) => {
  var data = qs.stringify({
    sort: 'price',
    order: 'asc',
    page: '1',
    verified: true,
    project,
  })
  var config = {
    method: 'post',
    url: 'https://api.cnft.io/market/listings',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: data,
  }

  const resAxios = await axios(config)

  const floorObj = resAxios.data.assets[0]
  const floor = floorObj.price / 1000000
  console.log(`O Floor do ${project} é ${floor}`)
  return `O Floor do ${project} é ${floor}`
}
run('CardanoCity')
