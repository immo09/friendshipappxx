import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Friend, Message, User, Meetup, Hangout, Event } from '../models/friend.model';
import * as firebase from '@nativescript/firebase-firestore';

@Injectable({
  providedIn: 'root',
})
export class FriendService {
  private db: firebase.Firestore;

  constructor() {
    this.db = firebase.firestore();
  }

  // Friends
  async getFriends(userId: string): Promise<Friend[]> {
    const friendsRef = this.db.collection('users').doc(userId).collection('friends');
    const snapshot = await friendsRef.get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Friend));
  }

  async addFriend(userId: string, friend: Friend): Promise<void> {
    await this.db.collection('users').doc(userId).collection('friends').add(friend);
  }

  async updateFriend(userId: string, friendId: string, updates: Partial<Friend>): Promise<void> {
    await this.db.collection('users').doc(userId).collection('friends').doc(friendId).update(updates);
  }

  // Messages
  async getMessages(userId: string, friendId: string): Promise<Message[]> {
    const messagesRef = this.db.collection('messages')
      .where('participants', 'array-contains', userId)
      .orderBy('timestamp', 'desc');
    const snapshot = await messagesRef.get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Message));
  }

  async sendMessage(message: Message): Promise<void> {
    await this.db.collection('messages').add(message);
  }

  // Meetups
  async getMeetups(): Promise<Meetup[]> {
    const meetupsRef = this.db.collection('meetups');
    const snapshot = await meetupsRef.get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Meetup));
  }

  async createMeetup(meetup: Omit<Meetup, 'id'>): Promise<void> {
    await this.db.collection('meetups').add(meetup);
  }

  // Hangouts
  async getHangouts(): Promise<Hangout[]> {
    const hangoutsRef = this.db.collection('hangouts');
    const snapshot = await hangoutsRef.get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Hangout));
  }

  async createHangout(hangout: Omit<Hangout, 'id'>): Promise<void> {
    await this.db.collection('hangouts').add(hangout);
  }

  // Events
  async getEvents(): Promise<Event[]> {
    const eventsRef = this.db.collection('events');
    const snapshot = await eventsRef.get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Event));
  }

  async createEvent(event: Omit<Event, 'id'>): Promise<void> {
    await this.db.collection('events').add(event);
  }

  // User Profile
  async getUserProfile(userId: string): Promise<User | null> {
    const userDoc = await this.db.collection('users').doc(userId).get();
    return userDoc.exists ? { id: userDoc.id, ...userDoc.data() } as User : null;
  }

  async updateUserProfile(userId: string, updates: Partial<User>): Promise<void> {
    await this.db.collection('users').doc(userId).update(updates);
  }

  // Nearby Users
  async getNearbyUsers(location: { latitude: number, longitude: number }, radius: number): Promise<User[]> {
    // This is a simplified version. For production, you'd use geoqueries or a more sophisticated approach
    const usersRef = this.db.collection('users');
    const snapshot = await usersRef.get();
    const nearbyUsers = snapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() } as User))
      .filter(user => this.isWithinRadius(location, user.location, radius));
    return nearbyUsers;
  }

  private isWithinRadius(center: { latitude: number, longitude: number }, point: { latitude: number, longitude: number }, radius: number): boolean {
    // Simplified distance calculation. For production, use a more accurate method
    const dx = center.latitude - point.latitude;
    const dy = center.longitude - point.longitude;
    return Math.sqrt(dx * dx + dy * dy) <= radius;
  }
}