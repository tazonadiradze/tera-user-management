import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {MatIconAnchor} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-footer',
  imports: [
    MatToolbar,
    MatIcon,
    MatIconAnchor
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class FooterComponent {

}
