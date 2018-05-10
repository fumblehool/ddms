import datetime
from .models import Media, Category
from IPython import embed
from django.contrib.auth.models import User
# from django.contrib.auth import authenticate, login as auth_login

def register(user):
    # Register user
    embed()
    return ("Register route Success")


def login(user):
    from IPython import embed;embed()
    return ("login route success")


def logout():
    return ("logout route")


def get_all_docs(user_id):
    media_list = Media.objects.filter(created_by=user_id, is_deleted=False)
    
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


def edit_doc(media_id, method):
    if method == 'GET':
        media_details = Media.objects.filter(media_id=media_id, is_deleted=False)
        return str(media_details)
    elif method == 'DELETE':
        try:
        # get entry from DB where id equals media_id
            entry = Media.objects.get(media_id=media_id)
            # set isDeleted flag true for the entry.
            entry.is_deleted = True
            # update the updatedAt field.
            entry.last_edited_at = datetime.datetime.now()
            # save the changes
            entry.save()
            # return success
            return "Successful"
        except Media.DoesNotExist:
            # if record does not exist
            return "Entry not found"
    elif method == 'PUT':
        pass
    return (str(method))


def add_docs(request, user_id):
    # empty response object
    response = {}

    # get the current timestamp
    timestamp = datetime.datetime.now()
    # insert new entry
    record = Media.objects.create(created_by=user_id, is_deleted=False,
                                       created_at=timestamp, last_edited_at=timestamp,
                                       media_type=1, media_title='media_title', #request.mediaTitle,
                                       file=request.FILES['filename'])
    record.save()

    return "added successfully"
