import {computed, Injectable, Signal, signal, WritableSignal} from '@angular/core';
import {MatDrawer} from '@angular/material/sidenav';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  constructor() { }
  private drawerRef: WritableSignal<MatDrawer | null> = signal(null);

  setDrawer(drawer: MatDrawer): void {
    this.drawerRef.set(drawer);
  }

  toggleDrawer(): void {
    this.drawerRef()?.toggle();
  }

  closeDrawer(): void {
    this.drawerRef()?.close();
  }

  openDrawer(): void {
    this.drawerRef()?.open();
  }

}
