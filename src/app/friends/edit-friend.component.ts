import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterExtensions } from '@nativescript/angular';
import { FriendService } from '../services/friend.service';
import { Friend } from '../models/friend.model';

@Component({
  selector: 'ns-edit-friend',
  templateUrl: './edit-friend.component.html',
})
export class EditFriendComponent implements OnInit {
  friend: Friend = { id: 0, name: '', age: 0, interests: [], location: '' };
  interestsString = '';

  constructor(
    private route: ActivatedRoute,
    private friendService: FriendService,
    private routerExtensions: RouterExtensions
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.params.id;
    const foundFriend = this.friendService.getFriend(id);
    if (foundFriend) {
      this.friend = { ...foundFriend };
      this.interestsString = this.friend.interests.join(', ');
    }
  }

  onSaveChanges(): void {
    this.friend.interests = this.interestsString.split(',').map(i => i.trim());
    this.friendService.updateFriend(this.friend);
    this.routerExtensions.back();
  }
}