from ChatApp.models import Message
from django.contrib.auth.models import User
import json

    
class OnlineUserList:
    __instance = None
    def __init__(self):
        if not OnlineUserList.__instance:
            self.user_list=set()
            print("__init__ method called but nothing is created")
        else:
            print("instance already created:", self.getInstance())

    @classmethod
    def getInstance(cls):
        if cls.__instance is None:
            cls.__instance = OnlineUserList()
        return cls.__instance

    def get_user_list(self):
        return self.user_list

    def addUser(self,username,id):
        self.user_list.add(json.dumps({"username":username,"id":id}))

    def removeUser(self,username,id):
        self.user_list.discard(json.dumps({"username":username,"id":id}))


def get_online_user(detail):
    userListObj=OnlineUserList.getInstance()
    userListObj.addUser(detail.get("username"),detail.get("id"))

    dict_to_be_send= {
        "handle_type":detail.get("type"),
        "online_users":list(userListObj.get_user_list())
    }
    return dict_to_be_send


def remove_online_user(detail):
    userListObj=OnlineUserList.getInstance()
    userListObj.removeUser(detail.get("username"),detail.get("id"))

    dict_to_be_send= {
        "handle_type":"online_users",
        "online_users":list(userListObj.get_user_list())
    }
    return dict_to_be_send


def save_message(detail):
    Message.objects.create(userFrom=User.objects.get(username=detail.get("username")),message=detail.get("message"),userTo=User.objects.get(id=detail.get("userTo")))

def send_message(detail):
    msg=detail.get("message")
    userTo = detail.get("userTo")
    detail.update ({
        "handle_type":"message",
        "message":msg,
        "userTo":userTo,
        "userNameTo": User.objects.get(id=userTo).username
    })
    save_message(detail)
    return detail


def get_json_to_send(argument): 
    switcher = { 
        "message": send_message, 
        "online_users": get_online_user, 
        "user_disconnect":remove_online_user,
    } 
    # get() method of dictionary data type returns  
    # value of passed argument if it is present  
    # in dictionary otherwise second argument will 
    # be assigned as default value of passed argument 
    return switcher.get(argument, "nothing") 