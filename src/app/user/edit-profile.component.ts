import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { FriendService } from '../services/friend.service';
import { AuthService } from '../services/auth.service';
import { User } from '../models/friend.model';

@Component({
  selector: 'ns-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  user: User | null = null;
  isLoading = false;

  constructor(
    private friendService: FriendService,
    private authService: AuthService,
    private routerExtensions: RouterExtensions
  ) {}

  async ngOnInit() {
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      this.user = await this.friendService.getUserProfile(currentUser.id);
    }
  }

  async onSave() {
    if (!this.user) return;

    this.isLoading = true;
    try {
      await this.friendService.updateUserProfile(this.user.id, this.user);
      this.routerExtensions.back();
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    } finally {
      this.isLoading = false;
    }
  }
}