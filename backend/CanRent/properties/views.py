from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Property
from .serializer import PropertySerializer


@api_view(["GET"])
def properties(request):
    # Start will all properties
    postings = Property.objects.all()

    # Gets all values of the request
    max_price = request.query_params.get("max_price")
    min_rating = request.query_params.get("min_rating")
    location = request.query_params.get("location")

    # Only applies if data is provided
    if max_price:
        postings = postings.filter(price__lte=max_price)
    if min_rating:
        postings = postings.filter(review__gte=min_rating)
    if location:
        postings = postings.filter(location__icontains=location)

    serializer = PropertySerializer(postings, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def property_detail(request, pk):
    try:
        property = Property.objects.get(pk=pk)
        serializer = PropertySerializer(property)
        return Response(serializer.data)
    except Property.DoesNotExist:
        return Response(
            {"error": "Property not found"}, status=status.HTTP_404_NOT_FOUND
        )
