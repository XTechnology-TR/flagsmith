# -*- coding: utf-8 -*-
# Generated by Django 1.11.13 on 2018-05-21 15:06
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0012_delete_ffadminuser'),
    ]

    operations = [
        migrations.AddField(
            model_name='featurestate',
            name='value',
            field=models.CharField(max_length=2000, null=True),
        ),
    ]