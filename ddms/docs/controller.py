from .models import Media, Category
from django.contrib.auth.models import User
from django.http import QueryDict
from rest_framework.authtoken.models import Token
from django.utils import timezone

def register(request):
    """
    Register new user
    """
    # username and password params from request
    username = request.POST.get('username', None)
    password = request.POST.get('username', None)
    # create new user in database
    user, created = User.objects.get_or_create(username=username)
    # if new user is created, add password 
    if created:
        user.set_password(password)
        user.save()
        # response object
        response = {}
        # Add required fields to response - status code and user_id
        response['status'] = 200
        response['user_id'] = user.pk
        
        return response


def get_all_docs(request):
    """
    Fetch docs from database
    """
    # get token from cookies
    token = request.COOKIES.get('token')
    # verify token and get user_id
    user_id = Token.objects.get(key=token).user_id
    # fetch all docs created by user_id and is_deleted false
    media_list = Media.objects.filter(created_by=user_id, is_deleted=False)
    # response object
    response = []

    for media in media_list:
        record = {}
        record['media_id'] = media.media_id
        record['media_title'] = media.media_title
        record['media_type'] = Category.objects.filter(category_id=media.media_type)[0].category_text
        record['created_at'] = int(media.created_at.strftime('%s')) * 1000
        record['last_edited_at'] = int(media.created_at.strftime('%s')) * 1000
        record['file'] = '/media/'+ media.file.name
        user_details = {}
        user = User.objects.get(pk=user_id)
        user_details['user_id'] = user_id
        user_details['username'] = user.username
        user_details['email'] = user.email
        record['created_by'] = user_details

        response.append(record)
    # return the records
    return response


def edit_doc(request, media_id, method):
    """
    Fetch doc details and Update doc details
    """
    # handle GET request, return doc details
    if method == 'GET':
        media_details = Media.objects.filter(media_id=media_id, is_deleted=False)
        return str(media_details)
    # handle Delete request, set is_deleted True in database
    elif method == 'DELETE':
        try:
            # get token from cookies
            token = request.COOKIES.get('token')
            # verify token and get user_id
            user_id = Token.objects.get(key=token).user_id

            # get entry from DB where id equals media_id
            entry = Media.objects.get(media_id=media_id)

            if entry.created_by == user_id:
                # set isDeleted flag true for the entry.
                entry.is_deleted = True
                # update the updatedAt field.
                entry.last_edited_at = timezone.now()
                # save the changes
                entry.save()
                # return success
                response = {}
                response['status'] = "successful"
                return response
        except Media.DoesNotExist:
            # if record does not exist
            return "Entry not found"
    # handle Put request, update doc details
    elif method == 'PUT':
        # get token from cookies
        token = request.COOKIES.get('token')
        # verify token and get user_id
        user_id = Token.objects.get(key=token).user_id

        # get query params
        query_params = QueryDict(request.body)
        # get entry from DB with id equals doc_id
        media = Media.objects.get(media_id=query_params['doc_id'])
        
        if media.created_by == user_id:
            # update media_title
            media.media_title = query_params['value']
            # update last_edited_at field
            timestamp = timezone.now()
            media.last_edited_at = timezone.now()
            # save the updated record
            media.save()
            # generate response
            response = {}
            response['status'] = "successful"
            response['last_edited_at'] = int(timestamp.strftime('%s')) * 1000
            return response
    return (str(method))


def add_docs(request):
    # empty response object
    response = {}

    # get the current timestamp
    timestamp = timezone.now()
    
    # get user_id
    token = request.COOKIES.get('token')
    user_id = Token.objects.get(key=token).user_id

    # get category_id
    category_id = Category.objects.filter(category_text=request.POST.get('doctype'))[0].category_id
    # insert new entry
    record = Media.objects.create(created_by=user_id, is_deleted=False,
                                       created_at=timestamp, last_edited_at=timestamp,
                                       media_type=category_id, media_title=request.FILES['file'].name,
                                       file=request.FILES['file'])
    
    # generate response object
    response = {}
    
    response['media_id'] = record.media_id
    response['media_title'] = record.media_title
    response['media_type'] = Category.objects.filter(category_id=record.media_type)[0].category_text
    response['created_at'] = int(record.created_at.strftime('%s')) * 1000
    response['last_edited_at'] = int(record.created_at.strftime('%s')) * 1000
    response['file'] = '/media/'+ record.file.name
    user_details = {}
    user = User.objects.get(pk=user_id)
    user_details['user_id'] = user_id
    user_details['username'] = user.username
    user_details['email'] = user.email
    response['created_by'] = user_details

    return response
