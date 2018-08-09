//affiche une boite de dialogue pour entrer le nom du joueur
//TODO : 

f.prompt=()=>{
	//var name = prompt("Please enter your name", "Anonymous");if(name) {    console.log("Hello "+name+", nice to meet you!");}
	//localStorage.setItem("username", name)
	//alert(localStorage.getItem("username"))
}
//démmarer la chute des joueurs
f.wait_start_game = (obj, time) => {
	wait(() => { obj.body.moves = true }, time)
}

//divisions
f.random_division = () => {
	let [n, total, m = n] = [200, 0];
	const [min, arr, range = min + min / (Math.random(0, 1) * 3)] = [30, []];

	do {
		let r = Math.random() * (range - min) + min; // random number in our range
		n -= r; // subtract `min` from `n`
		o.opponent_actions.push(Math.round(n > min ? r : m - total)); // push `r` or remainder 
		total += o.opponent_actions[o.opponent_actions.length - 1]; // keep track of total
	} while (n > min);

	co(o.opponent_actions);
}

//teste la rencontre entre 2 objets
f.checkOverlap = (obj, obj2) => {
	var boundsA = obj.getBounds();
	var boundsB = obj2.getBounds();
	return Phaser.Rectangle.intersects(boundsA, boundsB);
}

//check
f.check = () => {
	f.check_deep(o.paper[0])
	f.check_deep(o.paper[1])
}

//check pour voir si on peut clicker
f.check_pre_sensor = () => {
	f.check_deep_pre_sensor(o.paper[0])
	f.check_deep_pre_sensor(o.paper[1])
}

//verrouiller une fonction pour éviter qu'elle ne se lance plus de deux fois
f.lock = (obj, callback) => {
	if (obj.flag == false) {
		obj.flag = true;
		callback();
	}
}

//check pour voir si le joueur dépasse la limite du gameover
f.check_deep = (obj) => {
	if (f.checkOverlap(obj, o.sensor)) {
		if(obj.name == 0){
			f.lock(obj,()=>{_tr(o.looser_tw[0])})
			f.lock(o.looser[0].text,()=>{_tr(o.looser_tw_text[0])})

			o.paper[0].gameover=true
		}else{
			f.lock(obj,()=>{_tr(o.looser_tw[1])})
			f.lock(o.looser[1].text,()=>{_tr(o.looser_tw_text[1])})
		}
	}
}

//test pour voir si on peut commencer à clicker en fonction de la position de o.pre_sensor
f.check_deep_pre_sensor = (obj) => {
	if (f.checkOverlap(obj, o.pre_sensor)) {
		if (obj.flag_pre_sensor == false) {
			obj.flag_pre_sensor = true
		}
	}
}

//collision
f.collide = (obj, obj2, callback) => {
	game.physics.arcade.collide(obj, obj2, callback, null, this);
}
//converti les points dans un format 100
f.convert_points_to_100=(position)=>{
	let max =h*0.58 //100
	let value;
	value=(position*100)/max
	return value
}

//texte qui suit le papier
f.follow_text = (obj) => {
	o.paper[0].points.y = o.paper[0].fil.y-55
	o.paper[0].points.x = o.paper[0].fil.x
	o.paper[0].points.text = Math.round(f.convert_points_to_100(o.paper[0].points.y))
	o.paper[1].points.y = o.paper[1].fil.y-55
	o.paper[1].points.x = o.paper[1].fil.x
	o.paper[1].points.text = Math.round(f.convert_points_to_100(o.paper[1].points.y))
}

//animation du flash lorsque le joueur clic
f.anim_flash=(obj,p)=>{
	clic.play()
	obj.tw =game.add.tween(p.o).to({ alpha: p.a }, p.t, p.e, true, p.d, p.i, p.y);
	obj.tw.onComplete.add( ()=> {o.flash[1].flag=false},this)
}


// stop le papier 
f.stop_opponent = (obj) => {
	if (f.checkOverlap(obj, o.paper[0])) {
		if (obj.flag == false) {
			obj.flag = true
			
			//f.lock(o.flash[0], ()=> {f.show_flash(o.flash_tw_p0)})
			o.paper[0].body.moves = false
			wait(() => { o.paper[0].body.moves = true }, random(200, 500))
		}
	}
}

//stop le papier => dernier coup 
f.stop_opponent_on_the_last = (obj) => {
	if (f.checkOverlap(obj, o.paper[0])) {
		if (obj.flag == false && o.paper[0].gameover == false) {
			f.show_points(o.paper[0])
			obj.flag = true
			scroll.play()	
			//f.lock(o.flash[0], ()=> {f.show_flash(o.flash_tw_p0)})
			o.paper[0].body.moves = false
			o.paper[0].flag_dont_move = true
			//f.test_behaviour(o.paper[0])
		}
	}
}

