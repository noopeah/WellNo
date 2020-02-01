
function findMarks(source){
    var marks = [];
    var totalOffset = 0;
    for (var i = 0; i < source.length; i++){
	var spl = source[i].split(' ');
	totalOffset += spl.length;
	if(spl[0].startsWith('@')){
	    marks.push({offset: totalOffset, markName: spl[0].substring(1)});
	}
    }
    return marks;
}

function replaceNames(source, marks){
    return source.map((line) =>
		      {
			  var l = line;
			  if(line.split(' ').length > 1){
			      var cName = line.split(' ')[1].substring(1);
			      var mark = marks.find(el => el.markName === cName);
			      if(mark !== undefined) l = line.replace(cName, mark.offset);
			  }
			  return l;
		      });
}

module.exports = {findMarks, replaceNames};
