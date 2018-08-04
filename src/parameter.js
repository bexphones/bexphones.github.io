// si true montre la grille snap des enemis et render debug
var pop;
var clic;
var grow;
var score;
var scroll;
var flag = {
	start_game: false,
	heart:false,//pour éviter de lancer 2 x cette animation
}
var te={}
var f = {}



// animation
var a={};

// object
var o = {
	background_main: "obj",
}

// object config
var op={};

// texte
var te = {}
// texte config
var tp={};

// buttons
var b = {
	play: "",
	how_to: "",
	timer: "",
}
// button config
var bp={};
var e = {//effects

}
//sounds
var s = {

}
//drapeau
var d={
	debug : true,
};



var interface = {

}
// a supprimer

var tw = {
	0:"something",
	1:"something",
};
var click_tw;
//TODO : changer en time

var t = {
	searching_opponent: 500,
	pointer_duration: 500,
	start_opponent: 3000,
	show_looser: 1000, //temps du délai de l'animation du looser
	show_heart : "",
	looser: 3000, //temps de l'animation pour l'apparition du looser
	cloud: 500,
	start_game: 1500 + 4000,
	wait_end_game : 3000,
}
// pour renseigner un paramètre propre à un objet
t.show_heart = t.show_looser - 500

// calcul des dimensions de l'écran
var h = 2270;
var w = 1480;
var h2 = h * .5;
var w2 = w * .5;
var w0 = Math.round(w * .19);
var w4 = Math.round(w * .75);


