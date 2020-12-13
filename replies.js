const AWAITS_GREETING = 'awaits_greeting';
const AWAITS_LETTER = 'awaits_letter';
const INFO_COMPLETE = 'info_complete';

const replies = {
	startGetName: 'Привет. Добро пожаловать в Тайного Санту! Ответь-ка мне на два вопроса. Первый - как тебя зовут?',
	help: 'Тайный Санта - это когда таинственный незнакомец дарит подарок тебе, а ты становишься таинственным незнакомцем для кого-то другого. Чтобы поиграть нужно представиться и написать письмо своему Тайному Санте.',
	getLetter: 'Напиши письмо своему Тайному Санте',
	gotInfo: 'Спасибо! Итак, вот что мы передадим Санте.',
	changeSuggest: 'Если хочешь что-то изменить, просто запусти бота заново командой /start. Времени у тебя - до конца этой недели, поторопись!',
	catGetGreeting: 'Котик все ещe не знает, как тебя зовуть',
	sharkGetLetter: 'А письмо будет?',
}

module.exports = { replies, AWAITS_GREETING, AWAITS_LETTER, INFO_COMPLETE };
