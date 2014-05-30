var Particles = require('./particles/particles.js');


var MIDI = {
	min: 21,
	max: 108,
	range: 108 - 21
};

var w = window.innerWidth,
	h = window.innerHeight;


function Draw(p, ctx, midiController){

	this.count = 0;

	this.particles = new Particles();

	midiController.listener = function(data){
		var note = data[1];
		if(note >= MIDI.min && note){
			var x = ((note - MIDI.min) / MIDI.range) * w;
			this.particles.addParticle({
				x: x,
				y: h-100,
				r: data[2],
				life: 100,
				vy: -(data[2] / 100) * 5,
				w: (127-data[2] / 127)
			});
		}
	}.bind(this);

	this.loop = function(){

		p.fill(0,0,0,150);
		p.rect(0, 0, window.innerWidth, window.innerHeight);
		//p.background(0);

		ctx.globalCompositeOperation = "lighter";

		this.particles.update();
		this.particles.draw(p);

		this.count++;

	}.bind(this);
}

module.exports = Draw;