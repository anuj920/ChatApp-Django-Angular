from channels.routing import ProtocolTypeRouter, URLRouter
import ChatApp.routing
from .Token_Auth import TokenAuthMiddlewareStack
from channels.auth import AuthMiddlewareStack

application = ProtocolTypeRouter({
    # (http->django views is added by default)
    'websocket': AuthMiddlewareStack(
        URLRouter(
            ChatApp.routing.websocket_urlpatterns
        )
    ),
})