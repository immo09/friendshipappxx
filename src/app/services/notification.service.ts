import { Injectable } from '@angular/core';
import * as firebase from '@nativescript/firebase-messaging';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor() {
    this.init();
  }

  private async init() {
    try {
      const hasPermission = await firebase.messaging().hasPermission();
      if (!hasPermission) {
        await firebase.messaging().requestPermission();
      }
      console.log('Notification permissions granted');
    } catch (error) {
      console.error('Error initializing notifications', error);
    }
  }

  async subscribeToTopic(topic: string) {
    try {
      await firebase.messaging().subscribeToTopic(topic);
      console.log(`Subscribed to topic: ${topic}`);
    } catch (error) {
      console.error(`Error subscribing to topic: ${topic}`, error);
    }
  }

  async unsubscribeFromTopic(topic: string) {
    try {
      await firebase.messaging().unsubscribeFromTopic(topic);
      console.log(`Unsubscribed from topic: ${topic}`);
    } catch (error) {
      console.error(`Error unsubscribing from topic: ${topic}`, error);
    }
  }

  onMessageReceived(callback: (message: any) => void) {
    firebase.messaging().onMessage((message) => {
      console.log('New notification received', message);
      callback(message);
    });
  }
}