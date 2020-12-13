const mongoose = require('mongoose');

const userSchema = new mongoose.Schema( {
	role: String,
	telegramId: Number,
	status: String,
	username: String,
	realName: String,
	letter: String,
	giftTo: mongoose.Schema.ObjectId,
});

userSchema.index({ telegramId: 1 }, { unique: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
