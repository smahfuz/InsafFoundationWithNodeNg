import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common'; // 👈 এটা add করো

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, CommonModule], // 👈 এখানে add
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  title = 'Insaf Foundation';
  isOpen = false;
}