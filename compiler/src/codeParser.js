const Dictionary = require('./static/Dictionary.js');

class InstructionLine{
    constructor(line){
	this.arity = 0;
	var spl = line.split(' ');
	this.mneumonic = spl[0];
	this.operandA = ((elem) => {if(elem === undefined) return '_'; else{this.arity++; return elem}})(spl[1]);
	this.operandB = ((elem) => {if(elem === undefined) return '_'; else{this.arity++; return elem}})(spl[2]);
    }
    toOpcode(){
	return Dictionary.bytes2hex(Dictionary.genOpcode( this.mneumonic
							, detType(this.operandA)
						        , detType(this.operandB)
						        , this.arity));
	}
}

function detType(operand){
    switch(operand[0]){
    case 'R':
	return {
	    type: 'Reg',
	    value: operand.substring(1)
	};
	break;
    case 'D':
	return {
	    type: 'HCV',
	    value: operand.substring(1)
	};
	break;
    case 'A':
	return {
	    type: 'Addr',
	    value: operand.substring(1)
	}
	break;
    case 'I':
	return {
	    type: 'Indir',
	    value: operand.substring(1)
	};
	break;
    default:
	return {
	    type: "Misc",
	    value: ""
	}
    }
}

function compile(lines){
    var compiled = lines.map(line => {if (!line.startsWith('@')) return (new InstructionLine(line)).toOpcode()});
    return compiled;
}

module.exports = compile;
