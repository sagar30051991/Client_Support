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

	# def on_update(self):
	# 	# if status is closed then set closing date
	
	# 	if self.status == "Open":
	# 		# if status is open then set opening date
	# 		# check if start_date is already set if not then set the value

	# 		odt = frappe.db.get_value("Client Support Ticket","start_date","start_date")
	# 		if not odt:
	# 			self.start_date = datetime.datetime.strptime(now(),'%Y-%m-%d %H:%M:%S.%f').strftime('%Y-%m-%d %H:%M:%S')
	# 		else:
	# 			self.start_date = odt 
# ,"\n<br><b>Resolution:</b>"+self.resolution_details or 
	# 	elif self.status == "Close":
	# 		self.closing_date = datetime.datetime.strptime(now(),'%Y-%m-%d %H:%M:%S.%f').strftime('%Y-%m-%d %H:%M:%S')

	def get_ticket_details(self):
		ret = {}
		det = frappe.db.sql("""select status from `tabClient Support Ticket` where name = %s""", self.name)
		if det:
			ret = {
				'status': cstr(det[0][0]),
			}
		return ret

	def on_update(self):
		if (self.status == "Open" or self.status == "Reopen" or self.status == "In Progress" or self.status == "Not a Issue" or self.status == "Completed" or self.status == "Closed" ):
			manager_list=frappe.db.sql("select client_user,support_client_user,client_support_manager from tabProject where name= '%s'"%(self.project), as_list=1)
			if manager_list:
				print manager_list,"manager_list"
				for email_id in manager_list:
					print email_id,"email_id"
					self.send_mail(email_id)

	def send_mail(self,email_id):
		resolution_details = self.resolution_details or ""
		subj = ("New Support Ticket")
		messages = ("<b>New Support Ticket</b>:{0}{1}{2}{3}{4}").format(self.name,"<br><b>Status:</b>"+self.status,"<br><b>Subject:</b>"+self.subject,"\n<br><b>Description:</b>"+self.description,"\n<br><b>Resolution:</b>"+resolution_details)
		frappe.sendmail(email_id,subject=subj,message=messages)

def get_permission_query_conditions(user):
	if user in ("Administrator", "System Manager"):
		return ""
	elif "Client User" in frappe.get_roles() or "Client Support User" in frappe.get_roles() or "Client Support Manager":
		return ""
		# print user,"\n\n\n\n\n\n\n\n"		
		# projects = frappe.db.sql("""select name from `tabProject` where client_user ='{0}'""".format(user)) 
		# print("hiiiiiiiiiiiiiii",projects)
		# return frappe.db.sql("select name from `tabClient Support Ticket` where project in '{0}'".format(",".join(["'%s'"%project for project in projects])))
		# print ("hellllllllllllllllllllllll",format(join(["'%s'" %project for project in projects])))