import { Injectable } from '@angular/core';
import { getCurrentLocation, enableLocationRequest, isEnabled } from '@nativescript/geolocation';
import { Accuracy } from '@nativescript/core';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {
  constructor() {}

  async getCurrentLocation(): Promise<{ latitude: number; longitude: number }> {
    try {
      const isLocationEnabled = await isEnabled();
      if (!isLocationEnabled) {
        await enableLocationRequest();
      }

      const location = await getCurrentLocation({
        desiredAccuracy: Accuracy.high,
        maximumAge: 5000,
        timeout: 20000
      });

      return {
        latitude: location.latitude,
        longitude: location.longitude
      };
    } catch (error) {
      console.error('Error getting location', error);
      throw error;
    }
  }
}