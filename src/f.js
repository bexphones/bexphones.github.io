f.check_if_username_is_not_in_database_enemy = function (st) {
	for (var i = 0; i < name_opponent.length; i++) {
		return st === name_opponent[i];
	}
};
var secret;

//entrer le nom du player
f.prompt = function () {
	//pour tester que c'est bien une chaine de caractères
	var test = localStorage.getItem("username");
	if (typeof test != "string") {

		while (name_player !== "sesame") {
			name_player = prompt("what is the secret password fghffhgfhfghgfhfghfghfghfghfgfhgfhgfhgfhgfhgfhfghfgfhgfhgfhgfhfgfhg?");
		}
	}
	//};

	//	name_player = prompt("please enter your name", "anonymous")
	//	if(name_player) {
	//		if (name_player.length < 4) {
	//			name_player = prompt("please enter min. 4 letters", "anonymous")
	//		}
	//		if(f.check_if_username_is_not_in_database_enemy(name_player) == true && name_player.length > 4){
	//			name_player = prompt("name already exist, please choose a different name", "anonymous")
	//		}
	//		if(f.check_if_username_is_not_in_database_enemy(name_player) == false){
	//			name_player = localStorage.setItem("username", name_player)
	//			// pour récuper une valeur dans le localStorage
	//			alert(localStorage.getitem("username"))
	//		}
	//	}
}


//démmarer la chute des joueurs
f.wait_start_game = function (obj, time) {
	wait(function () {
		obj.body.moves = true;
	}, time);
};

//divisions
f.random_division = function () {
	var _ref = [200, 0],
		n = _ref[0],
		total = _ref[1],
		_ref$ = _ref[2],
		m = _ref$ === undefined ? n : _ref$;
	var _ref2 = [30, []],
		min = _ref2[0],
		arr = _ref2[1],
		_ref2$ = _ref2[2],
		range = _ref2$ === undefined ? min + min / (Math.random(0, 1) * 3) : _ref2$;


	do {
		var r = Math.random() * (range - min) + min; // random number in our range
		n -= r; // subtract `min` from `n`
		o.opponent_actions.push(Math.round(n > min ? r : m - total)); // push `r` or remainder 
		total += o.opponent_actions[o.opponent_actions.length - 1]; // keep track of total
	} while (n > min);

	co(o.opponent_actions);
};

//teste la rencontre entre 2 objets
f.checkoverlap = function (obj, obj2) {
	var boundsa = obj.getBounds();
	var boundsb = obj2.getBounds();
	return Phaser.Rectangle.intersects(boundsa, boundsb);
};

//check
f.check = function () {
	f.check_deep(o.paper[0]);
	f.check_deep(o.paper[1]);
};

//check pour voir si on peut clicker
f.check_pre_sensor = function () {
	f.check_deep_pre_sensor(o.paper[0]);
	f.check_deep_pre_sensor(o.paper[1]);
};

//verrouiller une fonction pour éviter qu'elle ne se lance plus de deux fois
f.lock = function (obj, callback) {
	if (obj.flag == false) {
		obj.flag = true;
		callback();
	}
};

//check pour voir si le joueur dépasse la limite du gameover
f.check_deep = function (obj) {
	if (f.checkoverlap(obj, o.sensor)) {

		if (obj.name == 0) {
			f.lock(obj, function () {
				_tr(o.looser_tw[0]);
			});
			f.lock(o.looser[0].text, function () {
				_tr(o.looser_tw_text[0]);
			});

			o.paper[0].gameover = true;
		} else {
			f.lock(obj, function () {
				_tr(o.looser_tw[1]);
			});
			f.lock(o.looser[1].text, function () {
				_tr(o.looser_tw_text[1]);
			});
		}
	}
};

//test pour voir si on peut commencer à clicker en fonction de la position de o.pre_sensor
f.check_deep_pre_sensor = function (obj) {
	if (f.checkoverlap(obj, o.pre_sensor)) {
		if (obj.flag_pre_sensor == false) {
			obj.flag_pre_sensor = true;
		}
	}
};

//collision
f.collide = function (obj, obj2, callback) {
	game.physics.arcade.collide(obj, obj2, callback, null, undefined);
};
//converti les points dans un format 100
f.convert_points_to_100 = function (position) {
	var max = h * 0.58; //100
	var value = void 0;
	//ne sait pas pourquoi il faut rajouter 4 pour avoir 100 ????
	value = position * 100 / max + 4;
	return value;
};

