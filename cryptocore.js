function lsh(binArray,n){
	var binRet=[];
	var foo=n%binArray.length;
	for (var i = foo-1; i < binArray.length; ++i) {
		binRet.push(binArray[i]);
	}
	for (var i = 0; i < foo-1; ++i) {
		binRet.push(binArray[i]);
	}
	return binRet;
}
function rsh(binArray,n){
	var binRet = [];
	var foo = n%binArray.length;
	for (var i = 1; i < foo; ++i) {
		binRet.push(binArray[binArray.length - foo + i]);
	}
	for (var i = 0; i < ( binArray.length - foo + 1); ++i) {
		binRet.push( binArray[i] );
	}
	return binRet;
}
function xor(a,b) {
	return a!==b?1:0;
}
 
function enc(p,k){
	var shp=rsh(p,k.length+1);
	var nk;
	if(k.length < p.length){
		nk=[];
		for (var i = 0; i < p.length; ++i) {
			nk.push( k[i%k.length] );
		}
	}else{
		nk=k;
	}
	var c=[];
	c.push( xor(shp[0],nk[0] ));
	for (var i = 1; i < shp.length; ++i) {
		c.push(xor( shp[i] , xor( nk[i] , c[i-1])));
	}
	var shc = lsh(c,k.length+1);
	return shc;
}
 
function dec(c,k){
	var shc=rsh(c,k.length+1);
	var nk;
	if(k.length < c.length){
		nk=[];
		for (var i = 0; i < c.length; ++i) {
			nk.push( k[i%k.length] );
		}
	}else{
		nk=k;
	}
	var p=[];
	p.push( xor(shc[0],nk[0] ));
	for (var i = 1; i < shc.length; ++i) {
		p.push(xor( shc[i] , xor( nk[i] , shc[i-1])));
	}
	var shp = lsh(p,k.length+1);
	return shp;
} 
var tabl={
	'a':[0,0,0,0,1],
	'b':[0,0,0,1,0],
	'c':[0,0,0,1,1],
	'd':[0,0,1,0,0],
	'e':[0,0,1,0,1],
	'f':[0,0,1,1,0],
	'g':[0,0,1,1,1],
	'h':[0,1,0,0,0],
	'i':[0,1,0,0,1],
	'j':[0,1,0,1,0],
	'k':[0,1,0,1,1],
	'l':[0,1,1,0,0],
	'm':[0,1,1,0,1],
	'n':[0,1,1,1,0],
	'o':[0,1,1,1,1],
	'p':[1,0,0,0,0],
	'q':[1,0,0,0,1],
	'r':[1,0,0,1,0],
	's':[1,0,0,1,1],
	't':[1,0,1,0,0],
	'u':[1,0,1,0,1],
	'v':[1,0,1,1,0],
	'w':[1,0,1,1,1],
	'x':[1,1,0,0,0],
	'y':[1,1,0,0,1],
	'z':[1,1,0,1,0],
	'-':[1,1,0,1,1],
	'_':[0,0,0,0,0],
	'.':[1,1,1,0,0],
	',':[1,1,1,0,1],
	'?':[1,1,1,1,0],
	'!':[1,1,1,1,1]
};
var revl={};
var i;
for ( i in tabl ){
	revl[tabl[i].join('|')]=i;
}
function toBin(msg) {
	var mArray=msg.split('');
	var bin=[];
	for (var i = 0; i < mArray.length; ++i) {
		if(!tabl[mArray[i]]){
			return [];
		}
		bin=bin.concat( tabl[mArray[i]] );
	}
	return bin;
}

function toMsg(bin) {
	var binGr=[];
	for (var i = 0; i < ( bin.length /5 ); ++i) {
		binGr.push(revl[[bin[5*i],bin[5*i+1],bin[5*i+2],bin[5*i+3],bin[5*i+4]].join('|')]);
	}
	return binGr.join('');
}










function $(a){return document.querySelector(a);}

var lis1=function() {
	$('#answ').innerHTML = toMsg( enc( toBin($( '#ipta' ).value.toLowerCase()),toBin( $( '#iptb' ).value ) ) );
}
var lis2=function() {
	$('#answ').innerHTML = toMsg( dec( toBin($( '#ipta' ).value.toLowerCase()),toBin( $( '#iptb' ).value ) ) );
}


$( '#enc' ).onclick=lis1;
$( '#dec' ).onclick=lis2;
 
