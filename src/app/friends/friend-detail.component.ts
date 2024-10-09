import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterExtensions } from '@nativescript/angular';
import { FriendService } from '../services/friend.service';
import { Friend } from '../models/friend.model';

@Component({
  selector: 'ns-friend-detail',
  templateUrl: './friend-detail.component.html',
})
export class FriendDetailComponent implements OnInit {
  friend: Friend | undefined;

  constructor(
    private route: ActivatedRoute,
    private friendService: FriendService,
    private routerExtensions: RouterExtensions
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.params.id;
    this.friend = this.friendService.getFriend(id);
  }

  onEditFriend(): void {
    this.routerExtensions.navigate(['/edit-friend', this.friend?.id]);
  }

  onChat(): void {
    this.routerExtensions.navigate(['/chat', this.friend?.id]);
  }
}