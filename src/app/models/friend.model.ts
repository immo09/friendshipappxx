export interface Friend {
  id: number;
  name: string;
  age: number;
  interests: string[];
  location: string;
}

export interface Message {
  id: number;
  senderId: number;
  receiverId: number;
  content: string;
  timestamp: Date;
}

export interface User {
  id: number;
  username: string;
  password: string;
  name: string;
  age: number;
  interests: string[];
  location: {
    latitude: number;
    longitude: number;
  };
  bio: string;
  profilePicture: string;
}

export interface Meetup {
  id: number;
  creatorId: number;
  title: string;
  description: string;
  location: string;
  dateTime: Date;
  participants: number[];
}

export interface Hangout {
  id: number;
  hostId: number;
  title: string;
  description: string;
  location: string;
  dateTime: Date;
  maxParticipants: number;
  participants: number[];
}

export interface Event {
  id: number;
  creatorId: number;
  title: string;
  description: string;
  location: string;
  dateTime: Date;
  maxParticipants: number;
  participants: number[];
}