import os
import logging

from peewee import *

from flask import Flask
import logging


from playhouse.shortcuts import model_to_dict, dict_to_model
import json
from flask_login import UserMixin, current_user


logging.basicConfig(
	level=logging.INFO, 
	format="%(asctime)s | %(levelname)-8s | %(name)-20s | %(message)s",
    datefmt="%H:%M:%S",
)



usname = os.getenv('PQUSER2')
passwd = os.getenv('PQPASS')
phost = os.getenv('PQHOST')

db = PostgresqlDatabase(
	'korean',
	user = 'sedj',
	password = 'ss',
	host = '0.0.0.0',
)

class Korean_words(Model, UserMixin):
	original = TextField(primary_key=True)
	translate = TextField()
	base_2 = TextField()
	general_thema_en = TextField()
	general_thema_ru = TextField()
	main_thema_en = TextField()
	main_thema_ru = TextField()
	special_thema_en = TextField()
	special_thema_ru = TextField()
	part_of_speech = TextField()
	stage = IntegerField()
	lesson = IntegerField()
	text_type = TextField()
	class Meta:
		db_table = 'words'
		database = db

#class Count_words(Model, UserMixin):
#	id = IntegerField()
#	original = TextField()
#	translate = TextField()
#	base_2 = TextField()
#	general_thema = TextField()
#	main_thema = TextField()
#	special_thema = TextField()
#	part_of_speech = TextField()
#	stage = TextField()
#	class Meta:
#		db_table = 'count'
#		database = db

db.connect

def query_words():
	get_data = Korean_words.select().order_by(Korean_words.general_thema_ru)
	data_to_json = [model_to_dict(data) for data in get_data]

	logging.info(('data_to_json: ', data_to_json))

	ready_data_json = []
	for i in data_to_json:
		ready_data_json.append(i['general_thema_en']) 

	obj = {}
	for i in ready_data_json:
		obj.setdefault(i, [])

	for i in data_to_json:
		for key, val in obj.items():
			if key == i['general_thema_en']:
				obj[key].append(i)
	#category = []
	#n = 0
	#while n < len(data_to_json):
	#	if n+1 == len(data_to_json):
	#		category.append(data_to_json[n])
	#		ready_data_json.append(category)
	#		break
	#	elif data_to_json[n]['general_thema_en'] == data_to_json[n+1]['general_thema_en']:
	#		category.append(data_to_json[n])
	#	else:
	#		category.append(data_to_json[n])
	#		ready_data_json.append(category)
	#		category = []
	#	n+=1
	print("DATA ", obj, '\n')
	return obj 


#def query_chine_digits():
#	get_data = Count_words.select().where(Count_words.main_thema=="chine_digits")
#	data_to_json = [model_to_dict(data) for data in get_data]
#	return data_to_json
#
#def query_korean_digits():
#	get_data =  Count_words.select().where(Count_words.main_thema=="korean_digits")
#	data_to_json = [model_to_dict(data) for data in get_data]
#	return data_to_json
#
#def query_count_words():
#	get_data =  Count_words.select().where(Count_words.general_thema=="count_words").order_by(Count_words.translate)
#	data_to_json = [model_to_dict(data) for data in get_data]
#	return data_to_json
#
#
#def query_time_sub_menu():
#	get_data = Korean_words.select().where(Korean_words.general_thema=="time", Korean_words.main_thema!="")

#	temp_thema = ''
#	temp_array = []
#	time_array = []
#
#	for i in range(len(get_data)):
#		if len(temp_array) == 0:
#			temp_thema = get_data[i].main_thema
#			temp_array.append(get_data[i])
#		elif get_data[i].main_thema == temp_thema:
#			temp_array.appen(get_data[i])
#		else:
#			time_array.append(temp_array)
#			temp_array = []	
#			temp_thema = ''
#	print(get_data)			
#	data_to_json = [model_to_dict(data) for data in get_data]
	return data_to_json
