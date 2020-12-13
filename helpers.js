const User = require('./userSchema');
const { ASSIGNMENT_SENT } = require('./replies');
require('dotenv').config();

const getOrCreateUser = async (telegramId, username) => {
    let user = await User.findOne({telegramId});
	if (!user) {
        if (telegramId === 191062132) {
            user = new User({telegramId, username, role: 'admin'});
        } else {
            user = new User({telegramId, username, role: 'user'});
		    await user.save();
        }
    }
    return user;
};

const shuffle = array => {
	const origin = [...array];
	const result = [];
	let length = origin.length;
	while (length > 0) {
		const rand = Math.floor(Math.random() * length);
		result.push(origin[rand]);
		origin.splice(rand, 1);
		length--;
	}

	const same = result.some((el, i) => el === array[i]);

	if (same) {
		return shuffle(array);
	}

	return result;
};

const createAssignments = async () => {
    let participants = await User.find({});
    let shuffledParticipants = shuffle(participants);
    
    const promises = participants.map(async (participant, i) => {
        participant.giftTo = shuffledParticipants[i]._id;
        await participant.save();
    });
    await Promise.all(promises);
};

const sendAssignments = async (telegram) => {
    const participants = await User.find({});
    for (let participant of participants) {
        if (participant.status === ASSIGNMENT_SENT) {
            continue;
        }
        const recipient = participants.find(man => {
            return man._id.equals(participant.giftTo);
        });
        const text = `Пришло время! Подарок от тебя будет ждать ${recipient.realName} (@${recipient.username}). И вот какое письмо передают тебе эльфы: \n"${recipient.letter}"\nУдачи и хо-хо-хо!`;
        await telegram.sendMessage(participant.telegramId, text);
        participant.status = ASSIGNMENT_SENT;
        await participant.save();
    }
}

module.exports = { getOrCreateUser, createAssignments, sendAssignments };
