'user strict';

// dependencies
var mongoose = require('mongoose'),
    timestamps = require('mongoose-timestamp'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

// schema
var PermissionSchema = new Schema({
    permissionName: {type: String, unique: true, min: 3, max: 50}
});

// timestamps
PermissionSchema.plugin(timestamps);

// export
module.exports = mongoose.model('Permission', PermissionSchema);