import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { BackgroundComponent } from './components/background/background.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    Header,
    Footer,
    BackgroundComponent
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']   // ✅ FIXED
})
export class App {
  protected readonly title = signal('acl-classes-app');
}
