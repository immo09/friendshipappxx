import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { FriendService } from '../services/friend.service';
import { Friend } from '../models/friend.model';

@Component({
  selector: 'ns-friend-list',
  templateUrl: './friend-list.component.html',
})
export class FriendListComponent implements OnInit {
  friends: Friend[] = [];
  title = 'FriendFinder';

  constructor(
    private friendService: FriendService,
    private routerExtensions: RouterExtensions
  ) {}

  ngOnInit(): void {
    this.friends = this.friendService.getFriends();
  }

  onSearch(args: any): void {
    const searchBar = args.object;
    this.friends = this.friendService.searchFriends(searchBar.text);
  }

  onAddFriend(): void {
    this.routerExtensions.navigate(['/add-friend']);
  }

  onMeetups(): void {
    this.routerExtensions.navigate(['/meetups']);
  }

  onFriendFinder(): void {
    this.routerExtensions.navigate(['/friend-finder']);
  }
}