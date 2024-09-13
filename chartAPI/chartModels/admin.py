from django.contrib import admin
from .models import DataSet,PieChart,Candlestick,BarChart,LineChart
#Display on admin page
class DatasetAdmin(admin.ModelAdmin):
    list_display = ['name']
class PieChartAdmin(admin.ModelAdmin):
    list_display = ('label', 'data')
class CandlestickAdmin(admin.ModelAdmin):
    list_display = ('name', 'x','open','high','close','low')
class BarChartAdmin(admin.ModelAdmin):
    list_display = ('label', 'data')
class LineChartAdmin(admin.ModelAdmin):
    list_display = ('label', 'data')

admin.site.register(DataSet, DatasetAdmin)
admin.site.register(PieChart, PieChartAdmin)
admin.site.register(Candlestick, CandlestickAdmin)
admin.site.register(BarChart, BarChartAdmin)
admin.site.register(LineChart, LineChartAdmin)