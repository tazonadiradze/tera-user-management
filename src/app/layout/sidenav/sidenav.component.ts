import {ChangeDetectionStrategy, Component, computed, inject, Signal} from '@angular/core';
import { RouterModule } from '@angular/router';
import {NgIf, NgOptimizedImage} from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import {AuthService} from '../../core/services/auth.service';
import {LayoutService} from '../../core/services/layout.service';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [RouterModule, NgIf, MatButtonModule, MatListModule, MatIconModule, NgOptimizedImage],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavComponent {
  private authService:AuthService = inject(AuthService);
  private layoutService = inject(LayoutService);

  readonly currentRole:Signal<string|null> = computed(():string|null => this.authService.currentRole());
  readonly loggedInUser = computed(() => this.authService.loggedInUser?.());

  logout(): void {
    this.closeDrawer()
    this.authService.logout();
  }

  closeDrawer(): void {
    this.layoutService.closeDrawer();
  }
}
