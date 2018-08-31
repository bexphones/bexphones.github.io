function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

f.create_game_first_screen = function () {
	//in op config
	op.background_start = {
		image: "background_start",
		x: 0,
		y: 0,
		a: 1,
		flag: true,
		anchorx: 0,
		anchory: 0,
		g: game
	};

	o.background_start = new _obj(op.background_start);
	o.background_start.scale.y = game.height / 2270;

	//in op config
	op.title_game = {
		image: "title_game",
		x: w2,
		y: h * .2,
		a: 1,
		flag: true,
		g: game
	};

	o.title_game = new _obj(op.title_game);

	o.title_game.angle = -15;

	//in ap config
	ap.title_game = {
		e: Phaser.Easing.Bounce.Out,
		o: o.title_game,
		i: -1, //number repeat
		y: true, //yoyo
		//a: 0, // alpha
		t: 1200, //time
		d: 400, // delay
		r: 15 //rotation
		//dx: w2, //distance
		//dy: h*.2+20,
		//sx:1, //scale
		//sy:1,
	};
	_a(ap.title_game);

	o.shadow_roll_p = {
		image: "shadow_roll_bondissant",
		x: w2,
		y: h * .89,
		a: .6,
		flag: true,
		g: game
	};
	o.shadow_roll = new _obj(o.shadow_roll_p);

	o.roll_p = {
		image: "roll_bondissant",
		x: w2,
		y: h * .87,
		a: 1,
		flag: true,
		g: game
	};
	o.roll = new _obj(o.roll_p);
	o.roll.scale.x = 1.2;
	o.roll.scale.y = .8;

	//animation tire de simple tween pour faire sauter le rouleau de papier
	f.anim_roll = function (p) {
		p.name = game.add.tween(p.o).to({ x: p.dx, y: h * .8 }, p.t, p.e, true, p.d, p.i, true);
		p.name = game.add.tween(p.o.scale).to({ x: .8, y: 1.2 }, p.t, p.e, true, p.d, p.i, true);
		p.name.onComplete.add(function () {
			p.callback();
		}, undefined);
	};

	a.roll = {
		o: o.roll,
		t: 280,
		d: 0,
		e: Phaser.Easing.Bounce.InOut,
		dx: w2,
		dy: h2 + 600,
		sx: 1.2,
		sy: .7,
		//y:true,
		i: 0,
		callback: function callback() {
			f.anim_roll(a.roll);
		},
		name: "anim_roll",
		ctime: 0,
		//tw : "roll",
		c: true,
		y: false
	};

	f.anim_roll(a.roll);

	//_a(a.roll)

	//a.roll.onComplete.add(()=>{_a(a.roll_next)},this)

	//in op config
	op.background_button_play = {
		image: "background_button_play",
		x: w2,
		y: h2,
		a: 1,
		flag: true,
		g: game
	};

	o.background_button_play = new _obj(op.background_button_play);

	o.button_play_p = {
		g: game,
		callback: function callback() {
			game.state.start("game_main"), clic.play();
		},
		image: "play_button",
		x: w2,
		y: h2
	};
	o.button_play = new _b(o.button_play_p);
	o.button_rank_p = {
		g: game,
		callback: function callback() {
			game.state.start("rank_screen"), clic.play();
		},
		image: "rank_button",
		x: w2,
		y: h2 * 1.40
	};
	o.button_rank = new _b(o.button_rank_p);
	//o.button_play.scale.x=.95
	//o.button_play.scale.y=1.05


	//in ap config
	ap.button_play = {
		o: o.background_button_play,
		e: Phaser.Easing.Linear.None,
		i: -1, //number repeat
		y: true, //yoyo
		//a: 0, // alpha
		t: 800, //time
		//d:100, // delay
		//r: 45, //rotation
		//dx:100, //distance
		//dy:200,
		sx: 1.2, //scale
		sy: 1.2
	};
	_a(ap.button_play);
};
f.create_rank = function () {

	//in op config
	op.rank = {
		image: "rank",
		x: 0,
		y: 0,
		a: 1,
		flag: true,
		g: game,
		anchorx: 0,
		anchory: 0
	};

	o.rank = new _obj(op.rank);

	bp.button_home = {
		callback: function callback() {
			game.state.start("game_main"), clic.play();
		},
		image: "button_home",
		x: w2,
		y: h * .92,
		g: game
	};
	b.button_home = new _b(bp.button_home);

	//	bp.button_next_screen={
	//		callback: ()=>{game.state.start("game_main"),clic.play()},
	//		image:"button_next_screen",
	//		x: w*.86,
	//		y: h*.92,
	//		g:game,
	//	},
	//		//b.button_next_screen = new _b(bp.button_next_screen)

};

