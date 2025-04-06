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
  PoNotificationService,
  PoPageModule,
  PoTableAction,
  PoTableColumn,
  PoTableLiterals,
  PoTableModule,
  PoTagModule
} from '@po-ui/ng-components';
import { PoPageDynamicSearchFilters, PoPageDynamicSearchLiterals, PoPageDynamicSearchModule, PoPageDynamicTableModule } from '@po-ui/ng-templates';
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
  customLiterals: PoPageDynamicSearchLiterals = {
    disclaimerGroupTitle: 'Filtros aplicados:',
    filterTitle: 'Filtro avançado',
    filterCancelLabel: 'Fechar',
    filterConfirmLabel: 'Aplicar',
    quickSearchLabel: 'Valor pesquisado:',
    searchPlaceholder: 'Pesquise aqui'
  };

  tableCustomLiterals: PoTableLiterals = {
    loadMoreData: 'Carregar mais',
    noVisibleColumn: 'Nenhuma coluna visível',
    noData: 'Nenhum registro encontrado',
  };

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

  confirmRemoveAction = {
    label: 'Confirmar',
    action: () => this.confirmRemove()
  };

  cancelRemoveAction = {
    label: 'Cancelar',
    action: () => this.poModal.close()
  };

  readonly columns: PoTableColumn[] = [
    {
      property: 'status',
      label: 'Situação',
      type: 'label',
      labels: [
        { value: 'active', color: 'color-10', label: 'Ativo' },
        { value: 'inactive', color: 'color-07', label: 'Inativo' }
      ]
    },
    { property: 'id', label: 'ID' },
    { property: 'name', label: 'Nome' },
    { property: 'nickname', label: 'Apelido' },
    { property: 'email', label: 'Email' },
    { property: 'birthdate', label: 'Data de Nascimento', type: 'date', format: 'dd/MM/yyyy' },
    { property: 'genreDescription', label: 'Gênero' },
    { property: 'nationality', label: 'Nacionalidade' },
    { property: 'birthPlace', label: 'Naturalidade' },
    { property: 'graduation', label: 'Escolaridade' },
    { property: 'father', label: 'Nome do Pai' },
    { property: 'mother', label: 'Nome da Mãe' },
    { property: 'street', label: 'Rua' },
    { property: 'cityName', label: 'Cidade' },
    { property: 'state', label: 'Estado' },
    { property: 'uf', label: 'UF' },
    { property: 'country', label: 'País' }
  ];

  readonly filters: PoPageDynamicSearchFilters[] = [
    { property: 'name', label: 'Nome' },
    { property: 'email', label: 'Email' }
  ];

  private router = inject(Router);
  private peopleService = inject(PeopleService);
  private notificationService = inject(PoNotificationService);

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

  confirmRemove() {
    if (!this.selectedItem) return;

    this.isLoading = true;

    this.peopleService.delete(this.selectedItem.id).subscribe({
      next: () => {
        this.people = this.people.filter(p => p.id !== this.selectedItem.id);
        this.notificationService.success('Pessoa removida com sucesso.');
        this.selectedItem = null;
        this.poModal.close();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao remover pessoa:', err);
        this.notificationService.error('Não foi possível remover a pessoa. Tente novamente.');
        this.poModal.close();
        this.isLoading = false;
      }
    });
  }

  onQuickSearch(term: string) {
    const filtro = term?.toLowerCase() || '';

    this.peopleService.getAll().subscribe({
      next: (data) => {
        this.people = data.items.filter((person: any) =>
          person.name?.toLowerCase().includes(filtro) ||
          person.email?.toLowerCase().includes(filtro)
        );
        this.hasMoreItems = false;
      },
      error: (err) => {
        console.error('Erro ao buscar pessoas para filtro', err);
      }
    });
  }

  resetSearch() {
    this.people = [];
    this.currentPage = 1;
    this.loadPeople(this.currentPage);
  }

  newPerson() {
    this.router.navigate(['/people/new']);
  }

  loadMoreData() {
    this.currentPage++;
    this.loadPeople(this.currentPage);
  }
}
