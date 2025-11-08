from django.shortcuts import render
from Notes.models import Notes, Category

# Create your views here.
def index(request):
    if request.method == "POST":
        user = request.user
        title = request.POST.get("title")
        content = request.POST.get("content")
        category_id = request.POST.get("category")

        cat = Category.objects.filter(id=category_id).first()

        Notes.objects.create(user=user, title=title, content=content, category=cat)
        notes = Notes.objects.all()
        category = Category.objects.all()
        return render(request, "index.html", context={
            "notes": notes,
            "category": category
        })
   
    notes = Notes.objects.all()
    category = Category.objects.all()
    return render(request, "index.html", context={
        "notes": notes,
        "category": category
        })