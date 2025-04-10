import {ChangeDetectionStrategy, Component, computed, inject, Signal} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {NgClass, NgIf, NgOptimizedImage} from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import {AuthService} from '../../core/services/auth.service';
import {LayoutService} from '../../core/services/layout.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatTooltip} from '@angular/material/tooltip';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [RouterModule, NgIf, MatButtonModule, MatListModule, MatIconModule, NgOptimizedImage, MatTooltip, NgClass],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavComponent {
  private authService:AuthService = inject(AuthService);
  private layoutService :LayoutService = inject(LayoutService);
  private snackBar: MatSnackBar = inject(MatSnackBar);
  private router:Router = inject(Router);

  readonly currentRole:Signal<string|null> = computed(():string|null => this.authService.currentRole());
  readonly isAdmin:Signal<boolean> = computed(():boolean => this.authService.currentRole()==='admin');
  readonly loggedInUser = computed(() => this.authService.loggedInUser?.());

  logout(): void {
    this.closeDrawer();
    this.authService.logout();
    this.snackBar.open('Logged out successfully 👋', 'Close', { duration: 3000 });
  }
  navigate(path: string): void {
    this.router.navigateByUrl(path);
  }

  closeDrawer(): void {
    this.layoutService.closeDrawer();
  }
}
