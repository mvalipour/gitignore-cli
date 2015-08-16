var request = require('request');

function _getMasterSha(done) {
    var url = 'https://api.github.com/repos/github/gitignore/git/refs/heads/master';

    request({
        url: url,
        json: true,
        headers: {
            'User-Agent': 'gitignore-cli'
        }
    }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            done(body.object.sha);
        }
    });
}

function list(done) {
    _getMasterSha(function (sha) {
        var url = 'https://api.github.com/repos/github/gitignore/git/trees/' + sha;

        request({
            url: url,
            json: true,
            headers: {
                'User-Agent': 'gitignore-cli'
            }
        }, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                var rex = /\.gitignore$/;

                var res = body.tree.map(function (t) {
                    return t.path;
                })
                .filter(function (t) {
                    return rex.test(t);
                })
                .map(function (t) {
                    return t.replace(rex, '');
                });

                done(res);
            }
        });
    });
}

function single(name, done) {
    var url = 'https://raw.github.com/github/gitignore/master/'+name+'.gitignore';

    request(url, function (error, response, body) {
        if (error || response.statusCode !== 200) return console.log('there was an error reading content of `'+name+'`');

        done(body);
    });
}

module.exports = {
    list: list,
    single: single
};
