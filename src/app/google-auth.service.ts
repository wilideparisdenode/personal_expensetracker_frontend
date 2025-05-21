// google-auth.service.ts
import { Injectable } from '@angular/core';
import { Browser } from '@capacitor/browser';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {
  private readonly callbackUrl = 'http://localhost/callback';

  async login() {
    // Open Google OAuth in system browser
    await Browser.open({
      url: 'http://localhost:5000/api/auth/google',
      windowName: '_blank'
    });
    
    // Listen for callback
    Browser.addListener('browserFinished', (event) => {
      if (event.url.includes(this.callbackUrl)) {
        const token = new URL(event.url).hash.split('=')[1];
        this.handleToken(token);
      }
    });
  }

  private async handleToken(token: string) {
    await Preferences.set({ key: 'google_token', value: token });
    // Redirect or update UI
  }
}