'user strict';

// dependencies
var mongoose = require('mongoose'),
    timestamps = require('mongoose-timestamp'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

// schema
var TenantSchema = new Schema({
    tenantName: {type: String, unique: true},
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
module.exports = mongoose.model('Tenant', TenantSchema);