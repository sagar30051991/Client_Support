from __future__ import unicode_literals
from frappe import _

def get_data():
	return [
		{
			"label": _("Documents"),
			"icon": "icon-star",
			"items": [
				{
					"type": "doctype",
					"name": "Project",
					"description": _("All Projects."),
				},
				{
					"type": "doctype",
					"name": "Client Support Ticket",
					"description": _("Clients Issues and resolutions."),
				},
				{
					"type": "doctype",
					"name": "Project Health Weekly Report",
					"description": _("Weekly project status."),
				},
				{
					"type": "doctype",
					"name": "Sprint",
					"description": _("Project Sprints."),
				},
				{
					"type": "doctype",
					"name": "Release Report",
					"description": _("Project Releases and Versions."),
				},
			]
		},
		{
			"label": _("Requirement Tracking"),
			"icon": "icon-star",
			"items": [
				{
					"type": "doctype",
					"name": "Business Requirements",
					"description": _("Business Requirements."),
				},
				{
					"type": "doctype",
					"name": "Functional Requirement",
					"description": _("Functional Requirements."),
				},
			]
		},
		{
			"label": _("ChangeRequest and Support"),
			"icon": "icon-star",
			"items": [
				{
					"type": "doctype",
					"name": "Wale",
					"description": _("change Request."),
				},
				{
					"type": "doctype",
					"name": "Vesta Si",
					"description": _("change Request."),
				},
				{
					"type": "doctype",
					"name": "HealthSnapp",
					"description": _("change Request."),
				},
				{
					"type": "doctype",
					"name": "Digitales",
					"description": _("change Request."),
				},
			]
		},
		{
			"label": _("Main Reports"),
			"icon": "icon-table",
			"items": [
				{
					"type": "report",
					"name":"Client Support Ticket Report",
					"doctype": "Client Support Ticket",
					"is_query_report": True,
				},
			]
		},
	]