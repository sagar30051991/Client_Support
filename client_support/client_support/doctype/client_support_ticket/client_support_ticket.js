cur_frm.cscript.onload = function(){
	console.log(cur_frm.doc)
	this.frm.doc.opening_date = get_today()
}
