import json
from django.shortcuts import render
from . import controller
from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseRedirect
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.views import login

from django.contrib.auth import logout

from IPython import embed

def index(request):
    return render(request, "index.html")


@csrf_exempt
def register(request):
    if request.method == 'GET':
        return render(request, "app/index.html")
    elif request.method == 'POST':
        try:
            response = controller.register(request)
            # create JSON response object
            return HttpResponse(status=200,
                                content_type='application/json',
                                content=json.dumps(response))
        except Exception as e:
            return HttpResponseBadRequest(json.dumps(str(e)))


def get_all_docs(request):
    try:
        response = controller.get_all_docs(request)
        
        r = HttpResponse(status=200,
                            content_type='application/json',
                            content=json.dumps(response))
        r['Access-Control-Allow-Origin'] = '*'
        return r
    except Exception as e:
        return HttpResponseBadRequest(json.dumps(str(e)))



@csrf_exempt
# @login_required
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

    # get user_id
    user_id = request.session['_auth_user_id']

    #get response from controller
    try:
        response = controller.add_docs(request, user_id)
        # create JSON response object
        return HttpResponse(status=200,
                            content_type='application/json',
                            content=json.dumps(response))
    except Exception as e:
        return HttpResponseBadRequest(json.dumps(str(e)))
