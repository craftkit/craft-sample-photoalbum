'use strict';

const Demo = require('./Demo.js'); // loaded in window

const Craft = require('@craftkit/craft-uikit'); // it's udm, make it global
window.Craft = Craft;

module.exports = Demo.default || Demo;

