import { Component } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'ns-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email = '';
  password = '';
  confirmPassword = '';
  isLoading = false;

  constructor(
    private authService: AuthService,
    private routerExtensions: RouterExtensions
  ) {}

  async onRegister() {
    if (this.isLoading) return;
    if (this.password !== this.confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    this.isLoading = true;
    try {
      await this.authService.register(this.email, this.password);
      this.routerExtensions.navigate(['/friends'], { clearHistory: true });
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed. Please try again.');
    } finally {
      this.isLoading = false;
    }
  }

  onLogin() {
    this.routerExtensions.back();
  }
}