from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.views.static import serve
from django.contrib.auth import views as auth_views


urlpatterns = [
    # path('login', auth_views.LoginView.as_view(), name='login'),
    # path('logout', auth_views.LogoutView.as_view(), name='logout'),

    path('azeezat/', admin.site.urls),
    path('user/', include('user.urls')),

    path('', include('home.urls')),
    path('', include('django.contrib.auth.urls')),
    path('upload/', include('upload.urls')),
    path('special/', include('specialplaces.urls')),
    path('treerequest/', include('treerequest.urls')),




    # path('trees/', include('trees.urls')),
]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
