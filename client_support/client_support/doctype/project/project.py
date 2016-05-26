# Copyright (c) 2013, Makarand Bauskar and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class Project(Document):
	pass

@frappe.whitelist()
def get_info_client_user(doctype, txt, searchfield, start, page_len, filters):
	return frappe.db.sql("""select parent from tabUserRole where role='Client User'""",as_list=1)

@frappe.whitelist()
def get_info_client_support_user(doctype, txt, searchfield, start, page_len, filters):
	return frappe.db.sql("""select parent from tabUserRole where role='Client Support User'""",as_list=1)

@frappe.whitelist()
def get_info_client_support_manager(doctype, txt, searchfield, start, page_len, filters):
	return frappe.db.sql("""select parent from tabUserRole where role='Client Support Manager'""",as_list=1)
	