import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PoBreadcrumb } from '@po-ui/ng-components';

import { PoPageDynamicDetailField, PoPageDynamicDetailModule } from '@po-ui/ng-templates';

@Component({
  selector: 'app-detail-people',
  imports: [
    CommonModule,
    PoPageDynamicDetailModule,
  ],
  templateUrl: './detail-people.component.html',
  styleUrls: ['./detail-people.component.css']
})
export class DetailPeopleComponent implements OnInit {

  readonly apiService = 'https://po-sample-api.onrender.com/v1/people';

  readonly breadcrumb: PoBreadcrumb = {
    items: [
      { label: 'Home', link: '/' },
      { label: 'Pessoas', link: '/people' },
      { label: 'Detalhes' }
    ]
  };

  readonly fields: Array<PoPageDynamicDetailField> = [
    { property: 'status', label: 'Situação' },
    { property: 'name', label: 'Nome' },
    { property: 'birthdate', label: 'Nascimento', type: 'date' },
    { property: 'genre', label: 'Gênero' },
    { property: 'address', label: 'Endereço' },
    { property: 'city', label: 'Cidade' },
    { property: 'state', label: 'Estado' },
    { property: 'country', label: 'País' },
    { property: 'email', label: 'Email' }
  ];
  constructor() { }

  ngOnInit() { }

}
