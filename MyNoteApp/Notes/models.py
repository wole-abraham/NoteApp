from django.db import models

# Create your models here.
class Users(models.Models):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)

    def __str__(self):
        return self.username


class Notes(models.Models):

    user = models.ForeignKey(Users, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    images = models.ImageField(upload_to='', blank=True, null=True)

    def __str__(self):
        return self.title

class Tasks(models.Models):
    User = models.ForeignKey(Users, on_delete=models.CASCADE)
    task_name = models.CharField(max_length=200)
    is_completed = models.BooleanField(default=False)
    due_date = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return self.task_name
    


