import Discord, { VoiceChannel } from 'discord.js'
import config from './config.json'
import play from './functions'
const {
  prefix,
  token
} = config

const client = new Discord.Client()

client.once('ready', () => {
  console.log('Ready!')
})

client.once('reconnecting', () => {
  console.log('Reconnecting!');
 })

 client.once('disconnect', () => {
  console.log('Disconnect!');
 })

 client.on('messageDelete', async message => {
  const channel = client.channels.cache.get(message.channel.id)
})

client.on('message', async message => {
  if (message.author.bot) return

  if (!message.content.includes(prefix)) return


  const content = message.content.split(prefix)[1].split(' ')[0]
  const voiceChannel = message.member.voice.channel
  const joinLeave = async () => {
    try {
      voiceChannel.join()
      voiceChannel.leave()
    } catch (error) {
      console.log(error)      
    }
  }
  switch (content) {
      case 'play':
        play(message)
      break;
      case 'spam':
        setInterval(() => {
          voiceChannel.join()
          voiceChannel.leave()
        }, 100)
      break;
  }
})

client.login(token)