//texte qui suit le papier
f.follow_text = function (obj) {
	o.paper[0].points.y = o.paper[0].fil.y - 55;
	//o.paper[0].points.x = o.paper[0].fil.x
	o.paper[0].points.text = Math.round(f.convert_points_to_100(o.paper[0].points.y));
	o.paper[1].points.y = o.paper[1].fil.y - 55;
	//o.paper[1].points.x = o.paper[1].fil.x
	o.paper[1].points.text = Math.round(f.convert_points_to_100(o.paper[1].points.y));
};

//animation du flash lorsque le joueur clic
f.anim_flash = function (obj, p) {
	clic.play();
	obj.tw = game.add.tween(p.o).to({ alpha: p.a }, p.t, p.e, true, p.d, p.i, p.y);
	obj.tw.onComplete.add(function () {
		o.flash[1].flag = false;
	}, undefined);
};

// stop le papier 
f.stop_opponent = function (obj) {
	if (f.checkoverlap(obj, o.paper[0])) {
		if (obj.flag == false) {
			obj.flag = true;

			//f.lock(o.flash[0], ()=> {f.show_flash(o.flash_tw_p0)})
			o.paper[0].body.moves = false;
			wait(function () {
				o.paper[0].body.moves = true;
			}, random(200, 500));
		}
	}
};

//stop le papier => dernier coup 
f.stop_opponent_on_the_last = function (obj) {
	if (f.checkoverlap(obj, o.paper[0])) {
		if (obj.flag == false && o.paper[0].gameover == false) {
			//wait(()=>{d.could_anim_score[0]=true},t.delay_to_anim_score)
			co("stop_opponent_on_the_last :");
			f.show_points(o.paper[0]);
			obj.flag = true;
			scroll.play();
			o.paper[0].body.moves = false;
			o.paper[0].flag_dont_move = true;
		}
	}
};

//check la durée d'appui pour le pointer
f.get_duration = function (pointer, obj) {
	var lastduration = pointer.duration;
	if (lastduration > t.pointer_duration && obj.flag_pre_sensor == true && obj.flag_test_duration == false && obj.flag == false) {
		//wait(()=>{d.could_anim_score[1]=true},t.delay_to_anim_score)
		f.show_points(o.paper[1]);
		localStorage.setItem("score", interf.points[1].text);
		scroll.play();
		obj.flag_test_duration = true; // to lock the function
		obj.flag_dont_move = true;
		wait(function () {
			grow.play();
		}, 250);
		co("long press", obj.name);
		//f.test_behaviour(obj)
	}
};

// anim le pointer
f.anim_scale_pointer = function () {
	if (o.paper[1].flag_dont_move) {
		tw_click.pause();
		if (o.click.scale.x < 3) {
			o.click.scale.x = o.click.scale.x + .08;
			o.click.scale.y = o.click.scale.y + .08;
		}
		if (o.click.scale.x > 2.5) {
			o.click.visible = false;
		}
	}
};

//test la distance numa=joueur numb=autre
f.test_distance = function (numa, numb) {
	if (o.paper[numa].y > o.paper[numb].y) {
		f.show_looser(o.looser_tw[numb]);
		f.show_looser(o.looser_tw_text[numb]);
		wait(function () {
			f.anim_heart_on_winner(numa);
		}, t.show_heart);
	} else {
		f.show_looser(o.looser_tw[numa]);
		f.show_looser(o.looser_tw_text[numa]);
		wait(function () {
			f.anim_heart_on_winner(numb);
		}, t.show_heart);
	}
};

