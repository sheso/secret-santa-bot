const User = require('./userSchema');

const getOrCreateUser = async (telegramId, username) => {
    let user = await User.findOne({telegramId});
	if (!user) {
		user = new User({telegramId, username});
		await user.save();
    }
    return user;
};

module.exports = {getOrCreateUser};
