import { Injectable } from '@angular/core';
import { RouterStateSnapshot } from '@angular/router';
import { PoBreadcrumb, PoBreadcrumbItem } from '@po-ui/ng-components';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  generateBreadcrumb(state: RouterStateSnapshot): PoBreadcrumb {
    const path = state.url;

    const items: PoBreadcrumbItem[] = [{ label: 'Home', link: '/' }];

    if (path.startsWith('/people')) {
      items.push({ label: 'Pessoas', link: '/people' });

      if (path.includes('/edit')) {
        items.push({ label: 'Editar' });
      } else if (path.includes('/detalhar')) {
        items.push({ label: 'Detalhes' });
      } else if (path.includes('/nova')) {
        items.push({ label: 'Nova Pessoa' });
      }
    }

    return { items };
  }
}
