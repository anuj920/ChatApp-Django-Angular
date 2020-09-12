from django.shortcuts import render

from django.contrib.auth.models import User
from django.contrib.auth import authenticate

from rest_framework import generics
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication

from .serializers import UserSerializer

class Register(APIView):
    """ View to create a user by validating password. """

    def post(self, request):
        password = request.data.get("password")
        username = request.data.get("username")
        user_serializer=UserSerializer(data=request.data)
        if(User.objects.filter(username=username).exists()):
            return Response({"message":"A Account Already Exist with username"},status=status.HTTP_400_BAD_REQUEST)
        elif user_serializer.is_valid():
        	user=User.objects.create_user(username=username,password=password)
        	user.is_active = True
        	user.save()
        	return Response({"message":"Account created"},status=status.HTTP_200_OK)
        else:
        	return Response({"error":user_serializer.errors},status=status.HTTP_400_BAD_REQUEST)	
        return Response({"message":"User with this email already exists.","flag":False},status=status.HTTP_400_BAD_REQUEST)


class Login(APIView):
    """ View to login the user by creating a authentication token for the user. """

    def post(self, request):
        name = request.data.get("username")
        password = request.data.get("password")
        try:
            user_exists=User.objects.filter(username=name)
            if not user_exists.exists():
                return Response({ "message": "User with this details not exists.", "flag": False },status=status.HTTP_400_BAD_REQUEST)
            user_obj=authenticate(username=user_exists[0].username,password=password)
            if user_obj:
                user_token,created=Token.objects.get_or_create(user=user_obj)
                return Response({"message": "Login Successfully", "token": user_token.key, "username": user_obj.username}, status=status.HTTP_200_OK)
            else:
                return Response({ "message": 'Password Incorrect', "flag": False }, status=status.HTTP_401_UNAUTHORIZED)
        except Exception as e:
            return Response({'message': 'Please enter a valid username and password.', "details": str(e), "flag": False}, status=status.HTTP_401_UNAUTHORIZED)



class Logout(generics.DestroyAPIView):
    """ View to logout the user by Token """
    
    permission_classes = (IsAuthenticated,)
    authentication_classes = (TokenAuthentication,)

    def get_object(self):
        """
        :return:
        """
        return self.request.auth
