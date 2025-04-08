import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  HostListener,
  OnInit,
  ViewChild,
  computed,
  inject,
  signal,
} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MatDrawer, MatSidenav, MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import {HeaderComponent} from '../layout/header/header.component';
import {FooterComponent} from '../layout/footer/footer.component';
import {SidenavComponent} from '../layout/sidenav/sidenav.component';
import {LayoutService} from '../core/services/layout.service';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [
    HeaderComponent,
    RouterOutlet,
    FooterComponent,
    MatSidenavContent,
    MatSidenav,
    MatSidenavContainer,
    SidenavComponent
  ],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShellComponent implements OnInit, AfterViewInit {
  private layout = inject(LayoutService);

  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;

  readonly isMobile = signal(window.innerWidth < 768);
  readonly sidenavMode = computed(() => this.isMobile() ? 'over' : 'side');
  readonly sidenavOpened = computed(() => !this.isMobile());

  ngOnInit(): void {
    this.updateScreenSize(); // initialize on first load
  }

  ngAfterViewInit(): void {
    this.layout.setDrawer(this.drawer);
  }

  @HostListener('window:resize')
  updateScreenSize() {
    this.isMobile.set(window.innerWidth < 768);
  }
}
