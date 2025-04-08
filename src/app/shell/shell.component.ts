import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import {HeaderComponent} from '../layout/header/header.component';
import {RouterOutlet} from '@angular/router';
import {FooterComponent} from '../layout/footer/footer.component';
import {MatDrawer, MatSidenav, MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import {SidenavComponent} from '../layout/sidenav/sidenav.component';
import {LayoutService} from '../core/services/layout.service';

@Component({
  selector: 'app-shell',
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
export class ShellComponent implements OnInit, AfterViewInit{
  private layout: LayoutService =inject(LayoutService);
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;

  ngAfterViewInit(): void {
    this.layout.setDrawer(this.drawer);
  }

  ngOnInit(): void {
  }

}
