import { Component } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { FriendService } from '../services/friend.service';
import { Meetup } from '../models/friend.model';

@Component({
  selector: 'ns-create-meetup',
  templateUrl: './create-meetup.component.html',
})
export class CreateMeetupComponent {
  newMeetup: Omit<Meetup, 'id' | 'participants'> = {
    creatorId: 0,
    title: '',
    description: '',
    location: '',
    dateTime: new Date(),
  };
  meetupDate: Date = new Date();
  meetupTime: Date = new Date();

  constructor(
    private friendService: FriendService,
    private routerExtensions: RouterExtensions
  ) {}

  onCreateMeetup(): void {
    this.friendService.getCurrentUser().subscribe(user => {
      if (user) {
        this.newMeetup.creatorId = user.id;
        this.newMeetup.dateTime = new Date(
          this.meetupDate.getFullYear(),
          this.meetupDate.getMonth(),
          this.meetupDate.getDate(),
          this.meetupTime.getHours(),
          this.meetupTime.getMinutes()
        );
        this.friendService.createMeetup(this.newMeetup);
        this.routerExtensions.back();
      }
    });
  }
}