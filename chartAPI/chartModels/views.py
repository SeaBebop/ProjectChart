from django.shortcuts import render, get_object_or_404
from rest_framework import generics
from .serializer import DataSetSerializer, CandlestickSerializer, LineChartSerializer, BarChartSerializer
from rest_framework.permissions import IsAdminUser, AllowAny  
from rest_framework import viewsets
from django.contrib.auth import get_user_model
from .models import DataSet,Candlestick,BarChart,LineChart,PieChart
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import status

# Create your views here.
class DatasetViewset(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = DataSet.objects.all()
    serializer_class = DataSetSerializer


class CandlestickViewSet(viewsets.ModelViewSet):  
    permission_classes = [AllowAny]
    queryset = Candlestick.objects.all().order_by('x')
    serializer_class = CandlestickSerializer

class LineChartViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = LineChart.objects.all()
    serializer_class = LineChartSerializer

class BarChartViewSet(viewsets.ModelViewSet):
    serializer_class = BarChartSerializer
    queryset = BarChart.objects.all()
    permission_classes = [AllowAny]

class PieChartViewSet(viewsets.ModelViewSet):
    serializer_class = BarChartSerializer
    queryset = PieChart.objects.all()
    permission_classes = [AllowAny]
