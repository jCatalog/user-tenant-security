module.exports = {
    index:{
        handler: function(request, reply){
            reply({name: 'Mainul Islam', email:'mainul098@gmail.com'},
                {name: 'Mainul Islam', email:'mainul098@gmail.com'});
        },
        app: {
            name: 'index'
        }
    },
    page:{
        handler: function(request, reply){
            reply({name: 'Mainul Islam', email:'mainul098@gmail.com'},
                {name: 'Mainul Islam', email:'mainul098@gmail.com'});
        },
        app: {
            name: 'page'
        }
    }
}