//check la durée d'appui pour le pointer
f.get_duration = (pointer, obj) => {
	let lastDuration = pointer.duration;
	if (lastDuration > t.pointer_duration && obj.flag_pre_sensor == true && obj.flag_test_duration == false && obj.flag == false) {
		f.show_points(o.paper[1])
		scroll.play()
		obj.flag_test_duration = true // to lock the function
		obj.flag_dont_move = true
		wait(()=>{grow.play()},250)
		co("long press",obj.name)
		//f.test_behaviour(obj)
	}
}

// anim le pointer
f.anim_scale_pointer = () => {
	if (o.paper[1].flag_dont_move) {
		tw_click.pause();
		if (o.click.scale.x < 3) {
			o.click.scale.x = o.click.scale.x + .08
			o.click.scale.y = o.click.scale.y + .08
		}
		if (o.click.scale.x > 2.5) {
			o.click.visible = false
		}
	}
}

//test la distance numA=joueur numB=autre
f.test_distance=(numA,numB)=>{
	if(o.paper[numA].y > o.paper[numB].y){
		f.show_looser(o.looser_tw[numB])
		f.show_looser(o.looser_tw_text[numB])
		wait(()=>{f.anim_heart_on_winner(numA)},t.show_heart)
	}else{
		f.show_looser(o.looser_tw[numA])
		f.show_looser(o.looser_tw_text[numA])
		wait(()=>{f.anim_heart_on_winner(numB)},t.show_heart)
	}
}



/* lorsque button pressé 
// calcul de distances et annonces du perdant et gagnant
3 cas de figures :
-1. un joueur valide mais on ne sait pas encore l'etat de l'autre joueur
-2. un joueur valide et l'autre a perdu donc le premier est gagnant
-3. un joueur valide et l'autre aussi donc test de distance
*/
f.test_behaviour = (obj) => {
	if(obj.name == 0){
		if(o.paper[1].flag == false && o.paper[1].flag_dont_move == false){
			co("on attend le comportement de paper1","o.paper[1].flag:",o.paper[1].flag,"o.paper[1].flag:",o.paper[1].flag)
			//on vérifier après un laps de temps pour désigner le gagnant
			wait(()=>{if(o.paper[1].flag){f.anim_heart_on_winner(0)}},t.wait_end_game)
		}
		if(o.paper[1].flag){
			co("paper1 a perdu donc paper0 est gagnant")
			wait(()=>{f.anim_heart_on_winner(0)},t.show_looser+300)
		}
		if(o.paper[1].flag_dont_move){
			f.test_distance(0,1);
		}
	}

	if(obj.name == 1){
		//f.show_points(o.paper[1])
		if(o.paper[0].flag == false && o.paper[0].flag_dont_move == false){
			co("on attend le comportement de paper0","o.paper[0].flag:",o.paper[0].flag,"o.paper[0].flag:",o.paper[0].flag)
			//on vérifier après un laps de temps pour désigner le gagnant
			wait(()=>{if(o.paper[0].flag){f.anim_heart_on_winner(1)}},t.wait_end_game)
		}
		if(o.paper[0].flag){
			co("paper0 a perdu donc paper1 est gagnant")
			wait(()=>{f.anim_heart_on_winner(1)},t.show_looser+300)
		}
		if(o.paper[0].flag_dont_move && o.paper[0].body.moves == false){
			f.test_distance(1,0);
		}
	}
}


//animation des coeurs pour montrer que l'on gagne des points
f.anim_heart_on_winner = (side)=>{

	let time = 100
	let delay = 0
	let anim = Phaser.Easing.Linear.None
	let anim2 =  Phaser.Easing.Bounce.Out

	let anim_winner = (num)=>{
		for (var i = 0; i < o.particle.length; i++){
			o.particle[i].x=o.paper[num].points.x;
			o.particle[i].y=o.paper[num].points.y;
			o.particle[i].scale.x = (random(5,10)*.1)
			o.particle[i].scale.y = o.particle[i].scale.x 
			game.add.tween(o.particle[i]).to({x:o.paper[num].points.x + random(-500,500),y:o.paper[num].points.y + random(-500,500)},time*3,anim,true,delay);
			game.add.tween(o.particle[i]).to({alpha:0},time*4,anim,true,delay);
		}
		score.play()
		wait( ()=> {score.play()},250)
		wait( ()=> {score.play()},500)
		wait( ()=> {score.play()},750)
		wait( ()=> {score.play()},1000)
		game.add.tween(interface.roll[num].scale).to({x:1.5,y:1.5},time,anim,true,delay,5,true);
		game.add.tween(interface.points[num].scale).to({x:1.5,y:1.5},time,anim,true,delay,5,true);

	}
	if(flag.heart==false){ //pour éviter de lancer 2 x cette animation
		flag.heart =true	
		if (side == 0){
			co("anim winner 0")
			anim_winner(0)
			wait( ()=> {d[0]=true},time)
		}
		if (side == 1){
			co("anim winner 1")
			anim_winner(1)
			wait( ()=> {d[1]=true},time)
		}
	}
}


