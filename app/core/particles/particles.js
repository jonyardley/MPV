var Particle = require('./particle.js');


function Particles(num){

	this.particles = [];

	this.addParticle = function(opts){
		this.particles.push(new Particle(opts));
	}.bind(this);

	if(num){
		var w = window.innerWidth;
		var h = window.innerHeight;
		var i = 0;
		for(i=0;i<num;i++){
			this.addParticle({
				x: ((Math.random() * w*2) - w),
				y: ((Math.random() * h*2) - h),
				r: Math.random() * 100,
				life: Math.random() * 100
			});
		}
	}


	this.update = function(){
		this.particles.forEach(function(particle){
			particle.update();
		});
	}.bind(this);

	this.draw = function(p){
		this.particles.forEach(function(particle, index){
			particle.draw(p);
			if(particle.life <= 0){
				this.particles.splice(index,1);
			}
		}.bind(this));
	}.bind(this);
}

module.exports = Particles;