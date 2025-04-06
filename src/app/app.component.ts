import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';

import {
  PoBreadcrumb,
  PoBreadcrumbItem,
  PoBreadcrumbModule,
  PoMenuItem,
  PoMenuModule,
  PoNotificationModule,
  PoToolbarModule
} from '@po-ui/ng-components';
import { filter } from 'rxjs';
import { BreadcrumbService } from './shared/breadcrumb.service';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterModule,
    PoMenuModule,
    PoToolbarModule,
    PoBreadcrumbModule,
    PoNotificationModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  breadcrumb: PoBreadcrumb = { items: [] };
  breadcrumbItem!: PoBreadcrumbItem;
  breadcrumbItems!: Array<PoBreadcrumbItem>;
  favoriteService?: string;
  paramsService?: object;

  readonly menus: Array<PoMenuItem> = [
    { label: 'Home', link: '/', icon: 'po-icon-home' },
    { label: 'Pessoas', link: '/people', icon: 'po-icon-users' },
  ];

  private router = inject(Router);
  private breadcrumbService = inject(BreadcrumbService);

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const currentState = this.router.routerState.snapshot;
        this.breadcrumb = this.breadcrumbService.generateBreadcrumb(currentState);
      });
  }
}
