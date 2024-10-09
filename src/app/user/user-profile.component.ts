import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { FriendService } from '../services/friend.service';
import { User } from '../models/friend.model';

@Component({
  selector: 'ns-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  currentUser: User | null = null;

  constructor(
    private friendService: FriendService,
    private routerExtensions: RouterExtensions
  ) {}

  ngOnInit(): void {
    this.friendService.getCurrentUser().subscribe(user => {
      this.currentUser = user;
    });
  }

  onEditProfile(): void {
    // Implement edit profile functionality
    console.log('Edit profile');
  }
}