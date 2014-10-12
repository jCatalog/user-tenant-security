var Confidence = require('confidence');
var criteria = {
    env: process.env.NODE_ENV
};


var config = {
    $meta: 'This file configures the plot device.',
    projectName: '{{projectName}}',
    port: {
        api: {
            $filter: 'env',
            test: 9000,
            $default: 3000
        }
    },
    authAttempts: {
        forIp: 50,
        forIpAndUser: 7
    },
    mongodb: {
        $filter: 'env',
        production: {
            url: process.env.MONGOLAB_URI,
            autoIndex: false
        },
        test: {
            url: '{{mongodbUrl}}-test',
            autoIndex: true
        },
        $default: {
            url: '{{mongodbUrl}}',
            autoIndex: true
        }
    },
    nodemailer: {
        host: '{{smtpHost}}',
        port: {{smtpPort}},
        secure: true,
        auth: {
            user: '{{smtpUsername}}',
            pass: '{{smtpPassword}}'
        }
    },
    system: {
        fromAddress: {
            name: '{{projectName}}',
            address: '{{systemEmail}}'
        },
        toAddress: {
            name: '{{projectName}}',
            address: '{{systemEmail}}'
        }
    }
};


var store = new Confidence.Store(config);


exports.get = function (key) {

    return store.get(key, criteria);
};


exports.meta = function (key) {

    return store.meta(key, criteria);
};
