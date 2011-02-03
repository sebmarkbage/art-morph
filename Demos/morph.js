var canvas = new ART(1000, 1000);

var square = new ART.Path()
	.move(0,0)
	.line(100,0)
	.line(0,100)
	.line(-100,0)
	.close();

var circle = new ART.Path()
	.moveTo(50,0)
	.arc(0,100, 50)
	.arc(0,-100, 50)
	.close();

var morph = new ART.Path.Morph(square, circle);

var shape = new ART.Shape()
	.fill('#F00')
	.inject(canvas);

var fx = new Fx({ duration: 4000 });
fx.set = function(delta){
	shape.draw(morph.compute(delta));
};
fx.start(0, 1);

canvas.inject(document.body);