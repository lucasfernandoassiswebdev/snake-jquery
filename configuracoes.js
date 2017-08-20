var tempo;
var blocosl = [];
var blocoscol = [];
var linhacomida;
var colunacomida;
var direcaoatual;
var interval;
var arraydirecoes = []

$(document).ready( function() {
	$('#tabela').html(new Array(14).join('<tr>' + 	 Array(21).join('<td></td>') + '</tr>'));
		$('#botao').click( function() {
			if ($('#botao').html('Start')) {
				startgame();
			} else if ($('#botao').html('Pause')) {
				pausegame();
			} else if ($('#botao').html('Voltar')) {
				despause();
			} else {
				$('#botao').html('Restart');
				$('#status').html('Morto'); 
				startgame();
			}
		});
});
			
function startgame() {
	blocoscol = [];
	blocosl = []
	tempo = 300;
	
	var array = $('.snakeCorpo, .snakeRabo, .snakeCabeca, .snakeComida');
	
	for (var i = 0; i < array.length; i++) {
		array[i].attr('class','');
	}	
	
	blocosl[0] = 1;
    blocoscol[0] = 3;
	arraydirecoes.push('D');
	blocosl.push(blocosl[0]);
	blocoscol.push(blocoscol[0] - 1);
	blocosl.push(blocosl[0]);
	blocoscol.push(blocoscol[0] - 2);	
	
	nascecomida();
	
	$('#botao').html('Pause');
	$('#status').html('Status: jogando');
	
	$('#tabela tr:eq(0) td:eq(0)').addClass('snakeRabo');
	$('#tabela tr:eq(0) td:eq(1)').addClass('snakeCorpo');
	$('#tabela tr:eq(0) td:eq(2)').addClass('snakeCabeca');
	
	interval = setInterval(anda, tempo);
};
			
function pausegame() {
	$('#botao').html('Voltar');
	$('#status').html('Status: pausado');
	clearInterval(interval);
}
			
function despause() {
	$('#botao').html('Pause');
	$('#status').html('Status: jogando');
	clearInterval(interval);
	interval = setInterval(anda, tempo);
}

function verificacomida(x,y) {
		for (var i = 0; i < blocoscol.length; i++) {
			if (blocosl[i] == x && blocoscol[i] == y) {
				linhacomida = Math.floor((Math.random() * 13) + 1);
				colunacomida = Math.floor((Math.random() * 20) + 1);
			}
		}
		$('#tabela tr:eq(' + linhacomida + ') td:eq(' + colunacomida + ')').addClass('snakeComida');
};
		
function nascecomida() {
    linhacomida = Math.floor((Math.random() * 13) + 1);
    colunacomida = Math.floor((Math.random() * 20) + 1);
   
	var array = $('.snakeCorpo, .snakeRabo, .snakeCabeca, .snakeComida');
	
	verificacomida(linhacomida,colunacomida);
};
			
function morre() {
	clearInterval(interval);
	$('#botao').html('Restart');
	$('#status').html('Morto');
	$('#tabela tr:eq(' + linhacomida  + ') td:eq(' + colunacomida + ')').removeClass('snakeComida');
};
			
function come() {
	blocosl.push(blocosl[blocosl.length - 1]);
	blocoscol.push(blocoscol[blocoscol.length - 1]);
	
	$('#pontos').html('Pontos: ' + (blocoscol.length - 3));
	nascecomida();
	
	if (tempo > 100) {
		tempo -= 25;
		clearInterval(interval);
		interval = setInterval(anda, tempo);
	}
}

function anda() {
	var lrabo = blocosl[blocosl.length - 1];
	var crabo = blocoscol[blocoscol.length - 1];
	
	$('#tabela tr:eq(' + lrabo + ') td:eq(' + crabo + ')').removeClass('snakeRabo');
	
	for (var i = blocosl.length - 1; i >= 1; i-- ) {
		blocosl[i] = blocosl[i - 1];
		blocoscol[i] = blocoscol[i - 1];
		var className = i == blocosl.length - 1 ? 'snakeRabo' : 'snakeCorpo';
		$('#tabela tr:eq(' + blocosl[i] + ') td:nth-child(' + blocoscol[i] + ')').addClass(className);
	}
	
	direcaoatual = arraydirecoes[arraydirecoes.length - 1];
	
	if (direcaoatual == 'D') {
		if (blocoscol[0] >= 20) {
			blocoscol[0] = 1;
		} else {
			blocoscol[0] += 1;
		}
	} else if(direcaoatual == 'E') {
		if (blocoscol[0] <= 1) {
			blocoscol[0] = 20;
		} else {
			blocoscol[0] -= 1;
		}
	} else if (direcaoatual == 'C') {
		if (blocosl[0] <= 1) {
			blocosl[0] = 13;
		} else {
			blocosl[0] -= 1;
		}
	} else if (direcaoatual == 'B') {
		if (blocosl[0] >= 13) {
			blocosl[0] = 1;
		} else {
			blocosl[0] += 1;
		}
	}
	
	if (arraydirecoes.length > 1){
		arraydirecoes[arraydirecoes.length - 2] = arraydirecoes[arraydirecoes.length - 1]
		arraydirecoes.splice(arraydirecoes.length - 1, 1);
	}
	
	$('#tabela tr:eq(' + blocosl[0] + ') td:eq(' + blocoscol[0] + ')').addClass('snakeCabeca');
	
	if (blocosl[0] == linhacomida && blocoscol[0] == colunacomida)
		come();
	
	for (i = 1; i < blocoscol.length; i++) {
		if (blocosl[0] == blocosl[i] && blocoscol[0] == blocoscol[i]) 
			morre();
	}
}

window.onkeydown = function(e) {
	var key = e.keyCode ? e.keyCode : e.which;
	if (key == 39) {
		if (direcaoatual !== 'E') {
			arraydirecoes.push('D');
		}
	} else if (key == 37) {
		if (direcaoatual !== 'D') {
			arraydirecoes.push('E');
		}
	} else if (key == 38) {
		if (direcaoatual !== 'B') {
			arraydirecoes.push('C');
		}
	} else if (key == 40) {
		if (direcaoatual !== 'C') {
			arraydirecoes.push('B');
		}
	}
}
