import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FriendListComponent } from './friends/friend-list.component';
import { FriendDetailComponent } from './friends/friend-detail.component';
import { AddFriendComponent } from './friends/add-friend.component';
import { EditFriendComponent } from './friends/edit-friend.component';
import { LoginComponent } from './auth/login.component';
import { RegisterComponent } from './auth/register.component';
import { ChatComponent } from './chat/chat.component';
import { MeetupListComponent } from './meetups/meetup-list.component';
import { CreateMeetupComponent } from './meetups/create-meetup.component';
import { FriendFinderComponent } from './friend-finder/friend-finder.component';
import { HangoutListComponent } from './hangouts/hangout-list.component';
import { CreateHangoutComponent } from './hangouts/create-hangout.component';
import { EventListComponent } from './events/event-list.component';
import { CreateEventComponent } from './events/create-event.component';
import { UserProfileComponent } from './user/user-profile.component';
import { EditProfileComponent } from './user/edit-profile.component';
import { NearbyUsersComponent } from './nearby-users/nearby-users.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'friends', component: FriendListComponent },
  { path: 'friend/:id', component: FriendDetailComponent },
  { path: 'add-friend', component: AddFriendComponent },
  { path: 'edit-friend/:id', component: EditFriendComponent },
  { path: 'chat/:id', component: ChatComponent },
  { path: 'meetups', component: MeetupListComponent },
  { path: 'create-meetup', component: CreateMeetupComponent },
  { path: 'friend-finder', component: FriendFinderComponent },
  { path: 'hangouts', component: HangoutListComponent },
  { path: 'create-hangout', component: CreateHangoutComponent },
  { path: 'events', component: EventListComponent },
  { path: 'create-event', component: CreateEventComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'edit-profile', component: EditProfileComponent },
  { path: 'nearby-users', component: NearbyUsersComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }