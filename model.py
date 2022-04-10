import os
from peewee import *

from flask import Flask
#import logging

import psycopg2
from peewee import *
from playhouse.postgres_ext import *
from playhouse.shortcuts import model_to_dict, dict_to_model
import json
from flask_login import UserMixin, current_user


usname = os.getenv('PQUSER2')
passwd = os.getenv('PQPASS')
phost = os.getenv('PQHOST')

db = PostgresqlDatabase(
	'korean',
	user = 'sedj',
	password = 'ss',
	host = '0.0.0.0'
)

class Korean_words(Model, UserMixin):
	id = IntegerField()
	words = TextField()
	translate = TextField()
	base_2 = TextField()
	general_thema = TextField()
	main_thema = TextField()
	special_thema = TextField()
	part_of_speech = TextField()
	stage = TextField()
	class Meta:
		db_table = 'words'
		database = db

class Count_words(Model, UserMixin):
	id = IntegerField()
	original = TextField()
	translate = TextField()
	base_2 = TextField()
	general_thema = TextField()
	main_thema = TextField()
	special_thema = TextField()
	part_of_speech = TextField()
	stage = TextField()
	class Meta:
		db_table = 'count'
		database = db

db.connect

def query_words():
	get_data =  Korean_words.select().order_by(Korean_words.translate)
	data_to_json = [model_to_dict(data) for data in get_data]
	print(data_to_json)
	return data_to_json

def query_chine_digits():
	get_data = Count_words.select().where(Count_words.main_thema=="chine_digits")
	data_to_json = [model_to_dict(data) for data in get_data]
	return data_to_json

def query_korean_digits():
	get_data =  Count_words.select().where(Count_words.main_thema=="korean_digits")
	data_to_json = [model_to_dict(data) for data in get_data]
	return data_to_json

def query_count_words():
	get_data =  Count_words.select().where(Count_words.general_thema=="count_words").order_by(Count_words.translate)
	data_to_json = [model_to_dict(data) for data in get_data]
	return data_to_json


def query_time_sub_menu():
	get_data = Korean_words.select().where(Korean_words.general_thema=="time", Korean_words.main_thema!="")

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
	print(get_data)			
	data_to_json = [model_to_dict(data) for data in get_data]
	return data_to_json
