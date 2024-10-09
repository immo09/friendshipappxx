import { Component } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'ns-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  isLoading = false;

  constructor(
    private authService: AuthService,
    private routerExtensions: RouterExtensions
  ) {}

  async onLogin() {
    if (this.isLoading) return;

    this.isLoading = true;
    try {
      await this.authService.login(this.email, this.password);
      this.routerExtensions.navigate(['/friends'], { clearHistory: true });
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please check your credentials and try again.');
    } finally {
      this.isLoading = false;
    }
  }

  onRegister() {
    this.routerExtensions.navigate(['/register']);
  }
}