import { Component, Input } from '@angular/core';

interface Breadcrumb {
  label: string;
  navigate: string;
  icon?: string;
}

@Component({
  standalone: false,
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
})
export class BreadcrumbsComponent {

  @Input() breadcrumbs: Breadcrumb[] = [];

}
