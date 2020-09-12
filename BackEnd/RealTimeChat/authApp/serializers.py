from django.contrib.auth.models import User
from rest_framework import serializers

from rest_framework.exceptions import ValidationError
from django.contrib.auth.password_validation import validate_password


class UserSerializer(serializers.ModelSerializer):

	def validate_username(self,username):
		user_exists=User.objects.filter(username=username).exists()
		if user_exists:
			raise ValidationError('Invalid ')
		return username

	def validate_password(self,password):
		valid_password=validate_password(password)		
		return password

	class Meta:
		model = User
		fields='__all__'