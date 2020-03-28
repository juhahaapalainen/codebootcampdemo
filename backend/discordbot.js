const Discord = require('discord.js')
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

})

client.on('message', msg =>  {
if(msg.content === 'ping') {
    msg.reply('Pong!');
}


});



client.login('NjkzMDA2OTA4MjgxNTg1Njc0.Xn226A.oeLYgrsZ7W4zM3UcNyb3yhQlXuI');