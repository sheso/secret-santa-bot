const AWAITS_GREETING = 'awaits_greeting';
const AWAITS_LETTER = 'awaits_letter';
const INFO_COMPLETE = 'info_complete';
const ASSIGNMENT_SENT = 'assignment_sent';
const ADMIN = 'admin';
const RUN_PHASE_TWO = 'Отдать приказ 66';

const replies = {
	startGetName: '🎀🎀🎀\nПривет. Добро пожаловать в 🎅Тайного Санту🎅! Ответь-ка мне на два вопроса. Первый - как тебя зовут? Представься полностью, чтобы Санта тебя нашел.\n🎀🎀🎀',
	help: '🎅Тайный Санта🎅 - это когда таинственный незнакомец дарит подарок тебе, а ты становишься таинственным незнакомцем для кого-то другого. Чтобы поиграть нужно представиться и написать письмо своему Тайному Санте.',
	getLetter: '✨✨✨\nА теперь напиши письмо своему 🎅Тайному Санте🎅. В нем можно рассказать о своем хорошем поведении в 2020 году и помочь 🎅Санте🎅 не ошибиться с подарком для тебя!\n✨✨✨',
	changeSuggest: 'Если хочешь что-то изменить, просто запусти бота заново командой /start. Времени у тебя немного, поторопись!',
	catGetGreeting: 'Котик все ещe не знает, как тебя зовуть',
	sharkGetLetter: 'А письмо будет?',
}

module.exports = { replies, AWAITS_GREETING, AWAITS_LETTER, INFO_COMPLETE, ASSIGNMENT_SENT, ADMIN, RUN_PHASE_TWO };
