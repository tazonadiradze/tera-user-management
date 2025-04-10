import {Component, inject, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {AuthService} from './core/services/auth.service';

@Component({
  selector: 'app-root', imports: [RouterOutlet], templateUrl: './app.component.html', styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title: string = 'tera-task';
  private authService: AuthService = inject(AuthService);

  ngOnInit(): void {
    this.authService.restoreUserSession();
  }
}
