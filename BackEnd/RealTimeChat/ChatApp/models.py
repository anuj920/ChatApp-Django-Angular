from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Message(models.Model):
	message=models.TextField(null=True,blank=True,default="")
	userTo=models.ForeignKey(User,on_delete=models.CASCADE,related_name="userTo")
	userFrom=models.ForeignKey(User,on_delete=models.CASCADE,related_name="userFrom")
	created_at=models.DateTimeField(auto_now_add=True)