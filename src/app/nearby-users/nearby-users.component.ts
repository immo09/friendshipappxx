import { Component, OnInit } from '@angular/core';
import { FriendService } from '../services/friend.service';
import { GeolocationService } from '../services/geolocation.service';
import { User } from '../models/friend.model';

@Component({
  selector: 'ns-nearby-users',
  templateUrl: './nearby-users.component.html',
  styleUrls: ['./nearby-users.component.css']
})
export class NearbyUsersComponent implements OnInit {
  nearbyUsers: User[] = [];
  isLoading = false;

  constructor(
    private friendService: FriendService,
    private geolocationService: GeolocationService
  ) {}

  async ngOnInit() {
    await this.loadNearbyUsers();
  }

  async loadNearbyUsers() {
    this.isLoading = true;
    try {
      const location = await this.geolocationService.getCurrentLocation();
      this.nearbyUsers = await this.friendService.getNearbyUsers(location, 10); // 10 km radius
    } catch (error) {
      console.error('Error loading nearby users:', error);
      alert('Failed to load nearby users. Please try again.');
    } finally {
      this.isLoading = false;
    }
  }

  onRefresh() {
    this.loadNearbyUsers();
  }
}