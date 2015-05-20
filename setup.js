#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var async = require('async');
var promptly = require('promptly');
var mongoose = require('mongoose');
var handlebars = require('handlebars');
var requireDirectory = require('require-directory');

if (process.env.NODE_ENV === 'test') {
    var configTemplatePath = path.resolve(__dirname, 'config.example.js');
    var configPath = path.resolve(__dirname, 'config.js');
    var options = { encoding: 'utf-8' };
    var source = fs.readFileSync(configTemplatePath, options);
    var configTemplate = handlebars.compile(source);
    var context = {
        projectName: 'User Tenant Security',
        mongodbUrl: 'mongodb://localhost/user_tenant_security',
        rootEmail: 'admin@jcatalog.com',
        rootPassword: 'admin',
        systemEmail: 'sys@tem',
        smtpHost: 'smtp.gmail.com',
        smtpPort: 465,
        smtpUsername: '',
        smtpPassword: ''
    };
    fs.writeFileSync(configPath, configTemplate(context));
    console.log('Setup complete.');
    process.exit(0);
}

async.auto({
        projectName: function (done) {
            promptly.prompt('Project name: (User Tenant Security)', { default: 'User Tenant Security' }, done);
        },
        mongodbUrl: ['projectName', function (done, results) {
            var options = {
                default: 'mongodb://localhost/user_tenant_security'
            };

            promptly.prompt('MongoDB URL: (mongodb://localhost/user_tenant_security)', options, done);
        }],
        testMongo: ['rootPassword', function (done, results) {
            mongoose.connect(results.mongodbUrl, {}, function (err) {
                if (err) {
                    console.error('Failed to connect to MongoDB.');
                    return done(err);
                }
                done(null, true);
            });

        }],
        rootEmail: ['mongodbUrl', function (done, results) {

            var options = {
                default: 'admin@jcatalog.com'
            };

            promptly.prompt('Root user email: (admin@jcatalog.com) ', options, done);
        }],
        rootPassword: ['rootEmail', function (done, results) {
            promptly.password('Root user password:', { default: null }, done);
        }],
        systemEmail: ['rootPassword', function (done, results) {

            var options = {
                default: results.rootEmail
            };

            promptly.prompt('System email: (' + results.rootEmail + ')', options, done);
        }],
        smtpHost: ['systemEmail', function (done, results) {

            promptly.prompt('SMTP host: (smtp.gmail.com)', { default: 'smtp.gmail.com' }, done);
        }],
        smtpPort: ['smtpHost', function (done, results) {

            promptly.prompt('SMTP port: (465)', { default: 465 }, done);
        }],
        smtpUsername: ['smtpPort', function (done, results) {

            var options = {
                default: results.systemEmail
            };

            promptly.prompt('SMTP username: (' + results.systemEmail + ')', options, done);
        }],
        smtpPassword: ['smtpUsername', function (done, results) {

            promptly.password('SMTP password:', done);
        }],
        createConfig: ['smtpPassword', function (done, results) {
            console.log('Initiate CreateConfig ....');
            var configTemplatePath = path.resolve(__dirname, 'config.example.js');
            var configPath = path.resolve(__dirname, 'config.js');
            var options = { encoding: 'utf-8' };
            console.log('Read Config File ....');
            fs.readFile(configTemplatePath, options, function (err, source) {

                if (err) {
                    console.error('Failed to read config template.');
                    return done(err);
                }

                var configTemplate = handlebars.compile(source);
                console.log('Start Writing Config File ....');
                fs.writeFile(configPath, configTemplate(results), done);
                console.log('Done Writing Config File ....');
            });
        }],
        setupRootUser: ['createConfig', function (done, results) {

            var model = requireDirectory(module, './src/api/models'),
                User = model.user,
                Tenant = model.tenant;

            async.auto({
                clean: [function (done) {
                    mongoose.connection.db.dropDatabase(function (err) {
                        if (err) {
                            console.log('Cannot drop database');
                            return done(err);
                        }
                        done(null, true);
                    });

                }],
                user: ['clean', function (done, dbResults) {
                    var user = {
                        username: 'admin',
                        firstName: 'Admin',
                        lastName: 'Admin',
                        email: results.rootEmail,
                        password: results.rootPassword
                    };
                    user = new User(user);
                    var tenant = {
                        tenantName: 'admin',
                        description: 'Admin Tenant'
                    };
                    tenant = new Tenant(tenant);
                    user.create(tenant, 'signup', function(err, data){
                        if (err) {
                            return done(err);
                        }
                        return done(null, true);
                    });
                }]
            }, function (err, dbResults) {

                if (err) {
                    console.error('Failed to setup root user.');
                    return done(err);
                }

                done(null, true);
            });
        }]
    },
    function (err, results) {
        if (err) {
            console.error('Setup failed.');
            return process.exit(1);
        }

        console.log('Setup complete.');
        process.exit(0);
    }
)
;


