import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  HostListener,
  inject,
  OnInit,
  signal,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MatDrawer, MatSidenav, MatSidenavContainer, MatSidenavContent,} from '@angular/material/sidenav';
import {HeaderComponent} from '../layout/header/header.component';
import {FooterComponent} from '../layout/footer/footer.component';
import {SidenavComponent} from '../layout/sidenav/sidenav.component';
import {LayoutService} from '../core/services/layout.service';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet, FooterComponent, MatSidenavContent, MatSidenav, MatSidenavContainer, SidenavComponent,],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShellComponent implements OnInit, AfterViewInit {
  @ViewChild('drawer', {static: true}) drawer!: MatDrawer;
  readonly isMobile: WritableSignal<boolean> = signal(window.innerWidth < 768);
  readonly sidenavOpened: WritableSignal<boolean> = signal(false);
  private layout: LayoutService = inject(LayoutService);

  ngOnInit(): void {
    this.handleResize();
  }

  ngAfterViewInit(): void {
    this.layout.setDrawer(this.drawer);
  }

  @HostListener('window:resize') handleResize(): void {
    const wasMobile: boolean = this.isMobile();
    const nowMobile: boolean = window.innerWidth < 768;
    this.isMobile.set(nowMobile);

    if (nowMobile && !wasMobile && this.drawer.opened) {
      this.drawer.close();
    }


  }
}
