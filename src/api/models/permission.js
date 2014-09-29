'user strict';

// dependencies
var db = require('../settings/database').db,
    timestamps = require('mongoose-timestamp'),
    Schema = require('mongoose').Schema,
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
module.exports = db.model('Permission', PermissionSchema);