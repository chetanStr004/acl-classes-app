import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  isMenuOpen = signal(false);

  constructor(
    private router: Router,
    public authService: AuthService
  ) { }

  logout() {
    this.authService.logout();
    this.isMenuOpen.set(false);
  }

  getDashboardLink() {
    return this.authService.isAdmin() ? '/admin' : '/student';
  }

  toggleMenu() {
    this.isMenuOpen.set(!this.isMenuOpen());
  }

  scrollToSection(sectionId: string) {
    this.isMenuOpen.set(false); // Close menu on mobile

    if (this.router.url !== '/') {
      this.router.navigate(['/']).then(() => {
        setTimeout(() => this.scroll(sectionId), 100);
      });
    } else {
      this.scroll(sectionId);
    }
  }

  private scroll(id: string) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
