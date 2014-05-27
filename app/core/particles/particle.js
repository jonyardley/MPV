//Global Constants

var TWO_PI = Math.PI * 2;

function Particle(opts){

	//Public vars
	this.x = opts.x || 0.0;
	this.y = opts.y || 0.0;
	this.vx = -10;
	this.vy = 0.0;

	this.r = opts.r || 10;
	this.life = opts.life || 200;
	this.w = 0.15;
	this.theta = (Math.random() * TWO_PI * 2) - TWO_PI;
	this.drag = 0.99;
	this.opacity = 1;
	//this.color = ops.color;


	//private vars
	var initLife = this.life,
		halfLife = initLife / 2,
		initRadius = this.r;



	/**
	 *	Update Methods
	 */

	var scaleOverLife = function(){
		var c = (this.life/halfLife),
			r = Math.sin(c) * initRadius;
		this.r = r;
	}.bind(this);

	var fadeOverLife = function(){
		this.opacity = this.life/initLife;
	}.bind(this);


	var wonder = function(){
		this.theta += ((Math.random() * 0.5) - 0.5)  * this.w;
		this.vx += Math.sin( this.theta ) * 0.1;
		this.vy += Math.cos( this.theta ) * 0.1;
	}.bind(this);



	/**
	 *	Public Methods
	 */

	this.update = function(){

		this.x += this.vx;
		this.y += this.vy;

		this.vx *= this.drag;
		this.vy *= this.drag;

		scaleOverLife();
		wonder();
		fadeOverLife();

		this.life--;

	}.bind(this);

	this.draw = function(p){

		p.noStroke();
		p.fill(255,255,255, (this.opacity * 255) );
		p.ellipse(this.x, this.y, this.r, this.r);


	}.bind(this);

}

module.exports = Particle;