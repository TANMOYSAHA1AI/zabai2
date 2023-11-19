from django.db import models

class Post(models.Model):
    content = models.TextField()
    parent_post = models.ForeignKey('self', null=True, blank=True, related_name='replies', on_delete=models.CASCADE)
    submission_time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.id}. {self.content}'
