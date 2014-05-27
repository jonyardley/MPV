/*global Processing: true */
require('processing');
var draw = require('./draw.js');


function init(p){
	var width = window.innerWidth,
		height = window.innerHeight;

	p.size(width, height);
	p.background(0);
}


function sketchProc(p){

	init(p);

	p.draw = new draw(p).loop;

}

var App = function(){
	this.canvas = document.getElementById('stage');
	this.processing = new Processing(this.canvas, sketchProc);
};

var app = new App();