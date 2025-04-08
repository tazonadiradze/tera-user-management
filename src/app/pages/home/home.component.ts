import {ChangeDetectionStrategy, Component} from '@angular/core';
import {UsersListComponent} from './users-list/users-list.component';

@Component({
  selector: 'app-home',
  imports: [
    UsersListComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {

}
