
f.create_game_first_screen = () => {
	o.shadow_roll_p = {
		image: "shadow_roll_bondissant",
		x: w2,
		y: h2+450,
		a: 1,
		flag: true,
		g: game,
	}
	o.shadow_roll = new _obj(o.shadow_roll_p)
	//o.shadow_roll.scale.x=.8
	o.roll_p = {
		image: "roll_bondissant",
		x: w2,
		y: h2+350,
		a: 1,
		flag: true,
		g: game,
	}
	o.roll = new _obj(o.roll_p)
	o.roll.scale.x=.8
	o.roll.scale.y=1.5

	tw_roll={
		o:o.roll,
		t:500,
		d:0,
		e:Phaser.Easing.Bounce.InOut,
		dx:w2,
		dy:h2+200,
		sx:1.2,
		sy:.7,
		y:true,
		i:-1,

	}
	_tr(tw_roll)
	o.button_play_p={
		g:game,
		callback: ()=>{game.state.start("game_main")},
		image:"play_button",
		x:w2,
		y:h2,
	}
	o.button_play = new _bu(o.button_play_p)
	o.button_rank_p={
		g:game,
		callback: ()=>{game.state.start("rank_screen")},
		image:"rank_button",
		x:w2,
		y:h2*1.57,
	}
	o.button_rank = new _bu(o.button_rank_p)

}
f.create_rank=()=>{
}


