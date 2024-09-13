from django.conf import settings

from django.db import models
from django.core.validators import MinValueValidator

""" Highly likely that the candlestick is two models with its syntaxing in json
{

  "data": [
    {"x": "2023-01-01", "open": 30, "high": 40, "low": 25, "close": 35},
    ...
  ]
}

"""

#Model that organizes the Candlestick data
class DataSet(models.Model):
    name = models.CharField(max_length=100)
    def __str__(self):
        return self.name
    
#Creation of different charts
class Candlestick(models.Model):
    name = models.ForeignKey(DataSet, on_delete=models.CASCADE)
    x = models.DateField()
    open = models.IntegerField()
    close = models.IntegerField()
    low = models.IntegerField()
    high = models.IntegerField(default=None)

    def __str__(self):
        return str(self.x)

class LineChart(models.Model):
    label = models.CharField(max_length=100)
    data = models.IntegerField()
    def __str__(self):
        return self.label
    
class BarChart(models.Model):
    label = models.CharField(max_length=100)
    data = models.IntegerField()
    def __str__(self):
        return self.label
class PieChart(models.Model):
    label = models.CharField(max_length=100)
    data = models.IntegerField()
    def __str__(self):
        return self.label
