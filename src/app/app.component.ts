import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ShellComponent} from './shell/shell.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ShellComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'tera-task';
}
