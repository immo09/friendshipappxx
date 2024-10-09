import { Component } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { FriendService } from '../services/friend.service';
import { Friend } from '../models/friend.model';

@Component({
  selector: 'ns-add-friend',
  templateUrl: './add-friend.component.html',
})
export class AddFriendComponent {
  newFriend: Friend = { id: 0, name: '', age: 0, interests: [], location: '' };
  interestsString = '';

  constructor(
    private friendService: FriendService,
    private routerExtensions: RouterExtensions
  ) {}

  onAddFriend(): void {
    this.newFriend.interests = this.interestsString.split(',').map(i => i.trim());
    this.friendService.addFriend(this.newFriend);
    this.routerExtensions.back();
  }
}