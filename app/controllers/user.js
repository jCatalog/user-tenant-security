var Boom = require('boom');
var Bcrypt = require('bcryptjs');
var salt = Bcrypt.genSaltSync(10);
var User = require('../models/user');

//Expose the CRUD functionality
module.exports = {
    getAll: function (request, reply) {
        User.find().sort('-created').exec(function (err, users) {
            if (err) {
                var error = Boom.badRequest(err);
                return reply(error);
            }
            return reply(users).type('application/json');
        });
    },
    create: function (request, reply) {
        var user = new User(request.payload);
        user.displayName = user.firstName + ' ' + user.lastName;
        user.created = new Date();

        // Save the user
        user.save(function (err, data) {
            if (err) {
                var error = Boom.badRequest(err);
                return reply(error);
            } else {
                // Remove sensitive data before login
                user.password = undefined;
                user.salt = undefined;
                return reply(data[0]).type('application/json');
            }
        });
    },
    get: function (request, reply) {
        User.findById(request.params.id).exec(function(err, user) {
            if (err) throw err;

            if (user == null) {
                var error = Boom.badRequest('No doc found in');
                return reply(error);
            }
            else {
                return reply(user).type('application/json');
            }
        });
    }
    /*
     update: function (request, reply) {
     // Resource ID from URL
     var resourceId = request.params.id;
     var validSchema = config.update.payload;

     Joi.validate(request.payload, validSchema, config.validationOpts, function (err, value) {
     if (err !== null) {
     var error = Boom.badRequest(err);
     return reply(error);
     }
     else {
     var update = request.payload;

     if (config.update.bcrypt && update[config.update.bcrypt]) {
     // Hash password before update
     update[config.update.bcrypt] = Bcrypt.hashSync(update[config.update.bcrypt], salt);
     }
     if (config.update.date) {
     var ts = new Date();
     update[config.update.date] = ts;
     }

     // Update Resource with payload
     var collection = db.collection(coll);

     // Check doc exists & uId matches doc
     collection.findOne({"_id": ObjectId(request.params.id)}, function (err, doc) {
     // doc exists
     if (doc === null) {
     var error = Boom.badRequest('No doc found in ' + coll);
     return reply(error);
     }
     else {
     collection.update({"_id": ObjectId(resourceId)}, {$set: update}, {}, function (err, doc) {
     if (err) throw err;
     return reply({error: null, message: 'Updated successfully'});
     });
     }
     })
     }
     });
     },
     del: function (request, reply) {
     var _del = {"_id": ObjectId(request.params.id)};

     var collection = db.collection(coll);
     collection.findOne({"_id": ObjectId(request.params.id)}, function (err, doc) {
     if (doc === null) {
     var error = Boom.badRequest('No doc found in ' + coll);
     return reply(error);
     }
     else {
     collection.remove(_del, function (err) {
     if (err) throw err;
     return reply({error: null, message: 'Deleted successfully'});
     });
     }
     });
     }*/
};
