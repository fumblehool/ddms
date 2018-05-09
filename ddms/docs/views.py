from django.shortcuts import render
from . import controller
from django.http import HttpResponse

def index(request):
    return render(request, "/app/index.html")


def register(request):
    return HttpResponse(controller.register(request))


def login(request):
    return HttpResponse(controller.login(request))


def logout():
    return HttpResponse("logout route")


def get_all_docs(request):
    return HttpResponse("get all docs")


def edit_doc(request, doc_id):
    return HttpResponse("edit doc")


def docs(request):
    return HttpResponse("docs")
