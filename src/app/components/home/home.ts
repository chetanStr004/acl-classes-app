import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Features } from "../features/features";

@Component({
  selector: 'app-home',
  imports: [Features, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

}
