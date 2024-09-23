import { Component } from '@angular/core';
import { OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslateService } from "@ngx-translate/core";
import { LanguageSwitcherComponent } from "./public/pages/language-switcher/language-switcher.component";
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from "@angular/material/divider";
import { MatListModule } from "@angular/material/list";
import { BreakpointObserver, BreakpointState } from "@angular/cdk/layout";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, MatToolbarModule, MatButtonModule, MatIconModule,
    MatSidenavModule, MatDividerModule, MatListModule, LanguageSwitcherComponent,
    RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit  {
  @ViewChild(MatSidenav, {static: true}) sidenav!: MatSidenav;
  options = [
    { icon: 'home', path: '/home', title: 'Home'},
    { icon: 'person', path: '/learning/students', title: 'Students'},
    { icon: 'info', path:'/about', title: 'About'},
    { icon: 'create_new_folder', path: '/about', title: 'Create New Folder'},
    { icon: 'edit', path: '/about', title: 'Edit'}
  ];
  title = 'daos-learning-center';
  observer: BreakpointObserver;

  constructor(private translate: TranslateService, private breakpointObserver: BreakpointObserver) {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
    this.observer = breakpointObserver;
  }

  ngOnInit(): void {
    this.observer.observe(['(max-width: 1280px)']) // Observa el ancho de la pantalla
      .subscribe((response: BreakpointState) => {  // Se suscribe a los cambios en el ancho de la pantalla
        if (response.matches) { // Si el ancho de la pantalla es menor a 1280px
          this.sidenav.mode = 'over'; // Se despliega sobre el contenido
          this.sidenav.close(); // Se cierra
        } else {
          this.sidenav.mode = 'side'; // Se despliega al lado del contenido
          this.sidenav.open();  // Se abre
        }
      });
  }
}
