var gitignore = require('./gitignore');
var cli = require('dastoor').builder;

var app = cli.node('gitignore');

cli.node('gitignore.list', gitignore.list);
cli.node('gitignore.add', { terminal: true })
   .controller(gitignore.add);

module.exports = app;
