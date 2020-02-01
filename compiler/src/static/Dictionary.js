const mneumonics = [ "nop", "mov", "swp", "addc", "subc", "mult", "qure", "and", "inv", "xor", "or", "asl"
		, "asr", "lsl", "lsr", "inc", "dec", "push", "pop", "jmp", "cmp", "jls", "jgt", "jz", "jnz", "str"];

function toByte2(dec){
    var s = (dec >>> 0).toString(2);
    return "00000000".substring(s.length)+s;
}

function genOpcode(mneumonic, typeA, typeB, arity){
    var opcode = toByte2(mneumonics.findIndex((m) => mneumonic === m));
    if (mneumonic === 'nop') return "00000000";
    if (mneumonic === 'mov'){
	if (typeA.type === 'Addr' && typeB.type === 'Addr') return opcode+" "+toByte2(typeA.value)+" "+toByte2(typeB.value);
	if (typeA.type === 'Addr' && typeB.type === 'Reg'){
	    opcode = opcode.replaceAt(1, '1');
            return opcode+" "+toByte2(typeA.value)+" "+toByte2(typeB.value);
	}
	if (typeA.type === 'Reg' && typeB.type === 'Addr'){
	    opcode = opcode.replaceAt(0, '1');
	    return opcode+" "+toByte2(typeA.value)+" "+toByte2(typeB.value);
	}
	if (typeA.type === 'Reg' && typeB.type === 'Indir'){
	    opcode = opcode.replaceAt(0, '1').replaceAt(1, '1');
	    return opcode+" "+toByte2(typeA.value)+" "+toByte2(typeB.value);
	}
    }
    if (mneumonic[0] === 'j'){
 	if(typeA.type === "HCV"){
	    return opcode+" "+toByte2(typeA.value);
	} else if(typeA.type === "Reg"){
	    opcode = opcode.replaceAt(0, '1');
	    return opcode+" "+toByte2(typeA.value);
	}
    }
    else{
	opcode = opcode.replaceAt(0, '1');
	if (arity === 2) return opcode+" "+toByte2(typeA.value)+" "+toByte2(typeB.value);
	else if (arity === 1) return opcode+" "+toByte2(typeA.value);
	else return opcode;
    }
}

function bytes2hex(bytes){
    var spl = bytes.split(' ');
    var r = [];
    for(var i = 0; i < spl.length; i++){
	r.push(parseInt(spl[i], 2).toString(16));
    }
    return r;
}

String.prototype.replaceAt=function(index, replacement) {
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}

module.exports = {genOpcode, bytes2hex};
