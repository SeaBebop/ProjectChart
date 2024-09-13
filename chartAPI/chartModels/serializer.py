from rest_framework import serializers
from django.urls import exceptions as url_exceptions
from rest_framework import exceptions, serializers
from rest_framework.exceptions import ValidationError
from .models import DataSet,Candlestick,BarChart,LineChart,PieChart
from django.utils.html import conditional_escape

# Basic implementation of serializers 
class DataSetSerializer(serializers.ModelSerializer):
    class Meta:
        model = DataSet
        fields = "__all__"
   
# Added the data serializer since Candlestick has its data from the foreign key
class CandlestickSerializer(serializers.ModelSerializer):
    time = serializers.CharField(source='x')
    class Meta:
        model = Candlestick
        fields = ['time','open','close','low','high']

class LineChartSerializer(serializers.ModelSerializer):
    class Meta:
        model = LineChart
        fields = "__all__"
class BarChartSerializer(serializers.ModelSerializer):
    class Meta:
        model = BarChart
        fields = "__all__"
class PieChartSerializer(serializers.ModelSerializer):
    class Meta:
        model = PieChart
        fields = "__all__"