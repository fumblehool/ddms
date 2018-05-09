import datetime
from .models import User, Media, Category
from IPython import embed
def register(user):
    # Register user
    return ("Register route Success")


def login(user):
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
        record['media_type'] = media.media_type #Category.objects.filter(category_id=media.media_type).category_text
        record['created_at'] = int(note.created_at.strftime('%s')) * 1000
        record['last_edited_at'] = int(note.created_at.strftime('%s')) * 1000
        record['created_by'] = media.created_by

        # record['userDetails'] = UserDetail.objects.values('user_id')\
                #                  .filter(user_id=doc.user_id)[0]
        response.append(record)
    # return the records
    return response


def edit_doc(media_id, method):
    # if(method == 'GET'):
    #     media_details = Media.objects.filter(media_id=media_id, is_deleted=False)
    #     return str(media_details)
    return ("edit doc")


def add_docs(request, user_id):
    from IPython import embed;embed()

    # empty response object
    response = {}

    # get the current timestamp
    timestamp = datetime.datetime.now()
    # insert new entry
    record = Media.objects.create(created_by=user_id, is_deleted=False,
                                       created_at=timestamp, last_edited_at=timestamp,
                                       media_type=1, media_title=request.mediaTitle,
                                       file=request.Files)
    record.save()

    return "added successfully"
