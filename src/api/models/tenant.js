'user strict';

/**
 * Define Dependencies
 * @type {exports}
 */
var mongoose = require('mongoose'),
    timestamps = require('mongoose-timestamp'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

/**
 * Define Tenant Schema
 * @type {Schema}
 */
var TenantSchema = new Schema({
    tenantName: {type: String, required: true, unique: true},
    description: {type: String, required: true},
    createdBy: {type: ObjectId},
    updatedBy: {type: ObjectId},
    users: [
        {type: ObjectId, ref: 'User'}
    ]
});

/**
 * Enable timestamps plugin
 */
TenantSchema.plugin(timestamps);

// export
module.exports = mongoose.model('Tenant', TenantSchema);