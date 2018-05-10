from django.urls import path
from . import views
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('', views.index, name='index'),
    path('docs/', views.index, name="index"),
    path('register/', views.register, name='index'),
    path('login/', auth_views.login, {'template_name': 'app/index.html'}, name='login'),
    path('logout/', views.logout, {'next_page': '/'}, name='logout'),
    path('api/list/', views.get_all_docs, name='index'),
    path('api/docs/', views.add_docs, name='index'),
    path('api/docs/<int:doc_id>/', views.edit_doc, name='edit'),
]
