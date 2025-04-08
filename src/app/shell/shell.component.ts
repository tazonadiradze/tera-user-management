import {ChangeDetectionStrategy, Component} from '@angular/core';
import {HeaderComponent} from '../layout/header/header.component';
import {RouterOutlet} from '@angular/router';
import {FooterComponent} from '../layout/footer/footer.component';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import {SidenavComponent} from '../layout/sidenav/sidenav.component';

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
export class ShellComponent {

}
