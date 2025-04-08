import {ChangeDetectionStrategy, Component, computed, inject, Signal} from '@angular/core';
import { RouterModule } from '@angular/router';
import {NgIf, TitleCasePipe} from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import {AuthService} from '../../core/services/auth.service';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [RouterModule, NgIf, MatButtonModule, MatListModule, MatIconModule, TitleCasePipe],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavComponent {
  private authService:AuthService = inject(AuthService);

  // readonly role:Signal<string|null> = computed(():string|null => this.authService.role());
  // readonly loggedInUser = computed(() => this.authService.loggedInUser?.());

  logout(): void {
    this.authService.logout();
  }
}
