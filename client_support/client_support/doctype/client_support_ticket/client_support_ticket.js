var status;
var closing_date;
var isSupport_User;
/*
cur_frm.cscript.refresh = function(){
	console.log("refresh");
	cur_frm.cscript.onload();
}*/


cur_frm.cscript.onload = function(doc,dt,dn){
	// Check user role and disable/enable respective fields	
	// console.log(doc);
	status = this.frm.doc.status;
	closing_date = this.frm.doc.closing_date;
	isSupport_User = false;
	
	if(this.frm.doc.subject)
	{
		this.frm.set_df_property("subject","read_only",1);
	}	
	

	isSupport_User = isSupportUser();

	if(isSupport_User){
		this.frm.set_df_property("issue","read_only",1);
		this.frm.set_df_property("project","read_only",1);
		this.frm.set_df_property("description","read_only",1);
		this.frm.set_df_property("subject","read_only",1);

		// If Support user has seen the issue then change the status to In Process
		/*if(this.frm.doc.status == "Open"){
			// this.frm.doc.status = status = "In Progress";
			this.frm.doc.status = status = "In Progress";
			refresh_field("status")
		}*/
	}		
	else{		
		this.frm.set_df_property("resolution_details","read_only",1);
		
		setTimeout(function(){
			$(".form-assignments").css("display","none");
		}, 1000);
		
		// if status is open and user is client then hide the resolution section set closing date to none
		if (this.frm.doc.status == "Open"){
			this.frm.doc.closing_date = "";
			this.frm.set_df_property("resolution","hidden",1);
		}
		else{
			this.frm.set_df_property("project","read_only",1);
			this.frm.set_df_property("request_type","read_only",1);
		}
	}
}

cur_frm.cscript.subject=function(){

	if(this.frm.doc.subject !="")
	{
		this.frm.set_df_property("subject","read_only",1);
	}
}

cur_frm.cscript.status = function(){
	console.log("status");
	// if support user and status is set to close then set resolution details field mandatory
	if(isSupport_User){
		if(this.frm.doc.status == "Closed" || this.frm.doc.status == "Completed" || this.frm.doc.status == "Not a Issue" || this.frm.doc.status == "ChangeRequest"){
			this.frm.doc.closing_date = closing_date
			
			this.frm.set_df_property("resolution_details","reqd", 1);
			if(this.frm.doc.status == "Closed")
				this.frm.doc.closing_date = frappe.datetime.now_datetime();

			refresh_field('closing_date');
		}
		else if(this.frm.doc.status == "Open" && status != "Open"){
			show_alert("Support user can not change the status to Open");
			this.frm.doc.status = status
			refresh_field('status')
			this.frm.doc.resolution_details.focus();
		}
		else
			this.frm.set_df_property("resolution_details","reqd", 0);
	}
	else{
		// Client can not set status to In Progress, Not Issue, and Completed
		var result = this.frm.doc.status == "In Progress" || this.frm.doc.status == "Not a Issue" || this.frm.doc.status == "Completed";
		result = this.frm.doc.status != status && result	// allow to change the status to open, closed and saved status

		if(result){
			show_alert("Sorry, You can't change status to "+this.frm.doc.status);
			this.frm.doc.status = status;
			refresh_field('status')
		}
	}
}

// Trigger on Request Type Field
cur_frm.cscript.request_type = function(){
	console.log("request_type");
	// Perform some action after user changes the request type
	if (isSupport_User) {
		console.log("Request Type has been changed to "+this.frm.doc.request_type);
	};
}

isSupportUser = function(){
	// return true if user role Client

	for (var i = 0; i < user_roles.length; i++) {
		if(user_roles[i] == 'Client')
			return false;
		else if(user_roles[i] == 'Support User' || user_roles[i] == 'Support Manager')
			return true;
	}
}