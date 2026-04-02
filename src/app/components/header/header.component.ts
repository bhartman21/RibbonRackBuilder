import { Component, computed, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  private authService = inject(AuthService);

  readonly user = toSignal(this.authService.user$);
  readonly isAdmin = computed(() => {
    const u = this.user();
    const email = u?.email;
    console.log('isAdmin check — user:', u, 'email:', email);
    return email?.toLowerCase() === 'billy.hartman@gmail.com';
  });
  readonly showLogin = signal(false);
  readonly authEmail = signal('');
  readonly isAuthLoading = signal(false);
  readonly authError = signal('');

  async ngOnInit(): Promise<void> {
    // Check if we're landing from an auth link
    try {
      await this.authService.completeSignIn();
    } catch (error: any) {
      const msg = error?.message || 'Failed to complete sign-in. Please try again.';
      this.authError.set(msg);
    }
  }

  async login(): Promise<void> {
    const email = this.authEmail().trim();
    if (!email) {
      this.authError.set('Please enter your email address.');
      return;
    }

    this.authError.set('');
    this.isAuthLoading.set(true);
    try {
      await this.authService.sendSignInLink(email);
      alert(`A sign-in link has been sent to ${email}. Check your inbox (and spam folder).`);
    } catch (error: any) {
      const msg = error?.code === 'auth/invalid-email'
        ? 'Please enter a valid email address.'
        : error?.message || 'Failed to send sign-in link. Please try again.';
      this.authError.set(msg);
    } finally {
      this.isAuthLoading.set(false);
    }
  }

  async logout(): Promise<void> {
    try {
      await this.authService.logout();
    } catch (error) {
      alert('Failed to log out.');
    }
  }
}
