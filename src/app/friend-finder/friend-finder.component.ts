import { Component, OnInit } from '@angular/core';
import { FriendService } from '../services/friend.service';
import { User } from '../models/friend.model';

@Component({
  selector: 'ns-friend-finder',
  templateUrl: './friend-finder.component.html',
})
export class FriendFinderComponent implements OnInit {
  currentUser: User | null = null;
  potentialFriends: User[] = [];

  constructor(private friendService: FriendService) {}

  ngOnInit(): void {
    this.friendService.getCurrentUser().subscribe(user => {
      if (user) {
        this.currentUser = user;
        this.potentialFriends = this.friendService.findMatchingUsers(user);
      }
    });
  }

  getCommonInterests(friend: User): string {
    if (!this.currentUser) return '';
    const commonInterests = this.currentUser.interests.filter(interest => 
      friend.interests.includes(interest)
    );
    return commonInterests.join(', ');
  }

  onAddFriend(friend: User): void {
    // Implement the logic to add a friend
    console.log(`Adding friend: ${friend.name}`);
    // You might want to call a method in FriendService to add the friend
    // and then remove them from the potentialFriends list
    this.potentialFriends = this.potentialFriends.filter(f => f.id !== friend.id);
  }
}