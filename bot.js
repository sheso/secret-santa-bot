const mongoose = require('mongoose');
const { Telegraf } = require('telegraf');
require('dotenv').config();

const User = require('./userSchema');
const { 
	AWAITS_GREETING, 
	AWAITS_LETTER,
	INFO_COMPLETE,
	replies, 
} = require('./replies');
const { getOrCreateUser } = require('./helpers');

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
	err ? console.log(err) : console.log('Connect successful');
});

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start(async ctx => {
	const {from: {id: telegramId, username}} = ctx.update.message;
	const user = await getOrCreateUser(telegramId, username);
	user.status = AWAITS_GREETING;
	await user.save();
	ctx.reply(replies.startGetName);
});

bot.help(ctx => ctx.reply(replies.help));

bot.on('text', async (ctx) => {
	const {from: {id: telegramId, username}} = ctx.update.message;
	const user = await getOrCreateUser(telegramId, username);
	let msg = ctx.update.message.text;

	if (user.status === AWAITS_GREETING) {
		user.realName = msg;
		user.status = AWAITS_LETTER;
		await user.save();
		ctx.reply(replies.getLetter);
	} else if (user.status === AWAITS_LETTER) {
		user.letter = msg;
		user.status = INFO_COMPLETE;
		await user.save();
		await ctx.reply(`Отлично, эльфы записали, что тебя зовут ${user.realName}, и вот что они передадут Санте: \n"${user.letter}"`);
		ctx.reply(replies.changeSuggest);		
	}
});

bot.on('sticker', async (ctx) => {
	const {from: {id: telegramId, username}} = ctx.update.message;
	// console.log(ctx.update.message.sticker.file_id);
	const user = await getOrCreateUser(telegramId, username);
	if (user.status === AWAITS_GREETING) {
		await ctx.replyWithSticker('CAACAgIAAxkBAAPrX9YooNLFahfAQf75N-dJ_mnjY_QAAmEFAAIjBQ0AAeFXLtJAne9jHgQ');
		ctx.reply(replies.catGetGreeting);
	} else if (user.status === AWAITS_LETTER) {
		await ctx.replyWithSticker('CAACAgIAAxkBAAPsX9YqkPxairjvW3BTWsJbiCeQVEIAAtgHAAIYQu4IFThuKDt655YeBA');
		ctx.reply(replies.sharkGetLetter);
	} else {
		ctx.replyWithSticker('CAACAgIAAxkBAAIBFV_WLxr-Em6SwdFmzRU5sIMT32czAAJrAQAC4TXjCPz8-3Ag2KEvHgQ');
	}
})

bot.launch();
