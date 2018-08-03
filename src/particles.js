_p = function (p) {
		p.name = game.add.emitter(p.x,p.y);
		p.name.makeParticles("p.name");
		p.name.minParticleSpeed.setTo(-900,900);
		p.name.maxParticleSpeed.setTo(900,-900);
		p.name.setAlpha(0.5,0.1);
		p.name.minParticleScale = 0.1;
		p.name.maxParticleScale = 0.4;
		p.name.minRotation = 0;
		p.name.maxRotation = 0;
		p.name.on=false;
		p.g.time.events.add(p.delay,function(){p.name.start(true,p.lifetime,null,p.number);},this);
}
