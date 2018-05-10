import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages: string[] = [];
  // add message to cache
  add(message: string) {
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }
}
