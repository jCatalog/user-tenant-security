'user strict';

// dependencies
var db = require('../settings/database').db,
    timestamps = require('mongoose-timestamp'),
    Schema = require('mongoose').Schema,
    ObjectId = Schema.ObjectId;

// schema
var TenantSchema = new Schema({
    tenantId: {type: String, unique: true},
    description: {type: String},
    createdBy: {type: ObjectId},
    updatedBy: {type: ObjectId},
    users: [
        {type: ObjectId, ref: 'User'}
    ]
});

// timestamps
TenantSchema.plugin(timestamps);

// export
module.exports = db.model('Tenant', TenantSchema);