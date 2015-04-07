# Copyright (c) 2013, Makarand Bauskar and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe

def execute(filters=None):
	if not filters: filters = {}

	columns = get_columns(filters)
	item_map = get_item_details(filters)

	data = item_map
	return columns, data


def get_columns(filters):
	"""return columns based on filters"""

	columns = ["Name:Link/Client Support Ticket:100", "Project:Link/Project Name:100", "Request Type::175", "Priority::100", "Status::200", "Start Date::200", \
	"Closing Date::200"]

	return columns

def get_item_details(filters):
	conditions = get_conditions(filters)

	return frappe.db.sql("select name,project,request_type,priority,status,start_date, closing_date \
		from `tabClient Support Ticket` where %s" % conditions, as_list=1)

def get_conditions(filters):
	conditions = ""

	if filters.get("status"):
		conditions = "status = '%s'" % filters.get("status")

	if filters.get("project_name") and conditions:
		conditions += "and project='%s'" % filters.get("project_name")

	return conditions