f.create_main = function () {
	//f.start_config_main()
	co(d, "debug");

	//pour reseter les drapeaux au lancement du jeu
	d.heart = false;
	o.background_start_p = {
		image: "background_start",
		x: w2,
		y: h2,
		a: 1,
		flag: true,
		g: game
	};
	o.background_start_left_p = {
		image: "background_start_left",
		x: w2,
		y: h2,
		a: 1,
		flag: true,
		g: game
	};
	o.background_start_right_p = {
		image: "background_start_right",
		x: w2,
		y: h2,
		a: 1,
		flag: true,
		g: game
	};

	o.background_main_p = {
		image: "background_main",
		x: 0,
		y: 0,
		a: 1,
		anchorx: 0,
		anchory: 0,
		flag: true,
		g: game
	};
	o.background_main = new _obj(o.background_main_p);
	o.distance_0 = {
		image: "distance_0",
		x: w2 * .5 - 20,
		y: h * .58,
		a: 1,
		anchorx: 0.5,
		anchory: 1,
		flag: true,
		g: game,
		v: false
	};
	o.distance_1 = {
		image: "distance_1",
		x: w2 * 1.5 - 20,
		y: h * .58,
		a: 1,
		anchorx: 0.5,
		anchory: 1,
		flag: true,
		g: game,
		v: false
	};

	o.distance = {
		0: new _obj(o.distance_0),
		1: new _obj(o.distance_1)
	};
	o.shadow_p0 = {
		g: game,
		image: "shadow",
		x: 10,
		y: 10,
		v: true
	};
	o.shadow_p1 = {
		g: game,
		image: "shadow",
		x: 10,
		y: 10,
		v: true
	};
	o.shadow_0 = new _obj(o.shadow_p0);
	o.shadow_1 = new _obj(o.shadow_p1);

	o.paper_p0 = {
		image: "paper",
		x: w2 * .5,
		y: -h2,
		a: 1,
		flag: false,
		g: game,
		physics: true,
		gravity: true,
		//pour tester les collisions immovable doit être à false
		immovable: true,
		moves: false,
		name: 0
	};
	o.paper_p1 = {
		image: "paper",
		x: w2 * 1.5,
		y: -h2,
		a: 1,
		flag: false,
		g: game,
		physics: true,
		gravity: true,
		//pour tester les collisions immovable doit être à false
		immovable: true,
		moves: false,
		name: 1
	};
	o.paper = {
		0: new _obj(o.paper_p0),
		1: new _obj(o.paper_p1)
	};

	o.paper[0].gameover = false; // pour alerter quand il dépasse le milieu de la table
	o.paper[0].flag_pre_sensor = false;
	o.paper[0].flag_press_engaged = false;
	o.paper[1].flag_press_engaged = false;
	o.paper[1].flag_pre_sensor = false;
	o.paper[0].flag_dont_move = false;
	o.paper[1].flag_dont_move = false;
	o.paper[0].flag_test_duration = false;
	o.paper[1].flag_test_duration = false;

	o.filter_gray_p = {
		image: "gray_filter",
		x: 0,
		y: 0,
		a: 1,
		flag: true,
		g: game,
		anchorx: 0,
		anchory: 0
	};
	o.filter_gray = new _obj(o.filter_gray_p);

	o.sensor_p = {
		image: "line_collision",
		x: w2,
		y: h * 0.58 + 2400,
		a: 1,
		flag: true,
		anchorx: .5,
		anchory: 1,
		g: game,
		physics: true,
		immovable: true
	};
	o.sensor = new _obj(o.sensor_p);

	o.pre_sensor_p = {
		image: "line_collision",
		x: w2,
		y: h * 1.273,
		a: 1,
		flag: true,
		g: game,
		physics: true,
		immovable: true,
		anchorx: .5,
		anchory: 1
	};

	o.click_p = {
		image: "cursor_palpitant",
		x: w2 * 1.5,
		y: h2,
		a: 1,
		flag: true,
		g: game
	};
	o.click = new _obj(o.click_p);

	o.click.height = 100;
	o.click.width = 100;
	o.click_tw = _defineProperty({
		o: o.click, //object
		t: 200, //time
		d: 0, //delay
		//a: 1, //alpha
		e: Phaser.Easing.Linear.None, //Easing
		i: true,
		//r: 85, //rotation
		sx: 2, //scalex
		sy: 2, //scaley
		//dx :400, //displacementx
		//dy :200, //displacementy 
		y: true, //yoyo,
		dyo: 200 }, "i", -1);

	o.points_p0 = {
		g: game,
		x: w2 * .5,
		y: -200,
		message: "984",
		taille: 110,
		police: 'police',
		anchorx: .5,
		anchory: .5
	};
	o.fil_p0 = {
		image: "line",
		x: w2 * .5,
		y: -200,
		a: 1,
		flag: true,
		g: game,
		physics: true,
		gravity: true,
		moves: false,
		//bounce: 1.0,
		anchorx: .5,
		anchory: 1
	};
	o.points_p1 = {
		g: game,
		x: w2 * 1.5,
		y: -200,
		message: "984",
		taille: 110,
		police: 'police',
		anchorx: .5,
		anchory: .5
	};
	o.fil_p1 = {
		image: "line",
		x: w2 * 1.5,
		y: -200,
		a: 1,
		flag: true,
		g: game,
		physics: true,
		gravity: true,
		moves: false,
		bounce: 1.0,
		anchorx: .5,
		anchory: 1
	};

	o.paper[0].points = new _t(o.points_p0);
	o.paper[0].fil = new _obj(o.fil_p0);
	o.paper[1].points = new _t(o.points_p1);
	o.paper[1].fil = new _obj(o.fil_p1);

	o.background_top_p = {
		image: "background_top",
		x: 0,
		y: 0,
		a: 1,
		anchorx: 0,
		anchory: 0,
		flag: true,
		g: game
	};
	o.background_top = new _obj(o.background_top_p);
	o.flash_p0 = {
		image: "flash0",
		x: 0,
		y: 0,
		a: 1,
		anchorx: 0,
		anchory: 0,
		flag: false,
		g: game
	};
	o.flash_p1 = {
		image: "flash1",
		x: 0,
		y: 0,
		a: 1,
		anchorx: 0,
		anchory: 0,
		flag: false,
		g: game
	};

	o.flash = [];
	o.flash = {
		0: new _obj(o.flash_p0),
		1: new _obj(o.flash_p1)
	};
	o.flash[0].alpha = 0;
	o.flash[1].alpha = 0;
	o.flash_tw_p0 = {
		o: o.flash[0], //object
		t: 30, //time
		d: 0, //delay
		a: 1, //alpha
		//e: Phaser.Easing.Elastic.Out, //Easing
		//r: 85, //rotation
		//sx :2, //scalex
		//sy :4, //scaley
		//dx :400, //displacementx
		//dy :200, //displacementy 
		y: true, //yoyo,
		dyo: 30, //delay yoyo
		c: true,
		ctime: 15,
		callback: function callback() {
			o.flash[0].flag = false;
		},
		i: 0
	};
	o.flash_tw_p1 = {
		o: o.flash[1], //object
		t: 30, //time
		d: 0, //delay
		a: 1, //alpha
		//e: Phaser.Easing.Elastic.Out, //Easing
		//r: 85, //rotation
		//sx :2, //scalex
		//sy :4, //scaley
		//dx :400, //displacementx
		//dy :200, //displacementy 
		ctime: 15,
		y: true, //yoyo,
		dyo: 30, //delay yoyo
		c: true,
		callback: function callback() {
			o.flash[1].flag = false;
		},
		i: 0
	};
	o.looser_p0_text = {
		image: "looser_text0",
		x: w2 * .5,
		y: h2,
		a: 0,
		flag: false,
		g: game
	};
	o.looser_p1_text = {
		image: "looser_text1",
		x: w2 * 1.5,
		y: h2,
		a: 0,
		flag: false,
		g: game
	};

	o.looser_p0 = {
		image: "looser0",
		x: 0,
		y: 0,
		a: 0,
		flag: true,
		g: game,
		anchorx: 0,
		anchory: 0
	};
	o.looser_p1 = {
		image: "looser1",
		x: 0,
		y: 0,
		a: 0,
		flag: true,
		g: game,
		anchorx: 0,
		anchory: 0
	};

	o.looser = [];
	o.looser = {
		0: new _obj(o.looser_p0),
		1: new _obj(o.looser_p1)
	};
	o.looser[0].text = new _obj(o.looser_p0_text);
	o.looser[0].text.alpha = 0;
	o.looser[1].text = new _obj(o.looser_p1_text);
	o.looser[1].text.alpha = 0;
	o.looser[0].alpha = 0;
	o.looser[1].alpha = 0;
	o.looser_tw = [];
	o.looser_tw[0] = {
		o: o.looser[0], //object
		t: t.looser, //time
		d: 0, //delay
		a: 1, //alpha
		e: Phaser.Easing.Exponential.Out //Easing
		//r: 85, //rotation
		//sx :2, //scalex
		//sy :4, //scaley
		//dx :400, //displacementx
		//dy :200, //displacementy 
		//y: true, //yoyo,
		//dyo: 30, //delay yoyo
		//i: 0,
	};
	o.looser_tw_text = [];
	o.looser_tw_text[0] = {
		o: o.looser[0].text, //object
		t: t.looser, //time
		d: 0, //delay
		a: 1, //alpha
		e: Phaser.Easing.Exponential.Out, //Easing
		flag: false
		//r: 85, //rotation
		//sx :2, //scalex
		//sy :4, //scaley
		//dx :400, //displacementx
		//dy :200, //displacementy 
		//y: true, //yoyo,
		//dyo: 30, //delay yoyo
		//i: 0,
	};
	o.looser_tw_text[1] = {
		o: o.looser[1].text, //object
		t: t.looser, //time
		d: 0, //delay
		a: 1, //alpha
		e: Phaser.Easing.Exponential.Out, //Easing
		flag: false
		//r: 85, //rotation
		//sx :2, //scalex
		//sy :4, //scaley
		//dx :400, //displacementx
		//dy :200, //displacementy 
		//y: true, //yoyo,
		//dyo: 30, //delay yoyo
		//i: 0,
	};

	o.looser_tw[1] = {
		o: o.looser[1], //object
		t: t.looser, //time
		d: 0, //delay
		a: 1, //alpha
		e: Phaser.Easing.Exponential.Out //Easing
		//r: 85, //rotation
		//sx :2, //scalex
		//sy :4, //scaley
		//dx :400, //displacementx
		//dy :200, //displacementy 
		//y: true, //yoyo,
		//dyo: 30, //delay yoyo
		//i: 0,
	};

	o.circle_search_opponent_p = {
		image: "circle_search_opponent",
		x: w2 * .5,
		y: 800,
		flag: true,
		g: game

	};

	o.searching_opponent = [];
	for (var i = 0; i < 8; i++) {
		o.searching_opponent[i] = game.add.sprite(w2 * .5, h2 * .75, "timer");
		o.searching_opponent[i].anchor.x = .5;
		o.searching_opponent[i].anchor.y = 0;
		o.searching_opponent[i].angle = i * 45;
	}

	o.searching_opponent_tw = [];
	var ts = 200;
	var ds = 200;
	var rs = 90;
	f.start_timer_search_opponent = function () {
		for (var i = 0; i < o.searching_opponent.length; i++) {
			o.searching_opponent_tw[i] = {
				o: o.searching_opponent[i],
				t: ts,
				d: ds + i * rs,
				a: .2,
				y: true
			};
			_transition(o.searching_opponent_tw[i]);
		}
	};
	loop(f.start_timer_search_opponent, ts * 2 + ds + 7 * rs, 10);
	t.appear_opponent = (ts * 2 + ds + 7 * rs) * 2;

	o.searching_opponent.number = random(0, 5);

	o.text_searching_opponent_p = {
		image: "searching_opponent",
		x: w2 * .5,
		y: h * .21,
		a: 0,
		flag: true,
		g: game

	};
	o.text_searching_opponent = new _obj(o.text_searching_opponent_p);

	o.text_searching_opponent_tw = {
		o: o.text_searching_opponent, //object
		//t: 500t.searching_opponent, //time
		t: t.searching_opponent,
		d: 0, //delay
		a: 1, //alpha
		e: Phaser.Easing.Linear.None, //Easing
		//r: 85, //rotation
		//sx :2, //scalerx
		//sy :4, //scaley
		//dx :400, //displacementx
		//dy :200, //displacementy 
		y: true, //yoyo,
		//dyo: t.searching_opponent, //delay yoyo
		i: o.searching_opponent.number
	};
	_a(o.text_searching_opponent_tw);

	o.pre_sensor = new _obj(o.pre_sensor_p);

	interf.player_p = {
		g: game,
		x: w2 * 1.5,
		y: h * .064,
		//message: "dev - l4",
		message: localStorage.getItem("username"),
		taille: 100,
		police: 'police_red',
		v: true
	};

	interf.player_roll_p = {
		image: "roll",
		x: w2 * 1.1,
		y: h * .105,
		a: 1,
		flag: true,
		g: game,
		v: true
	};

	interf.player_points_p = {
		g: game,
		x: w2 * 1.1,
		y: h * .085,
		message: localStorage.getItem("score") != null ? localStorage.getItem("score") : "50",
		taille: 40,
		police: 'police_red',
		v: true
	};
	interf.progress_p0 = {
		g: game,
		x: w2 * .5,
		y: h * .105,
		color: '0xffe063',
		alpha: .4,
		width: 300,
		heigth: 30,
		round: 10,
		initial_value: 10
	};
	interf.progress_p1 = {
		g: game,
		x: w2 * 1.5,
		y: h * .105,
		color: '0xfe3e63',
		alpha: .4,
		width: 300,
		heigth: 30,
		round: 10,
		initial_value: 100
	};

	var random_name = random(0, name_opponent.length - 1);
	interf.enemy_p = {
		g: game,
		x: w2 * .5,
		y: h * .064,
		message: name_opponent[random_name],
		taille: 100,
		police: 'police_yellow',
		v: true
	};

	interf.enemy_roll_p = {
		image: "roll",
		x: w2 * .145,
		y: h * .105,
		a: 1,
		flag: true,
		g: game,
		v: false
	};
	interf.enemy_progress_p = {
		image: "progress",
		x: w2 * .5,
		y: h * .105,
		a: 1,
		flag: true,
		g: game,
		v: false
	};

	interf.enemy_points_p = {
		g: game,
		x: w2 * .145,
		y: h * .085,
		message: "",
		taille: 40,
		police: 'police_yellow',
		v: true

		//message ready pour commencer le jeu
	};interf.decount_p = {
		g: game,
		x: w2,
		y: -200,
		message: "ready",
		taille: 250,
		police: 'police',
		v: true
	};

	interf.puissance_p0 = {
		g: game,
		image: "level0",
		x: w2 * .85,
		y: h * .10,
		v: false
	};

	interf.puissance_p1 = {
		g: game,
		image: "level1",
		x: w2 * .85 + w2,
		y: h * .10,
		v: true
	};

	interf = {
		0: new _t(interf.enemy_p),
		1: new _t(interf.player_p),
		roll: {
			0: new _obj(interf.enemy_roll_p),
			1: new _obj(interf.player_roll_p)
		},
		points: {
			0: new _t(interf.enemy_points_p),
			1: new _t(interf.player_points_p)

		},
		puissance: {
			0: new _obj(interf.puissance_p0),
			1: new _obj(interf.puissance_p1)
		},
		decount: new _t(interf.decount_p),
		progress: {
			0: new _graph(interf.progress_p0),
			1: new _graph(interf.progress_p1)
		}
		// on met le scaley à 0 pour avoir un effet de repli lors de l'apparition de l'enemy
	};interf[0].scale.y = 0;
	interf.roll[0].scale.y = 0;
	interf.points[0].scale.y = 0;
	interf.progress[0].main.scale.y = 0;
	interf.progress[0].bg.scale.y = 0;
	interf.puissance[0].scale.y = 0;

	o.score = {
		0: "50",
		1: localStorage.getItem("score") != null ? localStorage.getItem("score") : "50"

		//attribution de l'enemy en fonction du niveau du joueur 
	};f.attribute_enemy_fn_player = function (category, num) {
		co(interf.points[1].text);
		if (parseInt(interf.points[1].text) > category) {
			interf.points[0].text = num;
			o.score[0] = interf.points[0].text = num;
		}
	};
	for (var i = 0; i < 5; i++) {
		f.attribute_enemy_fn_player(cat[i], numero[i]);
	}

	//store the current value of score (enemy and player) for f.anim_score


	//on définit la puissance de l'enemy en fonctions des points
	if (interf.points[0].text > 0 && interf.points[0].text < 1000) {
		interf.puissance[0].frame = 0;
	}

	if (interf.points[0].text >= 1000 && interf.points[0].text < 50000) {
		interf.puissance[0].frame = 1;
	}
	if (interf.points[0].text >= 50000 && interf.points[0].text < 100000) {
		interf.puissance[0].frame = 2;
	}
	if (interf.points[0].text >= 100000 && interf.points[0].text < 500000) {
		interf.puissance[0].frame = 3;
	}
	if (interf.points[0].text >= 50000 && interf.points[0].text < 900000) {
		interf.puissance[0].frame = 4;
	}

	if (interf.puissance[0].frame == 0) {
		ex = 500;
	}
	if (interf.puissance[0].frame == 1) {
		ex = 300;
	}
	if (interf.puissance[0].frame == 2) {
		ex = 200;
	}
	if (interf.puissance[0].frame == 3) {
		ex = 300;
	}
	if (interf.puissance[0].frame == 4) {
		ex = 0;
	}

	difficulty = random(0, ex);
	var ecart = o.sensor.y - o.pre_sensor.y - difficulty;
	//let ecart = o.sensor.y - o.pre_sensor.y
	//let ecart = o.sensor.y - o.pre_sensor.y+40
	var minima = random(70, 180);
	o.opponent_actions = [];

	//obstacles aléatoires avec ecart =distance à partir de laquelle on peut presser et maxima => distance pour la dernière touche
	f.random_division = function (maxima, minimus) {
		var _ref = [maxima, 0],
			n = _ref[0],
			total = _ref[1],
			_ref$ = _ref[2],
			m = _ref$ === undefined ? n : _ref$;
		var _ref2 = [minimus, []],
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
	};
	f.random_division(ecart, minima);

	o.sensor_opponent_p = [];
	o.sensor_opponent = [];
	var summed_actions = 0;

	for (var _i = 0; _i < o.opponent_actions.length; _i++) {
		summed_actions += o.opponent_actions[_i];

		o.sensor_opponent_p[_i] = {
			image: "line_collision",
			x: w2,
			y: o.pre_sensor.y + summed_actions,
			a: 1,
			flag: false,
			g: game,
			physics: true,
			immovable: true,
			anchory: 1,
			anchorx: .5
		};
		o.sensor_opponent[_i] = new _obj(o.sensor_opponent_p[_i]);
	}

	var restart = function restart() {
		game.state.start("game_main");interf.restart.visible = false;
	};

	interf.restart_p = {
		g: game,
		image: "restart",
		x: w2 * 1.5,
		y: h2 + 400,
		v: false,
		callback: restart
	};

	interf.restart = new _b(interf.restart_p);
	game.add.tween(interf.restart.scale).to({ x: 1.2, y: 1.2 }, 800, Phaser.Easing.Linear.None, true, 0, -1, true);

	o.cloud = [];
	o.cloud_p = {
		image: "cloud",
		x: w2 * .5,
		y: 165,
		flag: true,
		sx: 1,
		sy: 1,
		g: game
	};
	o.cloud_length = 19;
	for (var _i2 = 0; _i2 < o.cloud_length; _i2++) {
		o.cloud[_i2] = new _obj(o.cloud_p);
		o.cloud[_i2].alpha = .8;
		o.cloud[_i2].visible = false;
		o.cloud[_i2].de(w2 * .5 + random(-200, 500), 165 + random(-90, 90));
		o.cloud[_i2].sc(random(5, 10) / 10, o.cloud[_i2].scale.x);
	}
	o.cloud_tw = [];
	for (var _i3 = 0; _i3 < o.cloud_length; _i3++) {
		o.cloud_tw[_i3] = {
			o: o.cloud[_i3], //object
			t: t.cloud, //time
			d: 500, //delay
			a: 0, //alpha
			e: Phaser.Easing.Linear.None, //Easing
			r: 35, //rotation
			sx: 0,
			sy: 0,
			c: true,
			ctime: 1000
			//ccdx: o.cloud[i].x + random(-300, 300), //displacementx
			//dy: o.cloud[i].y + random(-50, 50), //displacementy 
			//y: true, //yoyo,
			//dyo: 30, //delay yoyo
			//i: 0,
		};
	}

	o.particle_p = {
		image: "particle",
		x: w2,
		y: h * 2,
		flag: true,
		g: game
	};

	o.particle = [];
	for (var i = 0; i < 7; i++) {
		o.particle[i] = new _obj(o.particle_p);
	}

	localStorage.getItem("name");

	o.transition_background_start = {
		o: o.background_start,
		t: 500,
		d: 500,
		dy: -4000
	};
	o.transition_background_start_right = {
		o: o.background_start_right,
		t: 1500,
		d: 500,
		dx: 2 * w
	};
	o.transition_background_start_left = {
		o: o.background_start_left,
		t: 1500,
		d: 500,
		dx: -w
	};

	tp.debug = {
		g: game,
		x: w2,
		y: 50,
		message: "ready",
		taille: 40,
		police: 'police',
		v: false

	};

	t.debug = new _t(tp.debug);
};
