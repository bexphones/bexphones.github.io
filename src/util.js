/* jshint expr: true */
/* jshint esnext: true */
if_undefined = function if_undefined(obj, action) {
	if (obj == null) {
		action();
	}
};
var wait = function wait(callback, duration) {
	setTimeout(callback, duration);
};

var loop = function loop(callback, duration, number) {
	for (var i = 0; i < number; i++) {
		wait(callback, i * duration);
	}
};

return_delay = function return_delay(tbegin, tend) {
	var tdelay = tend - tbegin;
	return tdelay;
};

var reduce_decimal = function reduce_decimal(num) {
	Math.round(num * 10) / 10;
};

var adapt = function adapt(n) {
	var opacity = void 0;
	t.cu > t[n - 1] && t.cu < t[n] ? opacity = (t[n] - t.cu) / (t[n] - t[n - 1]) : opacity = 0;
	return opacity;
};

var delay = function delay(n) {
	var de = tc[n] - tc.cu;
	return de;
};

var ctime = function ctime(n) {
	var t = tc[n] - tc[n - 1];
	return t;
};

var start_timer = function start_timer(a) {
	b.begin = performance.now();
	console.time(b.begin);
};
var stop_timer = function stop_timer(a) {
	if (a != null) {
		b.end = performance.now;
		console.time(b.end);
		//console.timeEnd(a)
	}
};
var random = function random(min, max) {
	var num = Math.floor(Math.random() * max) + min;
	return num;
};
random(0, 20);

var tr = function tr(game, p) {
	var _this = this;

	//transition,game,parameter
	this.game = game;
	if (p.e !== null) {
		p.e = Phaser.Easing.Linear.None;
	}
	this.s = function () {
		// start tween
		if (p.a !== null) {
			// alpha
			_this.tw = game.add.tween(p.o).to({ alpha: p.a }, p.t, p.e, true, p.d);
		}
		if (p.r !== null) {
			//rotation
			_this.tw = game.add.tween(p.o).to({ angle: p.r }, p.t, p.e, true, p.d);
		}
		if (p.sx !== null) {
			//scale
			_this.tw = game.add.tween(p.o.scale).to({ x: p.sx, y: p.sy }, p.t, p.e, true, p.d);
		}
		if (p.dx !== null) {
			//displacement
			_this.tw = game.add.tween(p.o).to({ x: p.dx, y: p.dy }, p.t, p.e, true, p.d);
		}
	};
	this.c = function (callback, time) {
		//complete
		var time_adapted = p.d + p.t + time;
		wait(callback, time_adapted);
	};
	this.s(); //start the tween
	this.y = function () {
		if (p.y !== null) {
			_this.tw(true, p.dy);
		}
	};
};

function Unix_timestamp(t) {
	var dt = new Date(t * 1000);
	var hr = dt.getHours() * 60;
	var m = "0" + dt.getMinutes();
	var s = "0" + dt.getSeconds();
	//return hr+ ':' + m.substr(-2) + ':' + s.substr(-2);  
	var min = Number(m.substr(-2));
	var result = Number(hr) + min;
	return result;
}

//foreach >> for_action
for_each = function for_each(tableau, action) {
	for (var i = 0; i < tableau.length; i++) {
		action(tableau[i]);
	}
};

count_modif_obj = function count_modif_obj(obj, i, num_max) {
	i++;
	if (i > num_max) {
		obj = '';
	} else {
		obj = i;
	}
};

var hide_enemies = function hide_enemies(enemies, actionString) {
	enemies.forEach(function (enemy) {
		enemy.actionString();
	});
};

var for_action = function for_action(obj, action) {
	obj.forEach(function (item) {
		item[action]();
	});
};

al = function al(message) {
	alert(message);
};

countor = function countor(x) {
	x++;
	return x;
};
//console.log

co = console.log.bind(console);
