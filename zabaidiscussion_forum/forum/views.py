from django.shortcuts import render, redirect
from .models import Post

def forum(request):
    posts = Post.objects.filter(parent_post__isnull=True).order_by('submission_time')
    return render(request, 'forum/forum.html', {'posts': posts})

def create_post(request):
    if request.method == 'POST':
        content = request.POST.get('content')
        parent_post_id = request.POST.get('parent_post_id')

        if parent_post_id:
            parent_post = Post.objects.get(pk=parent_post_id)
            Post.objects.create(content=content, parent_post=parent_post)
        else:
            Post.objects.create(content=content)

        return redirect('forum')

    return render(request, 'forum/create_post.html')