f.create_main = () => {
	//pour reseter les drapeaux au lancement du jeu
	flag.heart =false
	o.background_start_p = {
		image: "background_start",
		x: w2,
		y: h2,
		a: 1,
		flag: true,
		g: game,
	}
	o.background_start_left_p = {
		image: "background_start_left",
		x: w2,
		y: h2,
		a: 1,
		flag: true,
		g: game,
	}
	o.background_start_right_p = {
		image: "background_start_right",
		x: w2,
		y: h2,
		a: 1,
		flag: true,
		g: game,
	}

	o.background_main_p = {
		image: "background_main",
		x: 0,
		y: 0,
		a: 1,
		anchorx : 0,
		anchory : 0,
		flag: true,
		g: game,
	}
	o.background_main = new _obj(o.background_main_p)
	o.distance_0={
		image: "distance_0",
		x: (w2*.5)-20,
		y: 1340,
		a: 1,
		anchorx : 0.5,
		anchory : 1,
		flag: true,
		g: game,
		v:false,
	}
	o.distance_1={
		image: "distance_1",
		x: (w2*1.5)-20,
		y: 1340,
		a: 1,
		anchorx : 0.5,
		anchory : 1,
		flag: true,
		g: game,
		v:false,
	}

	o.distance={
		0:new _obj(o.distance_0),
		1:new _obj(o.distance_1),
	}
	o.shadow_p0 = {
		g: game,
		image:"shadow",
		x: 10,
		y: 10,
		v:true,
	}
	o.shadow_p1 = {
		g: game,
		image:"shadow",
		x: 10,
		y: 10,
		v:true,
	}
	o.shadow_0 = new _obj(o.shadow_p0)
	o.shadow_1 = new _obj(o.shadow_p1)

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
		name : 0,
	}
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
		name : 1,
	}
	o.paper = {
		0: new _obj(o.paper_p0),
		1: new _obj(o.paper_p1),
	}


	o.paper[0].gameover = false // pour alerter quand il dépasse le milieu de la table
	o.paper[0].flag_pre_sensor = false
	o.paper[0].flag_press_engaged = false
	o.paper[1].flag_press_engaged = false
	o.paper[1].flag_pre_sensor = false
	o.paper[0].flag_dont_move = false
	o.paper[1].flag_dont_move = false
	o.paper[0].flag_test_duration = false
	o.paper[1].flag_test_duration = false

	o.filter_gray_p = {
		image: "gray_filter",
		x: 0,
		y: 0,
		a: 1,
		flag: true,
		g: game,
		anchorx : 0,
		anchory : 0,
	}
	o.filter_gray = new _obj(o.filter_gray_p)

	o.sensor_p = {
		image: "line_collision",
		x: w2,
		y: 3655,
		a: 1,
		flag: true,
		anchorx: .5,
		anchory: 0,
		g: game,
		physics: true,
		immovable: true,
	}
	o.sensor = new _obj(o.sensor_p)


	o.pre_sensor_p = {
		image: "line_collision",
		x: w2,
		y: 2270 + 620,
		a: 1,
		flag: true,
		g: game,
		physics: true,
		immovable: true,
	}

	o.click_p = {
		image: "cursor_palpitant",
		x: w2 * 1.5,
		y: h2,
		a: 1,
		flag: true,
		g: game,
	}
	o.click = new _obj(o.click_p)
	o.click_tw = {
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
		dyo: 200, //delay yoyo
		i: -1,
	}

	o.points_p0 = {
		g: game,
		x: w2 * .5,
		y: -200,
		message: "984",
		taille: 110,
		police: 'police',
		anchorx: .5,
		anchory: .5,
	}
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
		bounce: 1.0,
		anchorx: .5,
		anchory: 1,
	}
	o.points_p1 = {
		g: game,
		x: w2 * 1.5,
		y: -200,
		message: "984",
		taille: 110,
		police: 'police',
		anchorx: .5,
		anchory: .5,
	}
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
		anchory: 1,
	}

	o.paper[0].points = new _text(o.points_p0)
	o.paper[0].fil = new _obj(o.fil_p0)
	o.paper[1].points = new _text(o.points_p1)
	o.paper[1].fil = new _obj(o.fil_p1)

	o.background_top_p = {
		image: "background_top",
		x: 0,
		y: 0,
		a: 1,
		anchorx : 0,
		anchory : 0,
		flag: true,
		g: game
	}
	o.background_top = new _obj(o.background_top_p)
	o.flash_p0 = {
		image: "flash",
		x: w2 * .5,
		y: 230,
		a: 0,
		flag: true,
		g: game,
		anchory: 0,
	}
	o.flash_p1 = {
		image: "flash",
		x: w2 * 1.5,
		y: 230,
		a: 0,
		flag: true,
		g: game,
		anchory: 0,
	}

	o.flash = []
	o.flash = {
		0: new _obj(o.flash_p0),
		1: new _obj(o.flash_p1),
	}
	o.flash[0].alpha = 0
	o.flash[1].alpha = 0
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
		//i: 0,
	}
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
		y: true, //yoyo,
		dyo: 30, //delay yoyo
	}

	o.looser_p0 = {
		image: "looser0",
		x: w2,
		y: h2,
		a: 0,
		flag: true,
		g: game,
	}
	o.looser_p1 = {
		image: "looser1",
		x: w2 ,
		y: h2,
		a: 0,
		flag: true,
		g: game,
	}

	o.looser = []
	o.looser = {
		0: new _obj(o.looser_p0),
		1: new _obj(o.looser_p1),
	}
	o.looser[0].alpha = 0
	o.looser[1].alpha = 0
	o.looser_tw=[]
	o.looser_tw[0] = {
		o: o.looser[0], //object
		t: t.looser, //time
		d: 0, //delay
		a: 1, //alpha
		e: Phaser.Easing.Exponential.Out, //Easing
		//r: 85, //rotation
		//sx :2, //scalex
		//sy :4, //scaley
		//dx :400, //displacementx
		//dy :200, //displacementy 
		//y: true, //yoyo,
		//dyo: 30, //delay yoyo
		//i: 0,
	}

	o.looser_tw[1] = {
		o: o.looser[1], //object
		t: t.looser, //time
		d: 0, //delay
		a: 1, //alpha
		e: Phaser.Easing.Exponential.Out, //Easing
		//r: 85, //rotation
		//sx :2, //scalex
		//sy :4, //scaley
		//dx :400, //displacementx
		//dy :200, //displacementy 
		//y: true, //yoyo,
		//dyo: 30, //delay yoyo
		//i: 0,
	}
	o.searching_opponent_p = {
		image: "searching_opponent",
		x: 0,
		y: 0,
		//a: 0,
		flag: true,
		g: game,
		anchorx:0,
		anchory:0,

	}
	o.circle_search_opponent_p = {
		image: "circle_search_opponent",
		x: w2*.5,
		y: 800,
		flag: true,
		g: game,

	}

	o.searching_opponent =[] 
	for (var i = 0; i < 8; i++){
		o.searching_opponent[i]=game.add.sprite(w2*.5,h2*.75,"timer");
		o.searching_opponent[i].anchor.x = .5  
		o.searching_opponent[i].anchor.y = 0  
		o.searching_opponent[i].angle = i*45  
	}
	o.searching_opponent_tw=[]
	let ts=200
	let ds=200
	let rs=90
	f.start_timer_search_opponent=()=>{
		for (var i = 0; i < o.searching_opponent.length; i++){
			o.searching_opponent_tw[i]={
				o:o.searching_opponent[i],
				t:ts,
				d:ds+i*rs,	
				a:.2,	
				y:true,
			}
			_transition(o.searching_opponent_tw[i])
		}
	}
	loop(f.start_timer_search_opponent,ts*2+ds+7*rs,10)

	o.searching_opponent.alpha = 0

	o.searching_opponent.number = random(0, 2)

	o.searching_opponent_tw = {
		o: o.searching_opponent, //object
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
		dyo: t.searching_opponent, //delay yoyo
		i: o.searching_opponent.number,
	}
	o.pre_sensor = new _obj(o.pre_sensor_p)

	let ecart = o.sensor.y - o.pre_sensor.y-10
	let minima = random(70, 180)
	o.opponent_actions = []

	//obstacles aléatoires avec ecart =distance à partir de laquelle on peut presser et maxima => distance pour la dernière touche
	f.random_division = (maxima, minimus) => {
		let [n, total, m = n] = [maxima, 0];
		const [min, arr, range = min + min / (Math.random(0, 1) * 3)] = [minimus, []];

		do {
			let r = Math.random() * (range - min) + min; // random number in our range
			n -= r; // subtract `min` from `n`
			o.opponent_actions.push(Math.round(n > min ? r : m - total)); // push `r` or remainder 
			total += o.opponent_actions[o.opponent_actions.length - 1]; // keep track of total
		} while (n > min);
	}
	f.random_division(ecart, minima)

	o.sensor_opponent_p = []
	o.sensor_opponent = []
	let summed_actions = 0

	for (let i = 0; i < o.opponent_actions.length; i++) {
		summed_actions += o.opponent_actions[i]

		o.sensor_opponent_p[i] = {
			image: "line_collision",
			x: w2,
			y: o.pre_sensor.y + summed_actions,
			a: 1,
			flag: false,
			g: game,
			physics: true,
			immovable: true,
		}
		o.sensor_opponent[i] = new _obj(o.sensor_opponent_p[i])
	}

	interface.player_p = {
		g: game,
		x: w2 * 1.5,
		y: h*.064,
		message: "dev - l4",
		taille: 100,
		police: 'police_red',
		v:true,
	}

	interface.player_roll_p = {
		image: "roll",
		x: w2 * 1.1,
		y: h*.105,
		a: 1,
		flag: true,
		g: game,
		v:true,
	}

	interface.player_points_p = {
		g: game,
		x: w2 * 1.1,
		y: h*.085,
		message: "50",
		taille: 40,
		police: 'police_red',
		v:true,
	}
	interface.progress_p0 = {
		g: game,
		x:w2*.5,
		y: h*.105,
		color : '0xffe063',
		alpha : .4,
		width : 300,
		heigth :30,
		round : 10,
		initial_value:10,
	}
	interface.progress_p1 = {
		g: game,
		x:w2*1.5,
		y: h*.105,
		color : '0xfe3e63',
		alpha : .4,
		width : 300,
		heigth :30,
		round : 10,
		initial_value:100,
	}

	let random_name = random(0,name_opponent.length-1)
	interface.enemy_p = {
		g: game,
		x: w2 * .5,
		y: h*.064,
		message: name_opponent[random_name],
		taille: 100,
		police: 'police_yellow',
		v:true,
	}

	interface.enemy_roll_p = {
		image: "roll",
		x: w2 * .145,
		y: h*.105,
		a: 1,
		flag: true,
		g: game,
		v:false,
	}
	interface.enemy_progress_p = {
		image: "progress",
		x: w2 * .5,
		y: h*.105,
		a: 1,
		flag: true,
		g: game,
		v:false,
	}

	interface.enemy_points_p = {
		g: game,
		x: w2 * .145,
		y: h*.085,
		message: random(50,90000),
		taille: 40,
		police: 'police_yellow',
		v:true,
	}

	interface.decount_p = {
		g: game,
		x: w2,
		y: -200,
		message: "ready",
		taille: 250,
		police: 'police',
		v: true,
	}

	interface.puissance_p0 = {
		g: game,
		image:"level0",
		x: w2*.85,
		y: h*.10,
		v:false,
	}

	interface.puissance_p1 = {
		g: game,
		image:"level1",
		x: w2*.85+ w2,
		y: h*.10,
		v:true,
	}

	interface = {
		0: new _text(interface.enemy_p),
		1: new _text(interface.player_p),
		roll:{
			0:new _obj(interface.enemy_roll_p),
			1:new _obj(interface.player_roll_p),
		},
		points:{
			0:new _text(interface.enemy_points_p),
			1:new _text(interface.player_points_p),

		},
		puissance:{
			0:new _obj(interface.puissance_p0),
			1:new _obj(interface.puissance_p1),
		},
		decount : new _text(interface.decount_p),
		progress:{
			0:new _graph(interface.progress_p0),
			1:new _graph(interface.progress_p1),
		},
	}
	interface[0].scale.y = 0
	interface.roll[0].scale.y = 0
	interface.points[0].scale.y = 0
	//interface.progress[0].scale.y = 0
	interface.puissance[0].scale.y = 0

	interface.decount.count = 3
	//on définit la puissance de l'enemy
	if (interface.points[0].text > 0 && interface.points[0].text < 1000) {
		//À RÉTABLIR
		//interface.puissance[0].frame=0
	}	

	if (interface.points[0].text >= 1000 && interface.points[0].text < 50000) {
		//À RÉTABLIR
		//interface.puissance[0].frame=1
	}	
	if (interface.points[0].text >= 50000 && interface.points[0].text < 100000) {
		interface.puissance[0].frame=2
	}	
	if (interface.points[0].text >= 100000 && interface.points[0].text < 500000) {
		interface.puissance[0].frame=3
	}	
	if (interface.points[0].text >= 50000 && interface.points[0].text < 900000) {
		interface.puissance[0].frame=4
	}	

	var restart =()=>{game.state.start("game_main");interface.restart.visible=false}

	interface.restart_p = {
		g: game,
		image:"restart",
		x: w2*1.5,
		y: h2+400,
		v:false,
		callback : restart,
	}

	interface.restart = new _bu(interface.restart_p)
	game.add.tween(interface.restart.scale).to({x:1.2,y:1.2},800,Phaser.Easing.Linear.None,true,0,-1,true);

	o.cloud = []
	o.cloud_p = {
		image: "cloud",
		x: w2 * .5,
		y: 165,
		flag: true,
		sx: 1,
		sy: 1,
		g: game,
	}
	o.cloud_length = 19
	for (let i = 0; i < o.cloud_length; i++) {
		o.cloud[i] = new _obj(o.cloud_p)
		o.cloud[i].alpha = .8
		o.cloud[i].visible = false
		o.cloud[i].de(w2 * .5 + random(-200, 500), 165 + random(-90, 90))
		o.cloud[i].sc(random(5, 10) / 10, o.cloud[i].scale.x)

	}
	o.cloud_tw = []
	for (let i = 0; i < o.cloud_length; i++) {
		o.cloud_tw[i] = {
			o: o.cloud[i], //object
			t: t.cloud, //time
			d: 500, //delay
			a: 0, //alpha
			e: Phaser.Easing.Linear.None, //Easing
			r: 35, //rotation
			sx: 0,
			sy: 0,
			c: true,
			ctime: 1000,
			//ccdx: o.cloud[i].x + random(-300, 300), //displacementx
			//dy: o.cloud[i].y + random(-50, 50), //displacementy 
			//y: true, //yoyo,
			//dyo: 30, //delay yoyo
			//i: 0,
		}
	}

	o.particle_p = {
		image: "particle",
		x: w2,
		y: h,
		flag: true,
		g: game,
	}

	o.particle = [];
	for (var i = 0; i < 7; i++){
		o.particle[i]=new _obj(o.particle_p);
	}


	localStorage.setItem("score", interface.points[1].text)
	localStorage.getItem("name")

	o.transition_background_start={
		o:o.background_start,
		t:500,
		d:500,
		dy:-4000,
	}
	o.transition_background_start_right={
		o:o.background_start_right,
		t:1500,
		d:500,
		dx:2*w,
	}
	o.transition_background_start_left={
		o:o.background_start_left,
		t:1500,
		d:500,
		dx:-w,
	}
}
