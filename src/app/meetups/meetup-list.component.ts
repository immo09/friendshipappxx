import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { FriendService } from '../services/friend.service';
import { Meetup, User } from '../models/friend.model';

@Component({
  selector: 'ns-meetup-list',
  templateUrl: './meetup-list.component.html',
})
export class MeetupListComponent implements OnInit {
  meetups: Meetup[] = [];
  currentUser: User | null = null;

  constructor(
    private friendService: FriendService,
    private routerExtensions: RouterExtensions
  ) {}

  ngOnInit(): void {
    this.meetups = this.friendService.getMeetups();
    this.friendService.getCurrentUser().subscribe(user => {
      this.currentUser = user;
    });
  }

  onCreateMeetup(): void {
    this.routerExtensions.navigate(['/create-meetup']);
  }

  isParticipating(meetup: Meetup): boolean {
    return this.currentUser ? meetup.participants.includes(this.currentUser.id) : false;
  }

  onJoinLeave(meetup: Meetup): void {
    if (!this.currentUser) return;

    if (this.isParticipating(meetup)) {
      this.friendService.leaveMeetup(meetup.id, this.currentUser.id);
    } else {
      this.friendService.joinMeetup(meetup.id, this.currentUser.id);
    }
    // Refresh the meetups list
    this.meetups = this.friendService.getMeetups();
  }
}