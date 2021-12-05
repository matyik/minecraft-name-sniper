import fs from 'fs'
import axios from 'axios'
import schedule from 'node-schedule'

const conf = JSON.parse(fs.readFileSync('./config.json', 'utf-8'))

const snipe = schedule.scheduleJob(
  { hour: conf.hour, minute: conf.minute, second: conf.second },
  async () => {
    try {
      const res = await axios.put(
        `https://api.minecraftservices.com/minecraft/profile/name/${conf.username}`,
        {},
        { headers: { Authorization: `Bearer ${conf.token}` } }
      )
      console.log(res.data)
    } catch (err) {
      console.log(err.response)
    }
  }
)

snipe.schedule()
