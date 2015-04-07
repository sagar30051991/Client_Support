# Copyright (c) 2013, Makarand Bauskar and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document
from frappe.model.naming import make_autoname
from frappe.utils import now_datetime, now, cstr
from frappe import msgprint
import datetime
import time

class ClientSupportTicket(Document):
	
	def autoname(self):
		project_name = self.project[:3]
		self.name = make_autoname(project_name + ".####")

	def validate(self):
		# validation 
		if not self.project:
			msgprint("Please select the project")

	def on_update(self):
		# if status is closed then set closing date
	
		if self.status == "Open":
			# if status is open then set opening date
			# check if start_date is already set if not then set the value

			odt = frappe.db.get_value("Client Support Ticket","start_date","start_date")
			if not odt:
				self.start_date = datetime.datetime.strptime(now(),'%Y-%m-%d %H:%M:%S.%f').strftime('%Y-%m-%d %H:%M:%S')
			else:
				self.start_date = odt 

		elif self.status == "Close":
			self.closing_date = datetime.datetime.strptime(now(),'%Y-%m-%d %H:%M:%S.%f').strftime('%Y-%m-%d %H:%M:%S')

	def get_ticket_details(self):
		ret = {}
		det = frappe.db.sql("""select status from `tabClient Support Ticket` where name = %s""", self.name)
		if det:
			ret = {
				'status': cstr(det[0][0]),
			}
		return ret