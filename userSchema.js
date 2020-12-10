const mongoose = require('mongoose');

const userSchema = new mongoose.Schema( {
	telegram_id: Number,
	username: String,
	realName: String,
	likes: String,
	giftTo: mongoose.Schema.ObjectId,
});

const User = mongoose.model('User', userSchema);


module.exports = User;
