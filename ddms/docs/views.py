import json
from django.shortcuts import render
from . import controller
from django.http import HttpResponse, HttpResponseBadRequest
from django.views.decorators.csrf import csrf_exempt


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
            return HttpResponse(status=response['status'],
                                content_type='application/json',
                                content=json.dumps(response))
        except Exception as e:
            response = {}
            response['error'] = str(e)
            return HttpResponseBadRequest(json.dumps(response))


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


def edit_doc(request, doc_id):
    try:
        response = controller.edit_doc(request, doc_id, request.method)
        # create JSON response object
        return HttpResponse(status=200,
                            content_type='application/json',
                            content=json.dumps(response))
    except Exception as e:
        return HttpResponseBadRequest(json.dumps(str(e)))


def add_docs(request):
    if request.method != 'POST':
        return HttpResponseBadRequest(json.dumps("Please send POST request"))

    #get response from controller
    try:
        response = controller.add_docs(request)
        # create JSON response object
        return HttpResponse(status=200,
                            content_type='application/json',
                            content=json.dumps(response))
    except Exception as e:
        return HttpResponseBadRequest(json.dumps(str(e)))
