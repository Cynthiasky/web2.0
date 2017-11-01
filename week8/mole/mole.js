var frag = document.createDocumentFragment;

for(var i = 0; i < 6; i++) {
	for(var j = 0; j < 10; j++) {
		var mole = document.createElement("div");
		frag.appendChild(mole);
	}
	var new_line = document.createElement("br");
	frag.append(new_line);
}
game.appendChild(frag);