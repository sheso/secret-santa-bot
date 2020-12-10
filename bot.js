const mongoose = require('mongoose');
const { Telegraf } = require('telegraf');
require('dotenv').config();

const User = require('./userSchema');
const replies = require('./replies');

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
	err ? console.log(err) : console.log('Connect successful');
});

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start(ctx => ctx.reply(replies.start));
bot.help(ctx => ctx.reply(replies.help));
bot.hears(replies.easterEgg, ctx => ctx.reply(replies.easterEggReply));
bot.on('text', async (ctx) => {
	const {from: {id: telegram_id, username}} = ctx.update.message;
	const newUser = new User({telegram_id, username});
	await newUser.save();
	ctx.reply(replies.main);
});
bot.launch();
