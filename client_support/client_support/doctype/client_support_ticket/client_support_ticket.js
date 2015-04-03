var status = this.frm.doc.status;
var closing_date = this.frm.doc.closing_date;

cur_frm.cscript.onload = function(){
	// Check user role and disable/enable respective fields	
	var isSupport_User = isSupportUser()
	if(isSupport_User){
		this.frm.set_df_property("issue","read_only",1);
		this.frm.set_df_property("project","read_only",1);
		this.frm.set_df_property("description","read_only",1);

		// If Support user has seen the issue then change the status to In Process
		if(this.frm.doc.status == "Open"){
			this.frm.doc.status = status = "In Progress";
			refresh_field("status")
		}
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
	}
}

cur_frm.cscript.status = function(){
	// if support user and status is set to close then set resolution details field mandatory
	if(isSupportUser()){
		if(this.frm.doc.status == "Closed" || this.frm.doc.status == "Completed" || this.frm.doc.status == "Not a Issue"){
			this.frm.doc.closing_date = closing_date
			
			this.frm.set_df_property("resolution_details","reqd", 1);
			if(this.frm.doc.status == "Closed")
				this.frm.doc.closing_date = frappe.datetime.now_datetime();

			refresh_field('closing_date');
		}
		else if(this.frm.doc.status == "Open"){
			alert("Support user can not change the status to Open");
			this.frm.doc.status = status
			console.log(status)
			refresh_field('status')
			this.frm.doc.resolution_details.focus();
		}
		else
			this.frm.set_df_property("resolution_details","reqd", 0);
	}
	else{
		console.log("client")
		console.log(status)
		if(this.frm.doc.status == "In Progress" || this.frm.doc.status == "Not a Issue" || this.frm.doc.status == "Completed"){
			alert("Sorry, You can't change status to "+this.frm.doc.status);
			this.frm.doc.status = status;
			refresh_field('status')
		}
	}
}

isSupportUser = function(){
	// return true if user role Client
	var result = false;

	for (var i = 0; i < user_roles.length; i++) {
		if(user_roles[i] == 'Client')
			return false;
		else if(user_roles[i] == 'Support User')
			return true;
	}
}