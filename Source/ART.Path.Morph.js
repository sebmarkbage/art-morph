/*
---
name: ART.Path.Morph
description: "Morph between two paths."
provides: ART.Path.Morph
requires: ART/ART.Path
...
*/

(function(){

var newPath;

function move(sx, sy, x, y){
	newPath.push('M', x, y);
};

function line(sx, sy, x, y){
	newPath.push('C', sx, sy, x, y, x, y);
};

function curve(sx, sy, p1x, p1y, p2x, p2y, x, y){
	newPath.push('C', p1x, p1y, p2x, p2y, x, y);
};

ART.Path.Morph = function(from, to){
	this.from = newPath = new ART.Path();
	from.visit(line, curve, null, move);
	this.to = newPath = new ART.Path();
	to.visit(line, curve, null, move);
	newPath = null;
	
	this.current = new ART.Path();

	var f = this.from.path, t = this.to.path, c = this.current.path, x, y;
	
	for (var i = 0; i < f.length || i < t.length; i++){
		if (i == f.length){
				x = f[i - 1][5];
				y = f[i - 1][6];
				f.splice(i, 0, ['C', x, y, x, y, x, y]);
		} else if (i == t.length){
				x = t[i - 1][5];
				y = t[i - 1][6];
				f.splice(i, 0, ['C', x, y, x, y, x, y]);
		} else if (f[i][0] == 'M'){
			if (t[i][0] == 'C'){
				x = f[i - 1][5];
				y = f[i - 1][6];
				f.splice(i, 0, ['C', x, y, x, y, x, y]);
			}
		} else if (t[i][0] == 'M'){
				x = t[i - 1][5];
				y = t[i - 1][6];
				f.splice(i, 0, ['C', x, y, x, y, x, y]);
		}
		var m = new Array(f[i].length);
		m[0] = f[i][0];
		c.push(m);
	}
};

ART.Path.Morph.prototype.compute = function(delta){
	var f = this.from.path, t = this.to.path, c = this.current.path;
	for (var i = 0, l = c.length; i < l; i++){
		var fi = f[i], ti = t[i], ci = c[i];
		for (var j = 1; j < ci.length; j++){
			ci[j] = (ti[j] - fi[j]) * delta + fi[j];
		}
	}
	this.current.cache = {};
	return this.current;
};


})();