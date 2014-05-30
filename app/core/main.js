/*global Processing: true */


require('processing');
var draw = require('./draw.js'),
	_ = require('underscore');

var canvas = document.getElementById('stage'),
	ctx = canvas.getContext('2d');

function init(p){
	var width = window.innerWidth,
		height = window.innerHeight;

	p.size(width, height, p.JAVA2D);
	p.background(0);
}


function MIDIController(){

	this.listener = undefined;

	this.newEvent = function(data){
		console.log(data);
		if(this.listener instanceof Function){
			this.listener(data);
		}
	}.bind(this);

}

var midiController = new MIDIController();

function sketchProc(p){

	init(p);
	p.draw = new draw(p, ctx, midiController).loop;

}

var MIDIevents = {
	nothing: 248,
	on: 144,
	off: 128,
	pedal: 176
};

function handleMIDIData(event){
	var data = event.data;
	var length = event.data.length;

	if(data[0] !== MIDIevents.nothing &&
		data[0] !== MIDIevents.off &&
		data[0] !== MIDIevents.pedal) {
		console.log(data);
			midiController.newEvent(data);
	}
}


function successCallback(MIDI){

	var inputs = MIDI.inputs();
	inputs[0].onmidimessage = handleMIDIData;



	var stage = new Processing(canvas, sketchProc);
}


function failureCallback(){
	console.warn('NEED ACCESS');
}

navigator.requestMIDIAccess( {sysex:true} ).then( successCallback, failureCallback );