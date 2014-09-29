'user strict';

// dependencies
var mongoose = require('mongoose'),
    timestamps = require('../plugins/mongoose/timestamp'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

// schema
var PermissionSchema = new Schema({
    permissionId: {type: String, unique: true, min: 3, max: 20},
    createdBy: {type: ObjectId},
    updatedBy: {type: ObjectId}
});

// timestamps
PermissionSchema.plugin(timestamps);

// export
module.exports = mongoose.model('Permission', PermissionSchema);