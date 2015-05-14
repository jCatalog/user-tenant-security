var Confidence = require('confidence');
var criteria = {
    env: process.env.NODE_ENV
};


var config = {
    $meta: 'This file configures the plot device.',
    projectName: 'User Tenant Security',
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
            url: 'mongodb://localhost/user_tenant_security-test',
            autoIndex: true
        },
        $default: {
            url: 'mongodb://localhost/user_tenant_security',
            autoIndex: true
        }
    },
    nodemailer: {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'admin@jcatalog.com',
            pass: ''
        }
    },
    system: {
        fromAddress: {
            name: 'User Tenant Security',
            address: 'admin@jcatalog.com'
        },
        toAddress: {
            name: 'User Tenant Security',
            address: 'admin@jcatalog.com'
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
