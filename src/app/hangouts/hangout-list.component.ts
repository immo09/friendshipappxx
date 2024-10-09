import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { FriendService } from '../services/friend.service';
import { Hangout, User } from '../models/friend.model';

@Component({
  selector: 'ns-hangout-list',
  templateUrl: './hangout-list.component.html',
})
export class HangoutListComponent implements OnInit {
  hangouts: Hangout[] = [];
  currentUser: User | null = null;

  constructor(
    private friendService: FriendService,
    private routerExtensions: RouterExtensions
  ) {}

  ngOnInit(): void {
    this.hangouts = this.friendService.getHangouts();
    this.friendService.getCurrentUser().subscribe(user => {
      this.currentUser = user;
    });
  }

  onCreateHangout(): void {
    this.routerExtensions.navigate(['/create-hangout']);
  }

  isParticipating(hangout: Hangout): boolean {
    return this.currentUser ? hangout.participants.includes(this.currentUser.id) : false;
  }

  onJoinLeave(hangout: Hangout): void {
    if (!this.currentUser) return;

    if (this.isParticipating(hangout)) {
      this.friendService.leaveHangout(hangout.id, this.currentUser.id);
    } else {
      this.friendService.joinHangout(hangout.id, this.currentUser.id);
    }
    // Refresh the hangouts list
    this.hangouts = this.friendService.getHangouts();
  }
}