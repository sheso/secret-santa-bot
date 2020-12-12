const mongoose = require('mongoose');
const { Telegraf } = require('telegraf');
require('dotenv').config();

const User = require('./userSchema');
const replies = require('./replies');

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
	err ? console.log(err) : console.log('Connect successful');
});

const replyKeyboard = [[
	{
		text: 'Представиться', 
		callback_data: 'greeting'
	}, {
		text: 'Написать Санте', 
		callback_data: 'santa_letter'
	}]];

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start(async ctx => {
	const {from: {id: telegramId, username}} = ctx.update.message;
	let user = await User.findOne({telegramId: telegramId});
	if (!user) {
		const user = new User({telegramId, username});
		await user.save();
	}
	ctx.reply(replies.start);
});

bot.help(ctx => ctx.reply(replies.help));

bot.on('text', async (ctx) => {
	const {from: {id: telegramId, username}} = ctx.update.message;
	let user = await User.findOne({telegramId: telegramId});
	if (!user) {
		user = new User({telegramId, username});
		await user.save();
	}

	if (user.status === 'awaits_greeting') {
		user.realName = ctx.update.message.text;
		await user.save();
		ctx.reply(replies.got_info);
	} else if (user.status === 'awaits_letter') {
		user.likes = ctx.update.message.text;
		await user.save();
		ctx.reply(replies.got_info);
	}

	ctx.reply('Я разговариваю только кнопками', {reply_markup: {inline_keyboard: replyKeyboard}});
});

bot.on('callback_query', async ctx => {
	const {from: {id: telegramId, username}} = ctx.update.callback_query;
	let user = await User.findOne({telegramId: telegramId});

	switch (ctx.callbackQuery.data) {
		case 'greeting':
			if (user) {
				user.status = 'awaits_greeting';
				await user.save();
				ctx.reply(replies.greeting_instruction);
			}	else {
				const user = new User({telegramId, username, status: 'awaits_greeting'});
				await user.save();
				ctx.reply(replies.greeting_instruction);
			}
			break;
		case 'santa_letter':
			if (user) {
				user.status = 'awaits_letter';
				await user.save();
				ctx.reply(replies.letter_instruction);
			}	else {
				const user = new User({telegramId, username, status: 'awaits_letter'});
				await user.save();
				ctx.reply(replies.letter_instruction);
			}
			break;

	}
});

bot.launch();
