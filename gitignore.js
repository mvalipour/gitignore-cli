var source = require('./source');

function list() {
    source.list(function (l) {
        l.forEach(function (t) {
            console.log(t);
        });
    });
}

function add(args) {
    source.list(function (l) {
        var name = args._[0];
        var exists = l.indexOf(name) >= 0;
        if(!exists) return console.log('gitignore `'+name+'` could not be found.');

        var fs = require('fs');
        source.single(name, function (body) {
            fs.writeFile('.gitignore', body, function(err) {
                if(err) return console.log(err);

                console.log(".gitignore file added!");
            });
        });
    });
}

module.exports = {
    add: add,
    list: list
};
