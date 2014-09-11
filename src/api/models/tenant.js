'user strict';

// dependencies
var mongoose = require('../settings/database').Mongoose,
    timestamps = require('mongoose-timestamp'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

// schema
var TenantSchema = new Schema({
    statusId: {type: ObjectId},

    description: {type: String},

    validFrom: {type: Date},
    validTo: {type: Date},

    createdBy: {type: ObjectId},
    updatedBy: {type: ObjectId}
});

// timestamps
TenantSchema.plugin(timestamps);

// export
module.exports = mongoose.model('Tenant', TenantSchema);