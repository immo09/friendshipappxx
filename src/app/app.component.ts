import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1>{{ title }}</h1>
    <nav>
      <a routerLink="/friends">Friends</a> |
      <a routerLink="/meetups">Meetups</a> |
      <a routerLink="/events">Events</a> |
      <a routerLink="/profile">Profile</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
  title = 'FriendFinder';
}