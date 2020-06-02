import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-project-menu',
  templateUrl: './project-menu.component.html',
  styleUrls: ['./project-menu.component.scss']
})
export class ProjectMenuComponent implements OnInit {
  @Input() opened: boolean
  @Input() headerTitle: string;
  showFiller = false;

  constructor() { }

  ngOnInit(): void {
  }

}