//animation des points => counter
f.anim_score=(num)=>{
	if(interface.points[num].text < 30000){
	interface.points[num].text = parseInt(interface.points[num].text) +1

	}
}


// faire appaitre le fil pour annoncer le score
f.show_points = (obj) => {
	//f.lock(d.scroll[num],()=>{scroll.play()})
	obj.fil.body.moves = true
}

// déplace 
f.move_body = function () {
	if (o.paper[1].flag_dont_move == false) {
		o.paper[1].body.moves = true
	}
}
//stop le player pas de collide mais overlap
f.stop_body = function () {
	if (o.paper[1].flag == false) {
		o.paper[1].body.moves = false
		//TODO : 
		//f.lock(o.flash[1], ()=> {f.show_flash(o.flash_tw_p1)})

		f.lock(o.flash[1], ()=> {f.anim_flash(o.flash[1],o.flash_tw_p1)})

	}
}

//objet qui suit le pointer
f.follow_pointer = (obj) => {
	obj.y = game.input.activePointer.y;
}

f.input = () => {
	game.input.onDown.add(f.stop_body, this);
	game.input.onUp.add(f.move_body, this);
	game.input.onUp.add(f.get_duration, this);
}

//pour debugger un body
f.debug = (obj) => {
	game.debug.body(obj)
}

//animation flash lorsqu'on clic
f.show_flash = (p) => {
	// son du clic
	clic.play()
	// animation 
	//TODO : 
	
	tw.flash = _tr(p)
}

//faire trembler la camera
f.shake=()=>{
	game.camera.shake(0.008, 100)
}

//montrer le perdant
f.show_looser = (p) => {
	wait(()=>{ _tr(p)},t.show_looser)
}

//ombre qui suit le joueur
f.shadow_follow = (obj,sha)=>{
	sha.x = obj.x+20
	sha.y = obj.y+20
}

//cacher un objet
f.hide_obj=(obj)=>{
	co(obj)
	obj.visible=false
}

//animation de papiers pour le vainqueur
//peut être supprimé
f.anim_paper_winner = (pos)=>{
	for (var i = 0; i < 7; i++){
		let time = 400
		let delay = 150
		let anim = Phaser.Easing.Linear.None
		let rr = random (0,180)
		game.add.tween(o.paper_winner[i]).to({x:pos,y:interface.roll_0.y},time,anim,true,i*delay);
		game.add.tween(o.paper_winner[i].scale).to({x:.2,y:.2},time,anim,true,i*delay);
		game.add.tween(o.paper_winner[i]).to({angle:rr},time,anim,true,i*delay);
		wait(()=>{f.hide_obj(o.paper_winner[i])},6000)
		wait(f.shake,time+i*delay)
	}
	for (var i = 0; i < 7; i++){
		//o.paper_winner[i].visible=false
	}
}

//decide lorsque le score du joueur touche le papier
f.decision = (obj1,obj2)=>{
	if(obj1.flag_dont_move && obj1.flag_press_engaged == false){
		obj1.flag_press_engaged = true
		f.test_behaviour(obj1)
		co("touch")
	}
}

//regle de trois c étant le nombre à rechercher
// a=b
// c=d
f.proportions = (p)=>{
	//p.a = p.b
	//p.c = p.d
	p.c= (p.a*p.d)/p.b
	return p.c

}

f.arrondir_2_decimales=(num,division)=>{
	let n = Math.round((num/division)*100)/100
	return n
}

//affiche les infos de positions lorsqu'on déplace un objet
// seulement si drapeau debug est en true
f.debug_pos=(obj)=>{
	//if (d.debug) {
		t.debug.visible =true
		let transformx = f.arrondir_2_decimales(obj.x,w)
		let transformy = f.arrondir_2_decimales(obj.y,h)
		t.debug.text="w*" + transformx + "  " + "h*" + transformy
	//}
}

//anime le mask permettant de voir si la fin est proche suivant un distance
f.mask_scale=(obj,mask)=>{
	if ( obj.y > distance_100 ) {
		mask.visible=true
		mask.scale.y=1-obj.y*dist*50
		// pour éviter un scale négatif
		if (mask.scale.y < 0){
			mask.visible =false
		}
	}
}

//adapter le sprite à l'écran
f.adapt_to_screen=(obj)=>{
	obj.scale.y=game.heigth/2280
}

