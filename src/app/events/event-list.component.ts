import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { FriendService } from '../services/friend.service';
import { Event, User } from '../models/friend.model';

@Component({
  selector: 'ns-event-list',
  templateUrl: './event-list.component.html',
})
export class EventListComponent implements OnInit {
  events: Event[] = [];
  currentUser: User | null = null;

  constructor(
    private friendService: FriendService,
    private routerExtensions: RouterExtensions
  ) {}

  ngOnInit(): void {
    this.events = this.friendService.getEvents();
    this.friendService.getCurrentUser().subscribe(user => {
      this.currentUser = user;
    });
  }

  onCreateEvent(): void {
    this.routerExtensions.navigate(['/create-event']);
  }

  isParticipating(event: Event): boolean {
    return this.currentUser ? event.participants.includes(this.currentUser.id) : false;
  }

  onRsvp(event: Event): void {
    if (!this.currentUser) return;

    if (this.isParticipating(event)) {
      this.friendService.cancelRsvp(event.id, this.currentUser.id);
    } else {
      this.friendService.rsvpEvent(event.id, this.currentUser.id);
    }
    // Refresh the events list
    this.events = this.friendService.getEvents();
  }
}