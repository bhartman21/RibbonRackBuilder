import { Injectable, inject } from '@angular/core';
import { Auth, authState, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink, signOut, User } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);
  
  // Observable for the user's auth state
  readonly user$: Observable<User | null> = authState(this.auth);

  async sendSignInLink(email: string): Promise<void> {
    const actionCodeSettings = {
      // URL you want to redirect back to. The domain (www.example.com) for this
      // URL must be whitelisted in the Firebase Console.
      url: window.location.href, // This will return to the same page
      handleCodeInApp: true
    };

    try {
      await sendSignInLinkToEmail(this.auth, email, actionCodeSettings);
      // Save the email locally so you don't need to ask the user for it again
      // when they open the link on the same device.
      window.localStorage.setItem('emailForSignIn', email);
      console.log('Sign-in link sent to email');
    } catch (error) {
      console.error('Error sending sign-in link:', error);
      throw error;
    }
  }

  async isSignInLink(url: string): Promise<boolean> {
    return isSignInWithEmailLink(this.auth, url);
  }

  async completeSignIn(): Promise<void> {
    const url = window.location.href;
    if (await this.isSignInLink(url)) {
      let email = window.localStorage.getItem('emailForSignIn');
      if (!email) {
        // User opened the link on a different device. To prevent session fixation
        // attacks, ask the user to provide the associated email again.
        email = window.prompt('Please provide your email for confirmation');
      }
      
      if (email) {
        try {
          await signInWithEmailLink(this.auth, email, url);
          window.localStorage.removeItem('emailForSignIn');
          // Clear the URL to remove the sensitive code
          window.history.replaceState({}, '', window.location.pathname);
          console.log('Successfully signed in with email link');
        } catch (error) {
          console.error('Error completing sign in:', error);
          throw error;
        }
      }
    }
  }

  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
      console.log('Successfully signed out');
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  }
}
