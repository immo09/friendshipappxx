import { Component } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { FriendService } from '../services/friend.service';
import { Event } from '../models/friend.model';

@Component({
  selector: 'ns-create-event',
  templateUrl: './create-event.component.html',
})
export class CreateEventComponent {
  newEvent: Omit<Event, 'id' | 'participants'> = {
    creatorId: 0,
    title: '',
    description: '',
    location: '',
    dateTime: new Date(),
    maxParticipants: 50
  };
  eventDate: Date = new Date();
  eventTime: Date = new Date();

  constructor(
    private friendService: FriendService,
    private routerExtensions: RouterExtensions
  ) {}

  onCreateEvent(): void {
    this.friendService.getCurrentUser().subscribe(user => {
      if (user) {
        this.newEvent.creatorId = user.id;
        this.newEvent.dateTime = new Date(
          this.eventDate.getFullYear(),
          this.eventDate.getMonth(),
          this.eventDate.getDate(),
          this.eventTime.getHours(),
          this.eventTime.getMinutes()
        );
        this.friendService.createEvent(this.newEvent);
        this.routerExtensions.back();
      }
    });
  }
}