# Generated by Django 5.1.1 on 2024-09-11 16:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chartModels', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='candlestick',
            name='high',
            field=models.IntegerField(default=None),
        ),
    ]
