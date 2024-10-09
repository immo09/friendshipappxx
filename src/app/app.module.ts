import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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

@NgModule({
  declarations: [
    AppComponent,
    FriendListComponent,
    FriendDetailComponent,
    AddFriendComponent,
    EditFriendComponent,
    LoginComponent,
    RegisterComponent,
    ChatComponent,
    MeetupListComponent,
    CreateMeetupComponent,
    FriendFinderComponent,
    HangoutListComponent,
    CreateHangoutComponent,
    EventListComponent,
    CreateEventComponent,
    UserProfileComponent,
    EditProfileComponent,
    NearbyUsersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }