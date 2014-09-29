'user strict';

// dependencies
var db = require('../settings/database').db,
    timestamps = require('mongoose-timestamp'),
    Schema = require('mongoose').Schema,
    ObjectId = Schema.ObjectId;

// schema
var RoleSchema = new Schema({
    roleId: {type: String, unique: true, min: 3, max: 20},
    permissionList:[{type:ObjectId, ref: 'Permission'}],
    createdBy: {type: ObjectId},
    updatedBy: {type: ObjectId}
});

// timestamps
RoleSchema.plugin(timestamps);

// export
module.exports = db.model('Role', RoleSchema);