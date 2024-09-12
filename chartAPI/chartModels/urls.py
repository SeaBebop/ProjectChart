from django.urls import path
from rest_framework.routers import SimpleRouter

from .views import DatasetViewset, BarChartViewSet,LineChartViewSet, CandlestickViewSet,PieChartViewSet

router = SimpleRouter()
router.register("dataset", DatasetViewset, basename="data")
router.register("bar-chart-data", BarChartViewSet, basename="bar")
router.register("line-chart-data",LineChartViewSet,basename='line')
router.register("candlestick-data",CandlestickViewSet,basename='candlestick')
router.register("pie-chart-data",PieChartViewSet,basename='pie')
urlpatterns = router.urls
