from django.shortcuts import render

from rest_framework import generics
from rest_framework import status
from rest_framework.response import Response


from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import authentication, permissions
from django.db.models import Q


from .serializers import MessageSerializer
from .models import Message

class MessageList(generics.ListAPIView):

    #using the token authentication for validating users
    permission_classes = (IsAuthenticated,)
    authentication_classes=(TokenAuthentication,)

    #make use of serializer to data from model and convert it into JSON form
    serializer_class = MessageSerializer

    #query which return the list of messages
    def get_queryset(self):
        return Message.objects.filter(Q(userTo=self.request.user, userFrom__id=self.request.query_params.get("id")) | Q(userTo__id=self.request.query_params.get("id"),userFrom=self.request.user)).order_by('created_at')