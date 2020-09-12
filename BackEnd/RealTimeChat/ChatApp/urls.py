from django.urls import path
from . import views

urlpatterns = [
    path('messagelist/', views.MessageList.as_view(), name = "messagelist"),
]