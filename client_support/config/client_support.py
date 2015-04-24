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
					"name": "Client Support Ticket",
					"description": _("client support ticket.")
				},
				{
					"type": "doctype",
					"name": "Project",
					"description": _("Project Master.")
				},
			]
		},
	]
