const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require('./config.json');

bot.on('ready', () =>
{
    console.log(`Logged in as ${bot.user.tag}!`);
});

const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

bot.on('message', message =>
{
    if (message.author.bot || message.channel.type === 'dm')
        return;

    const prefixRegex = new RegExp(`^(<@!?${bot.user.id}>|${escapeRegex(config.prefix)})\\s*`);

    if (!prefixRegex.test(message.content.toLowerCase()))
        return;

    const [, matchedPrefix] = message.content.toLowerCase().match(prefixRegex);
    const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (commandName === 'ping')
    {
        message.reply('Pong!');
    }
});

bot.login(config.token);