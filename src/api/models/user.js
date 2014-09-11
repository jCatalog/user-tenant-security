'user strict';

// dependencies
var mongoose = require('../settings/database').Mongoose,
    timestamps = require('mongoose-timestamp'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

// schema
var UserSchema = new Schema({
    name: {type: String, unique: true},
    email: {type: String, lowercase: true, trim: true},
    apikey: {type: String, unique: true},
    tenant_id: {type: ObjectId}
});

// timestamps
UserSchema.plugin(timestamps);

// export
module.exports = mongoose.model('User', UserSchema);