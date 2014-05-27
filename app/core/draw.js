var Particles = require('./particles/particles.js');


function Draw(p){

	this.count = 0;

	this.particles = new Particles(100);

	this.loop = function(){

		p.background(0);

		this.particles.update();
		this.particles.draw(p);

		this.count++;

	}.bind(this);
}

module.exports = Draw;