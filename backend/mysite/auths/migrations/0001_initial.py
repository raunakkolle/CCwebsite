# Generated by Django 3.0.5 on 2020-04-06 21:28

import datetime
from django.conf import settings
import django.contrib.auth.models
import django.contrib.auth.validators
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0011_update_proxy_permissions'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('username', models.CharField(error_messages={'unique': 'A user with that username already exists.'}, help_text='Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.', max_length=150, unique=True, validators=[django.contrib.auth.validators.UnicodeUsernameValidator()], verbose_name='username')),
                ('first_name', models.CharField(blank=True, max_length=30, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('email', models.EmailField(max_length=255, unique=True, verbose_name='email')),
                ('phone', models.CharField(blank=True, max_length=255, null=True)),
                ('USN', models.CharField(blank=True, max_length=30, null=True)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='Skill',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('bio', models.TextField(blank=True, max_length=500, null=True)),
                ('location', models.CharField(blank=True, max_length=30, null=True)),
                ('company', models.CharField(blank=True, max_length=30, null=True)),
                ('interest', models.CharField(blank=True, max_length=100, null=True)),
                ('birth_date', models.DateField(blank=True, null=True)),
                ('profile_picture', models.ImageField(default='profile_pictures/default.png', upload_to='profile_pictures/')),
                ('resume', models.FileField(blank=True, null=True, upload_to='resume/')),
                ('branch', models.CharField(blank=True, max_length=50, null=True)),
                ('USN', models.CharField(blank=True, max_length=100, null=True)),
                ('sem', models.CharField(blank=True, max_length=100, null=True)),
                ('website', models.URLField(blank=True, default='')),
                ('linkedIn_ID', models.URLField(blank=True, default='')),
                ('github_ID', models.URLField(blank=True, default='')),
                ('skills', models.ManyToManyField(blank=True, to='auths.Skill')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Experience',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('description', models.TextField(blank=True, max_length=500, null=True)),
                ('domains', models.CharField(blank=True, max_length=10, null=True)),
                ('duration_from', models.DateField(default=datetime.date.today, verbose_name='Date From')),
                ('duration_to', models.DateField(blank=True, null=True, verbose_name='Date To')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='auths.UserProfile')),
            ],
        ),
        migrations.CreateModel(
            name='Education',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('institute_name', models.CharField(max_length=200)),
                ('course', models.CharField(blank=True, max_length=10, null=True)),
                ('duration_from', models.DateField(default=datetime.date.today, verbose_name='Date From')),
                ('duration_to', models.DateField(blank=True, null=True, verbose_name='Date To')),
                ('score', models.CharField(blank=True, max_length=10, null=True)),
                ('descriptions', models.TextField(blank=True, max_length=500, null=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='auths.UserProfile')),
            ],
        ),
    ]
