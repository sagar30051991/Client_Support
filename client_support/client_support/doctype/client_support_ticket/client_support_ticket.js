cur_frm.cscript.onload = function(){
	/*this.frm.doc.opening_date = get_today()*/
	//this.frm.doc.opening_date = frappe.datetime.get_today()
	//console.log(cur_frm.doc)
	/*if('Client' == user_roles[0]){
		this.frm.set_df_property("resolution_details","read_only",1);
	}
	else if('Support User' == user_roles[0]){
		this.frm.set_df_property("issue","read_only",1);
		this.frm.set_df_property("project","read_only",1)
		this.frm.set_df_property("description","read_only",1)
	}*/

	if(isClient(user_roles))
		this.frm.set_df_property("resolution_details","read_only",1);
	else{
		this.frm.set_df_property("issue","read_only",1);
		this.frm.set_df_property("project","read_only",1);
		this.frm.set_df_property("description","read_only",1);
	}
}

isClient = function(role_list){
	// return true if user role Client
	console.log("inClient");
	for(role in user_roles){
		if(role == 'Client')
			return true;
		else if(role == 'Support User')
			return false;
	}
}