/* lorsque button pressé 
// calcul de distances et annonces du perdant et gagnant
3 cas de figures :
-1. un joueur valide mais on ne sait pas encore l'etat de l'autre joueur
-2. un joueur valide et l'autre a perdu donc le premier est gagnant
-3. un joueur valide et l'autre aussi donc test de distance
*/
f.test_behaviour = function (obj) {
	if (obj.name == 0) {
		if (o.paper[1].flag == false && o.paper[1].flag_dont_move == false) {
			co("on attend le comportement de paper1", "o.paper[1].flag:", o.paper[1].flag, "o.paper[1].flag:", o.paper[1].flag);
			//on vérifier après un laps de temps pour désigner le gagnant
			wait(function () {
				if (o.paper[1].flag) {
					f.anim_heart_on_winner(0);
				}
			}, t.wait_end_game);
		}
		if (o.paper[1].flag) {
			co("paper1 a perdu donc paper0 est gagnant");
			wait(function () {
				f.anim_heart_on_winner(0);
			}, t.show_looser + 300);
		}
		if (o.paper[1].flag_dont_move) {
			f.test_distance(0, 1);
		}
	}

	if (obj.name == 1) {
		//f.show_points(o.paper[1])
		if (o.paper[0].flag == false && o.paper[0].flag_dont_move == false) {
			co("on attend le comportement de paper0", "o.paper[0].flag:", o.paper[0].flag, "o.paper[0].flag:", o.paper[0].flag);
			//on vérifier après un laps de temps pour désigner le gagnant
			wait(function () {
				if (o.paper[0].flag) {
					f.anim_heart_on_winner(1);
				}
			}, t.wait_end_game);
		}
		if (o.paper[0].flag) {
			co("paper0 a perdu donc paper1 est gagnant");
			wait(function () {
				f.anim_heart_on_winner(1);
			}, t.show_looser + 300);
		}
		if (o.paper[0].flag_dont_move && o.paper[0].body.moves == false) {
			f.test_distance(1, 0);
		}
	}
};

//animation des coeurs pour montrer que l'on gagne des points
f.anim_heart_on_winner = function (side) {

	var time = 100;
	var delay = 0;
	var anim = Phaser.Easing.Linear.None;
	var anim2 = Phaser.Easing.Bounce.Out;

	var anim_winner = function anim_winner(num) {
		for (var i = 0; i < o.particle.length; i++) {
			o.particle[i].x = o.paper[num].points.x;
			o.particle[i].y = o.paper[num].points.y;
			o.particle[i].scale.x = random(5, 10) * .1;
			o.particle[i].scale.y = o.particle[i].scale.x;
			game.add.tween(o.particle[i]).to({ x: o.paper[num].points.x + random(-500, 500), y: o.paper[num].points.y + random(-500, 500) }, time * 3, anim, true, delay);
			game.add.tween(o.particle[i]).to({ alpha: 0 }, time * 4, anim, true, delay);
		}
		score.play();
		wait(function () {
			score.play();
		}, 250);
		wait(function () {
			score.play();
		}, 500);
		wait(function () {
			score.play();
		}, 750);
		wait(function () {
			score.play();
		}, 1000);
		game.add.tween(interf.roll[num].scale).to({ x: 1.5, y: 1.5 }, time, anim, true, delay, 5, true);
		game.add.tween(interf.points[num].scale).to({ x: 1.5, y: 1.5 }, time, anim, true, delay, 5, true);
	};
	if (flag.heart == false) {
		//pour éviter de lancer 2 x cette animation
		flag.heart = true;
		if (side == 0) {
			co("anim winner 0");
			anim_winner(0);
			wait(function () {
				d[0] = true;
			}, time);
		}
		if (side == 1) {
			co("anim winner 1");
			anim_winner(1);
			wait(function () {
				d[1] = true;
			}, time);

			//animation des points => counter
			// vérifie si le score est inférieur à la valeur stockée dans create.js
			f.anim_score = function (num) {
				var condition = parseInt(o.score[num]) + 100;
				if (interf.points[num].text < condition) {
					co(condition, interf.points[num].text);
					interf.points[num].text = parseInt(interf.points[num].text) + 1;
				}
			};
		}
	}
};
// faire appaitre le fil pour annoncer le score
f.show_points = function (obj) {
	obj.fil.body.moves = true;
};

// déplace 
f.move_body = function () {
	if (o.paper[1].flag_dont_move == false) {
		o.paper[1].body.moves = true;
	}
};
//stop le player pas de collide mais overlap
f.stop_body = function () {
	if (o.paper[1].flag == false) {
		o.paper[1].body.moves = false;
		//todo : 
		//f.lock(o.flash[1], ()=> {f.show_flash(o.flash_tw_p1)})

		f.lock(o.flash[1], function () {
			f.anim_flash(o.flash[1], o.flash_tw_p1);
		});
	}
};

//objet qui suit le pointer
f.follow_pointer = function (obj) {
	obj.y = game.input.activePointer.y;
};

