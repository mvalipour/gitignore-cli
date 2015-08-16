#! /usr/bin/env node
var dastoor = require('dastoor'),
    runner  = new dastoor.Runner(),

    app     = require('./commands');

runner.run(app, process.argv.splice(2));
