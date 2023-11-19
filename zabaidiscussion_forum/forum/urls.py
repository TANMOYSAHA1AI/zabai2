from django.urls import path
from .views import forum, create_post

urlpatterns = [
    path('forum/', forum, name='forum'),
    path('create_post/', create_post, name='create_post'),
]