f.input = function () {
	game.input.onDown.add(f.stop_body, undefined);
	game.input.onUp.add(f.move_body, undefined);
	game.input.onUp.add(f.get_duration, undefined);
};

//pour debugger un body
f.debug = function (obj) {
	game.debug.body(obj);
};

//animation flash lorsqu'on clic
f.show_flash = function (p) {
	// son du clic
	clic.play();
	// animation 
	//todo : 

	tw.flash = _tr(p);
};

//faire trembler la camera
f.shake = function () {
	game.camera.shake(0.008, 100);
};

//montrer le perdant
f.show_looser = function (p) {
	wait(function () {
		_tr(p);
	}, t.show_looser);
};

//ombre qui suit le joueur
f.shadow_follow = function (obj, sha) {
	sha.x = obj.x + 20;
	sha.y = obj.y + 20;
};

//cacher un objet
f.hide_obj = function (obj) {
	co(obj);
	obj.visible = false;
};

//animation de papiers pour le vainqueur
//peut être supprimé
f.anim_paper_winner = function (pos) {
	for (var i = 0; i < 7; i++) {
		var time = 400;
		var delay = 150;
		var anim = Phaser.Easing.Linear.None;
		var rr = random(0, 180);
		game.add.tween(o.paper_winner[i]).to({ x: pos, y: interf.roll_0.y }, time, anim, true, i * delay);
		game.add.tween(o.paper_winner[i].scale).to({ x: .2, y: .2 }, time, anim, true, i * delay);
		game.add.tween(o.paper_winner[i]).to({ angle: rr }, time, anim, true, i * delay);
		wait(function () {
			f.hide_obj(o.paper_winner[i]);
		}, 6000);
		wait(f.shake, time + i * delay);
	}
	for (var i = 0; i < 7; i++) {
		//o.paper_winner[i].visible=false
	}
};

//decide lorsque le score du joueur touche le papier
f.decision = function (obj1, obj2) {
	if (obj1.flag_dont_move && obj1.flag_press_engaged == false) {
		obj1.flag_press_engaged = true;
		f.test_behaviour(obj1);
		co("touch");
	}
};

//regle de trois c étant le nombre à rechercher
// a=b
// c=d
f.proportions = function (p) {
	//p.a = p.b
	//p.c = p.d
	p.c = p.a * p.d / p.b;
	return p.c;
};

f.arrondir_2_decimales = function (num, division) {
	var n = Math.round(num / division * 100) / 100;
	return n;
};

//affiche les infos de positions lorsqu'on déplace un objet
// seulement si drapeau debug est en true
f.debug_pos = function (obj) {
	//if (d.debug) {
	t.debug.visible = true;
	var transformx = f.arrondir_2_decimales(obj.x, w);
	var transformy = f.arrondir_2_decimales(obj.y, h);
	t.debug.text = "w*" + transformx + "  " + "h*" + transformy;
	//}
};
f.mask_scale = function (obj, mask) {
	if (obj.y > distance_100) {
		mask.visible = true;
		mask.scale.y = 1 - obj.y * dist * 50;
		// pour éviter un scale négatif
		if (mask.scale.y < 0) {
			mask.visible = false;
		}
	}
};

//adapter le sprite à l'écran
f.adapt_to_screen = function (obj) {
	obj.scale.y = game.heigth / 2280;
};
// transition simple seulement un déplacement ou une modification à la fois => pas des déplacements combinés voir en bas
// from(properties, duration, ease, autostart, delay, repeat, yoyo)
f.simple_tween = function (p) {
	p.name = game.add.tween(p.o).to({ x: p.dx, y: p.dy }, p.t, p.e, true, p.d, p.i, p.y);
	p.name = game.add.tween(p.o.scale).to({ x: p.sx, y: p.sy }, p.t, p.e, true, p.d, p.i, p.y);
	p.name.onComplete.add(function () {
		p.callback();
	}, undefined);
	//p.name.start()
};

// transition complexe avec plusieurs deplacements possibles
//attention seulement une modification par ex : déplacement mais pas scale en même temps
// from(properties, duration, ease, autostart, delay, repeat, yoyo)
//
f.complex_tween = function (p) {
	p.name = game.add.tween(p.o);
	p.name.to({ x: p.sx, y: p.sy }, p.t, p.e, false, p.d, p.i, p.y);
	p.name.onComplete.add(function () {
		p.callback();
	}, undefined);
	p.name.start();
};
