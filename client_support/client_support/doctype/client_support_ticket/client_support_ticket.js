cur_frm.cscript.onload = function(){
	// if status is open then set closing date to none

	if (this.frm.doc.status == "Open")
		this.frm.doc.closing_date = "";
	/*else if(this.frm.doc.status == "Close")
		this.frm.doc.closing_date = frappe.datetime.now_datetime();*/

	// Check user role and disable/enable respective fields
	if(isSupportUser(user_roles)){
		this.frm.set_df_property("issue","read_only",1);
		this.frm.set_df_property("project","read_only",1);
		this.frm.set_df_property("description","read_only",1);
	}		
	else
		this.frm.set_df_property("resolution_details","read_only",1);
}

cur_frm.cscript.status = function(){
	// if status is set to close then set resolution details field mandatory
	if(this.frm.doc.status == "Close"){
		console.log(frappe.datetime.now_datetime());
		this.frm.set_df_property("resolution_details","reqd", 1);
		this.frm.doc.closing_date = frappe.datetime.now_datetime();
		refresh_field('closing_date');
	}
	else
		this.frm.set_df_property("resolution_details","reqd", 0);
}

isSupportUser = function(role_list){
	// return true if user role Client
	var result = false;

	for (var i = 0; i < user_roles.length; i++) {
		if(user_roles[i] == 'Client')
			return false;
		else if(user_roles[i] == 'Support User')
			return true;
	}
}