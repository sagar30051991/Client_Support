// Copyright (c) 2016, Makarand Bauskar and contributors
// For license information, please see license.txt

frappe.ui.form.on("Project","refresh",function(frm){
	cur_frm.fields_dict['client_user'].get_query = function(doc) {
		return {
			query:"client_support.client_support.doctype.project.project.get_info_client_user",
		}
	}
	cur_frm.fields_dict['support_client_user'].get_query = function(doc) {
		return {
			query:"client_support.client_support.doctype.project.project.get_info_client_support_user",
		}
	}
	cur_frm.fields_dict['client_support_manager'].get_query = function(doc) {
		return {
			query:"client_support.client_support.doctype.project.project.get_info_client_support_manager",
		}
	}
})
