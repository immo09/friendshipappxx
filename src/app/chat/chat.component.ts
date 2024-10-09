import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TextField } from '@nativescript/core';
import { FriendService } from '../services/friend.service';
import { Friend, Message, User } from '../models/friend.model';

@Component({
  selector: 'ns-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  @ViewChild('messageTextField', { static: false }) messageTextField: ElementRef<TextField>;

  friend: Friend | undefined;
  messages: Message[] = [];
  newMessage = '';
  currentUserId: number;

  constructor(
    private route: ActivatedRoute,
    private friendService: FriendService
  ) {}

  ngOnInit(): void {
    const friendId = +this.route.snapshot.params.id;
    this.friend = this.friendService.getFriend(friendId);

    this.friendService.getCurrentUser().subscribe((user: User | null) => {
      if (user) {
        this.currentUserId = user.id;
        this.messages = this.friendService.getMessages(this.currentUserId);
      }
    });
  }

  onSendMessage(): void {
    if (this.newMessage.trim() && this.friend) {
      this.friendService.sendMessage(this.currentUserId, this.friend.id, this.newMessage.trim());
      this.newMessage = '';
      this.messageTextField.nativeElement.focus();
      this.messages = this.friendService.getMessages(this.currentUserId);
    }
  }
}