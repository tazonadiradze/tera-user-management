import {Injectable, signal, WritableSignal} from '@angular/core';
import {MatDrawer} from '@angular/material/sidenav';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  private drawerRef: WritableSignal<MatDrawer | null> = signal(null);

  constructor() {
  }

  setDrawer(drawer: MatDrawer): void {
    this.drawerRef.set(drawer);
  }

  closeDrawer(): void {
    this.drawerRef()?.close();
  }

}
