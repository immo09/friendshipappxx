import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';
import * as firebase from '@nativescript/firebase-auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor() {
    this.currentUserSubject = new BehaviorSubject<User | null>(null);
    this.currentUser = this.currentUserSubject.asObservable();

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in
        this.currentUserSubject.next({
          id: user.uid,
          email: user.email,
          // Add other user properties as needed
        });
      } else {
        // User is signed out
        this.currentUserSubject.next(null);
      }
    });
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  async register(email: string, password: string): Promise<void> {
    try {
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
      // You can add additional user data to Firestore here
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  async login(email: string, password: string): Promise<void> {
    try {
      const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
      // The onAuthStateChanged listener will update the currentUserSubject
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await firebase.auth().signOut();
      // The onAuthStateChanged listener will update the currentUserSubject
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }
}