import { Component, OnInit, Input } from '@angular/core';
import { Sprint } from 'src/app/model/sprint';

@Component({
  selector: 'app-sprint-item',
  templateUrl: './sprint-item.component.html',
  styleUrls: ['./sprint-item.component.scss']
})
export class SprintItemComponent implements OnInit {
  @Input() sprint: Sprint;

  constructor() { }

  ngOnInit(): void {
  }

  openDetailDialog() {

  }
}
