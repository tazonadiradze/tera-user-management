import {ChangeDetectionStrategy, Component, effect, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../../../core/services/user.service';
import {User} from '../../../../core/models/user.model';
import {
  MatCard,
  MatCardActions,
  MatCardAvatar,
  MatCardContent,
  MatCardHeader,
} from '@angular/material/card';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatIcon} from '@angular/material/icon';
import {TitleCasePipe} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {MatDivider} from '@angular/material/divider';

@Component({
  selector: 'app-user-details',
  imports: [
    MatCardActions,
    MatProgressSpinner,
    MatCardAvatar,
    MatIcon,
    TitleCasePipe,
    MatCardContent,
    MatButton,
    MatCardHeader,
    MatCard,
    MatDivider,
  ],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class UserDetailsComponent implements OnInit {
  private route: ActivatedRoute = inject(ActivatedRoute);
  private userService: UserService = inject(UserService);
  userDetails: WritableSignal<User | null> = signal(null);


  ngOnInit(): void {
    const routeId: string | null = this.route.snapshot.paramMap.get('id');
    if (!routeId) return;
    this.userService.getUserDetailsById(routeId).subscribe((userDetails :User)=>{
      this.userDetails.set(userDetails) ;
    })

  }
  goBack() {
    history.back();
  }
}
