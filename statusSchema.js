const mongoose = require('mongoose');

const statusSchema = new mongoose.Schema( {
	status: String,
});

const Status = mongoose.model('Status', statusSchema);

module.exports = Status;
