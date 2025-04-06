import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PoBreadcrumb } from '@po-ui/ng-components';
import { PoPageDynamicEditActions, PoPageDynamicEditField, PoPageDynamicEditLiterals, PoPageDynamicEditModule } from '@po-ui/ng-templates';

@Component({
  selector: 'app-edit-people',
  standalone: true,
  imports: [
    CommonModule,
    PoPageDynamicEditModule,
  ],
  templateUrl: './edit-people.component.html',
  styleUrls: ['./edit-people.component.css']
})
export class EditPeopleComponent implements OnInit {

  private router = inject(Router);
  private route = inject(ActivatedRoute);

  readonly apiService = 'https://po-sample-api.onrender.com/v1/people';

  id: string | null = null;
  isNew = true;
  title = 'Nova Pessoa';

  breadcrumb: PoBreadcrumb = {
    items: [
      { label: 'Home', link: '/' },
      { label: 'Pessoas', link: '/people' },
      { label: 'Nova Pessoa' }
    ]
  };

  actions: PoPageDynamicEditActions = {
    save: '/people',
    saveNew: '/people/new',
    cancel: '/people'
  };

  readonly fields: Array<PoPageDynamicEditField> = [
    {
      property: 'status',
      label: 'Situação',
      options: [
        { label: 'Ativo', value: 'active' },
        { label: 'Inativo', value: 'inactive' }
      ],
      required: true
    },
    { property: 'name', label: 'Nome', required: true },
    { property: 'birthdate', label: 'Nascimento', type: 'date' },
    { property: 'genre', label: 'Gênero', options: ['Masculino', 'Feminino'] },
    { property: 'address', label: 'Endereço' },
    { property: 'city', label: 'Cidade' },
    { property: 'state', label: 'Estado' },
    { property: 'country', label: 'País' },
    { property: 'email', label: 'Email', required: true }
  ];

  customLiterals: PoPageDynamicEditLiterals = {
    cancelConfirmMessage: 'Deseja cancelar a edição?',
    detailActionNew: 'Novo',
    pageActionCancel: 'Cancelar',
    pageActionSave: 'Salvar',
    pageActionSaveNew: 'Salvar e Novo',
    registerNotFound: 'Registro não encontrado',
    saveNotificationError: 'Erro ao salvar o registro',
    saveNotificationSuccessSave: 'Registro salvo com sucesso',
    saveNotificationSuccessUpdate: 'Registro atualizado com sucesso',
    saveNotificationWarning: 'Atenção!',
  };

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.isNew = !this.id;
    this.title = this.isNew ? 'Nova Pessoa' : 'Editar Pessoa';

    this.breadcrumb = {
      items: [
        { label: 'Home', link: '/' },
        { label: 'Pessoas', link: '/people' },
        { label: this.title }
      ]
    };
  }

  onSave(person: any) {
    console.log('onSave', person);
    this.router.navigate(['/people']);
  }

  onSaveNew(person: any) {
    console.log('onSaveNew', person);
    this.router.navigate(['/people/new']);
  }
}
