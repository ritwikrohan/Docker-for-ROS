from uuid import uuid4

from django.contrib.auth import get_user_model
from django.shortcuts import render

User = get_user_model()


def index(request):
    # ----------------
    # Creating users #
    # ----------------
    first_name = request.POST.get('first_name', '')
    if first_name:
        User.objects.create(first_name=first_name, username=str(uuid4()))

    # ----------------
    # Deleting users #
    # ----------------
    user_id = request.POST.get('user_id', None)
    if user_id:
        User.objects.filter(id=user_id).delete()

    # ------------------
    # Retrieving users #
    # ------------------
    users = User.objects.order_by('-id')
    context = {'users': users}

    return render(request, 'app/index.html', context)
