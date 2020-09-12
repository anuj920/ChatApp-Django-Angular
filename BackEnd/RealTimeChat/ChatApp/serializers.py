
from rest_framework import serializers

from .models import Message

class MessageSerializer(serializers.ModelSerializer):

	username=serializers.ReadOnlyField(source='userFrom.username',read_only=True)
	
	class Meta:
		model=Message
		fields='__all__'
		extra_kwargs={'userFrom':{'required':False}}
		extra_fields=['usernameFrom']