====================
user-tenant-security
====================

Management of users, roles, tenants and security/ACL in Node.js/MongoDB/Mongoose with self service signup

## Requirements

You need [Node.js](http://nodejs.org/download/) and
[MongoDB](http://www.mongodb.org/downloads) installed and running.

We use [`bcrypt`](https://github.com/ncb000gt/node.bcrypt.js) for hashing
secrets. If you have issues during installation related to `bcrypt` then [refer
to this wiki
page](https://github.com/jedireza/frame/wiki/bcrypt-Installation-Trouble).


## Installation

```bash
$ git clone git@github.com:jCatalog/user-tenant-security.git && cd ./user-tenant-security
$ npm install
```


## Setup

__WARNING:__ This will clear all data in existing `users`, `tenants` and
`roles` MongoDB collections. It will also overwrite `/config.js` if one
exists.

```bash
$ npm run setup

# > user-tenant-security@0.0.1 setup E:\jCatalog\usertenantsecurity
# > node setup.js

# Project name: (User Tenant Security)
# MongoDB URL: (mongodb://localhost/user_tenant_security)
# Root user email: (admin@jcatalog.com)
# Root user password:
# Root user password:
# System email: (admin@jcatalog.com)
# SMTP host: (smtp.gmail.com)
# SMTP port: (465)
# SMTP username: (admin@jcatalog.com)
# SMTP password:
# Initiate CreateConfig ....
# Read Config File ....
# Start Writing Config File ....
# Done Writing Config File ....
# Setup complete.

```


## Running the app

```bash
$ npm start
# > user-tenant-security@0.0.1 start E:\jCatalog\usertenantsecurity
# > node node_modules/nodemon/bin/nodemon.js -e js,md server

# 10 Oct 19:25:02 - [nodemon] v1.2.1
# 10 Oct 19:25:02 - [nodemon] to restart at any time, enter `rs`
# 10 Oct 19:25:02 - [nodemon] watching: *.*
# 10 Oct 19:25:02 - [nodemon] starting `node server server.js`

```

This will start the app using [`nodemon`](https://github.com/remy/nodemon).
`nodemon` will watch for changes and restart the app as needed.
