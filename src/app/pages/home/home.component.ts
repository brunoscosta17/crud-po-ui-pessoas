import { Component } from '@angular/core';

import { PoPageModule } from '@po-ui/ng-components';


@Component({
  selector: 'app-home',
  imports: [PoPageModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  title = 'Home';

}
