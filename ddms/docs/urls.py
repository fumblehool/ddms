from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('register/', views.register, name='index'),
    path('login/', views.login, name='index'),
    path('logout/', views.logout, name='index'),
    path('api/list/', views.get_all_docs, name='index'),
    path('api/docs/', views.docs, name='index'),
    path('api/docs/<int:doc_id>/', views.edit_doc, name='edit'),
]
