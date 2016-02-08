
cur_frm.cscript.onload=function(){
	this.hide_fields1(this.frm.doc);
	this.hide_fields2(this.frm.doc);
}
cur_frm.cscript.hide_fields1 = function(doc) {
	hf=['date_of_cr','description','estimated_hrs','approved_hrs','delivery_date','resource_engaged','comments'];
	hide_field(hf);
}
cur_frm.cscript.hide_fields2 = function(doc) {
	hf1=['support','date','description_of_work_done','hrs_spent','re','c'];
	hide_field(hf1);
}

cur_frm.cscript.action=function(){

	if(this.frm.doc.action =="Change Request")
	{
		this.unhide_fields1(this.frm.doc);
	}
	else
	{
		this.hide_fields1(this.frm.doc)
	}
	if(this.frm.doc.action =="Support")
	{
		this.unhide_fields2(this.frm.doc);
	}
	else
	{
		this.hide_fields2(this.frm.doc)
	}
}
cur_frm.cscript.unhide_fields1=function(doc){
	uf=['date_of_cr','description','estimated_hrs','approved_hrs','delivery_date','resource_engaged','comments'];
	unhide_field(uf);
}
cur_frm.cscript.unhide_fields2=function(doc){
	uf1=['support','date','description_of_work_done','hrs_spent','re','c'];
	unhide_field(uf1);
}
