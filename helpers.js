const User = require('./userSchema');
const { ASSIGNMENT_SENT, INFO_COMPLETE } = require('./replies');
require('dotenv').config();
const _ = require('lodash');

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

const createAssignments = async () => {
    let participants = await User.find({status: INFO_COMPLETE});
		let shuffledParticipants = _.shuffle(participants);
		let isAnyCoincide = shuffledParticipants.some((el, i) => participants[i] === el);

		if (isAnyCoincide) {
			await createAssignments();
			return;
		}
    
    const promises = participants.map(async (participant, i) => {
        participant.giftTo = shuffledParticipants[i]._id;
        await participant.save();
		});
		
		await Promise.all(promises);
};

const getUserInfo = (name, letter) => {
	return `🎄🎄🎄 \nОтлично, эльфы записали, что тебя зовут ${name}, и вот что они передадут Санте: \n"${letter}"\n🎄🎄🎄`
}

const getAssignmentText = (name, username, letter) => {
	return `🎁🎁🎁 \nПришло время! Подарок от тебя будет ждать ${name}${username ? ' (@' + username + ')' : ''}. И вот какое письмо передают тебе эльфы: \n"${letter}"\nУдачи и хо-хо-хо!\n🎁🎁🎁`;
}

const getUserById = async (id) => {
	return await User.findById(id);
}

const sendAssignments = async (telegram) => {
    const participants = await User.find({giftTo: {$ne: null}, status: INFO_COMPLETE});
    for (let participant of participants) {
        if (participant.status === ASSIGNMENT_SENT) {
            continue;
        }
        const recipient = participants.find(man => {
            return man._id.equals(participant.giftTo);
				});
				const text = getAssignmentText(recipient.realName, recipient.username, recipient.letter);
       	await telegram.sendMessage(participant.telegramId, text);
        participant.status = ASSIGNMENT_SENT;
        await participant.save();
    }
}

module.exports = { getOrCreateUser, createAssignments, sendAssignments, getAssignmentText, getUserInfo, getUserById };
