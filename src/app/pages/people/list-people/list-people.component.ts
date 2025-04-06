import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {
  PoBreadcrumb,
  PoButtonModule,
  PoFieldModule,
  PoInfoModule,
  PoModalComponent,
  PoModalModule,
  PoPageModule,
  PoTableAction,
  PoTableModule,
  PoTagModule
} from '@po-ui/ng-components';
import { PoPageDynamicSearchFilters, PoPageDynamicSearchModule, PoPageDynamicTableModule } from '@po-ui/ng-templates';
import { PeopleService } from './people.service';

export interface PoPageDynamicTableActions {
  new?: string | (() => void);
  edit?: string | ((row: any) => void);
  duplicate?: string | ((row: any) => void);
  details?: string | ((row: any) => void);
  remove?: string | ((row: any) => void);
}

@Component({
  selector: 'app-list-people',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    PoPageModule,
    PoTableModule,
    PoButtonModule,
    PoTagModule,
    PoFieldModule,
    PoInfoModule,
    PoPageDynamicSearchModule,
    PoPageDynamicTableModule,
    PoModalModule
  ],
  templateUrl: './list-people.component.html'
})
export class ListPeopleComponent {

  @ViewChild(PoModalComponent, { static: true }) poModal!: PoModalComponent;

  people: any[] = [];
  allPeople: any[] = [];
  isLoading = false;
  selectedItem: any;
  visibleItems: any[] = [];
  allItems: any[] = [];
  hasMoreItems = true;
  itemsPerPage = 10;
  currentPage = 1;

  readonly breadcrumb: PoBreadcrumb = {
    items: [
      { label: 'Home', action: () => this.router.navigate(['/']) },
      { label: 'Lista de pessoas' }
    ]
  };

  readonly tableActions: PoTableAction[] = [
    { label: 'Editar', icon: 'po-icon-edit', action: this.edit.bind(this) },
    { label: 'Detalhes', icon: 'po-icon-info', action: this.details.bind(this) },
    { label: 'Remover', icon: 'po-icon-delete', action: this.remove.bind(this) }
  ];
  hideRemoveAllDisclaimer = false;
  readonly columns = [
    {
      property: '',
      icons: [
        {
          action: this.remove.bind(this),
          icon: 'po-icon-delete',
          tooltip: 'Remover',
          value: 'id'
        }
      ]
    },
    { property: 'id', label: 'ID' },
    { property: 'name', label: 'Nome' },
    { property: 'email', label: 'Email' },
  ];


  readonly filters: PoPageDynamicSearchFilters[] = [
    { property: 'name', label: 'Nome' },
    { property: 'email', label: 'Email' }
  ];

  private router = inject(Router);
  private peopleService = inject(PeopleService);

  ngOnInit() {
    this.loadPeople();
  }

  loadPeople(page: number = 1, pageSize: number = this.itemsPerPage) {
    this.isLoading = true;

    this.peopleService.getAllPaginated(page, pageSize).subscribe({
      next: (data) => {
        this.people = [...this.people, ...data.items];
        this.hasMoreItems = data.items.length === pageSize;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao buscar pessoas', err);
        this.isLoading = false;
      }
    });
  }


  edit(item: any) {
    this.router.navigate(['/people', item.id, 'edit']);
  }

  details(item: any) {
    this.router.navigate(['/people', item.id]);
  }

  remove(item: any) {
    this.selectedItem = item;
    this.poModal.open();
  }

  onQuickSearch(term: string) {
    const filtro = term?.toLowerCase() || '';

    this.people = this.allPeople.filter((person: any) =>
      person.name?.toLowerCase().includes(filtro) ||
      person.email?.toLowerCase().includes(filtro)
    );
  }

  newPerson() {
    this.router.navigate(['/people/new']);
  }

  loadMoreData() {
    this.currentPage++;
    this.loadPeople(this.currentPage);
  }
}
