import {ChangeDetectionStrategy, Component, computed, EventEmitter, inject, Output, Signal,} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {MatToolbar} from '@angular/material/toolbar';
import {MatButton, MatIconButton} from '@angular/material/button';
import {AuthService} from '../../core/services/auth.service';
import {LayoutService} from '../../core/services/layout.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-header',
  imports: [MatIcon, MatToolbar, MatIconButton, MatButton],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class HeaderComponent {
  @Output() toggleDrawer: EventEmitter<void> = new EventEmitter<void>();
  authService: AuthService = inject(AuthService);
  readonly isLoggedIn: Signal<boolean> = computed((): boolean => this.authService.isLoggedIn());
  private layoutService: LayoutService = inject(LayoutService);
  private snackBar: MatSnackBar = inject(MatSnackBar);

  onMenuClick(): void {
    this.toggleDrawer.emit();
  }

  logout() {
    this.layoutService.closeDrawer();
    this.authService.logout();
    this.snackBar.open('Logged out successfully 👋', 'Close', { duration: 3000 });

  }
}
