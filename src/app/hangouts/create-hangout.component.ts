import { Component } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { FriendService } from '../services/friend.service';
import { Hangout } from '../models/friend.model';

@Component({
  selector: 'ns-create-hangout',
  templateUrl: './create-hangout.component.html',
})
export class CreateHangoutComponent {
  newHangout: Omit<Hangout, 'id' | 'participants'> = {
    hostId: 0,
    title: '',
    description: '',
    location: '',
    dateTime: new Date(),
    maxParticipants: 5
  };
  hangoutDate: Date = new Date();
  hangoutTime: Date = new Date();

  constructor(
    private friendService: FriendService,
    private routerExtensions: RouterExtensions
  ) {}

  onCreateHangout(): void {
    this.friendService.getCurrentUser().subscribe(user => {
      if (user) {
        this.newHangout.hostId = user.id;
        this.newHangout.dateTime = new Date(
          this.hangoutDate.getFullYear(),
          this.hangoutDate.getMonth(),
          this.hangoutDate.getDate(),
          this.hangoutTime.getHours(),
          this.hangoutTime.getMinutes()
        );
        this.friendService.createHangout(this.newHangout);
        this.routerExtensions.back();
      }
    });
  }
}