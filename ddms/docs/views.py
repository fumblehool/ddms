import json
from django.shortcuts import render
from . import controller
from django.http import HttpResponse, HttpResponseBadRequest
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt

def index(request):
    return render(request, "app/index.html")


def register(request):
    return HttpResponse(controller.register(request))


def login(request):
    return HttpResponse(controller.login(request))


def logout():
    return HttpResponse("logout route")


@login_required
def get_all_docs(request):
    user_id = request.user.id
    response = controller.get_all_docs(user_id)
    
    return HttpResponse(status=200,
                        content_type='application/json',
                        content=json.dumps(response))

@login_required
def edit_doc(request, doc_id):
    try:
        response = controller.edit_doc(doc_id, request.method)
        # create JSON response object
        return HttpResponse(status=200,
                            content_type='application/json',
                            content=json.dumps(response))
    except Exception as e:
        return HttpResponseBadRequest(json.dumps(str(e)))


@csrf_exempt
# @login_required
def add_docs(request):

    if request.method != 'POST':
        return HttpResponseBadRequest(json.dumps("Please send POST request"))

    # note = request.POST.get('note')
    # get user_id
    user_id = request.user.id

    #get response from controller
    try:
        response = controller.add_docs(request, 1)
        # create JSON response object
        return HttpResponse(status=200,
                            content_type='application/json',
                            content=json.dumps(response))
    except Exception as e:
        return HttpResponseBadRequest(json.dumps(str(e)))
