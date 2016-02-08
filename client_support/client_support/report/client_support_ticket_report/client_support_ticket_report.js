// Copyright (c) 2013, Makarand Bauskar and contributors
// For license information, please see license.txt

frappe.query_reports["Client Support Ticket Report"] = {
	"filters": [
		{
			"fieldname":"project_name",
			"label": __("Project"),
			"fieldtype": "Link",
			"options": "Project",
			"default": frappe.defaults.get_user_default("project_name")
		},
		{
			"fieldname":"status",
			"label": __("Status"),
			"fieldtype": "Select",
			"options": ["Open", "In Progress", "Not a Issue", "Completed", "Closed"],
			"default": "Open"
		}
	]
}