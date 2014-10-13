'use strict';

var Hoek = require('hoek');
var fs = require('fs');
var handlebars = require('handlebars');
var nodemailer = require('nodemailer');
var markdown = require('nodemailer-markdown').markdown;

var internals = {};
var transport = {};
var config = {};
var templateCache = {};

var renderTemplate = function (signature, context, callback) {
    if (templateCache[signature]) {
        return callback(null, templateCache[signature](context));
    }

    var filePath = __dirname + '/emails/' + signature + '.hbs.md';
    var options = { encoding: 'utf-8' };

    fs.readFile(filePath, options, function (err, source) {

        if (err) {
            return callback(err);
        }

        templateCache[signature] = handlebars.compile(source);
        callback(null, templateCache[signature](context));
    });
};

internals.sendEmail = function (options, template, context, callback) {
    renderTemplate(template, context, function (err, content) {

        if (err) {
            return callback(err);
        }

        options = Hoek.applyToDefaults(options, {
            from: config.from,
            markdown: content
        });

        transport.sendMail(options, callback);
    });
};


exports.register = function (plugin, options, next) {
    config.mailer = options.mailer;
    config.from = options.from;

    transport = nodemailer.createTransport(config.mailer);
    transport.use('compile', markdown({ useEmbeddedImages: true }));

    plugin.expose('sendEmail', internals.sendEmail);
    next();
};


exports.register.attributes = {
    name: 'mailer',
    version: '0.0.1'
};
