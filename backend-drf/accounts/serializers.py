from django.contrib.auth.models import User
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    password= serializers.CharField(write_only=True, min_length=8, style={'input_type': 'password'})
    class Meta:
        model=User
        fields=['username', 'email', 'password']

# this is the member function in the modelserializer class
    def create(self, validated_data):
        # User.objects.create : saves the password in the plain text but 
        # User.objects.create_user : automatically hash the password
        user=User.objects.create_user(
            validated_data['username'],
            validated_data['email'],
            validated_data['password']
            # this manual validation can be directly done by passing user=User.objects.create_user(**validated_data)
        )

        return user
