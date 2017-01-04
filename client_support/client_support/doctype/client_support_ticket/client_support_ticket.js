cur_frm.cscript.onload = function(doc,dt,dn){

	for (var i = 0; i < user_roles.length; i++) {
		if(user_roles[i]=='Client Support User'){
			this.frm.set_df_property("issue","read_only",1);
			this.frm.set_df_property("project","read_only",1);
			this.frm.set_df_property("description","read_only",1);
			this.frm.set_df_property("subject","read_only",1);
			refresh_field('issue');
			refresh_field('project');
			refresh_field('description');
			refresh_field('subject');
			if(this.frm.doc.status == "Closed")
				this.frm.doc.closing_date = frappe.datetime.now_datetime();
			refresh_field('closing_date');
		}
		else if(user_roles[i]=='Client User')
		{
			/*this.frm.set_df_property("project","read_only",1);*/
			this.frm.set_df_property("resolution_details","read_only",1);
			refresh_field('resolution_details');
			/*cur_frm.cscript.custom_validate = function(doc) {
			    if (doc.status =="In Progress" || doc.status =="Not a Issue"||doc.status == "Completed") {
			        msgprint("You can not allow to select this status ");
			        validated = false;
			    
				}
			}*/	
			if(this.frm.doc.status == "Open")
				this.frm.doc.start_date = frappe.datetime.now_datetime();
			refresh_field('start_date')
			if(this.frm.doc.status == "Closed")
				this.frm.doc.closing_date = frappe.datetime.now_datetime();
			refresh_field('closing_date')
			if(this.frm.doc.status == "Reopen")
				this.frm.doc.start_date = frappe.datetime.now_datetime();
				this.frm.set_df_property("resolution_details","read_only",0);
				this.frm.set_df_property("project","read_only",0);
				this.frm.set_df_property("subject","read_only",0);
				this.frm.set_df_property("description","read_only",0);
	  	}	
	}
}
cur_frm.cscript.custom_refresh = function(doc) {
    // use the __islocal value of doc, to check if the doc is saved or not
    cur_frm.set_df_property("request_type", "read_only", doc.__islocal ? 0 : 1);
    cur_frm.set_df_property("priority", "read_only", doc.__islocal ? 0 : 1);
    cur_frm.set_df_property("start_date", "read_only", doc.__islocal ? 0 : 1);
}