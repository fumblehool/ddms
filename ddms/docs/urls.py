from django.urls import path
from django.conf.urls import url
from . import views
from django.contrib.auth import views as auth_views
from django.views.generic.base import TemplateView
urlpatterns = [
    # path('', views.index, name='index'),
    # path('register/', views.register, name='index'),
    # path('login/', auth_views.login, {'template_name': 'app/index.html'}, name='login'),
    # path('logout/', views.logout, {'next_page': '/'}, name='logout'),
    path('api/login/', views.login, name='login'),
    path('api/logout/', views.logout, name='logout'),
    path('api/register/', views.register, name='register'),
    path('api/list/', views.get_all_docs, name='list'),
    path('api/docs/', views.add_docs, name='add_docs'),
    path('api/docs/<int:doc_id>/', views.edit_doc, name='edit'),
    url(r'^.*/', TemplateView.as_view(template_name="index.html"), name='base'),
]
