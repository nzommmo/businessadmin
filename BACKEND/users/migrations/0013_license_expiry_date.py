# Generated by Django 5.1.4 on 2025-01-02 07:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0012_license'),
    ]

    operations = [
        migrations.AddField(
            model_name='license',
            name='expiry_date',
            field=models.DateField(default='2025-01-01'),
            preserve_default=False,
        ),
    ]   
