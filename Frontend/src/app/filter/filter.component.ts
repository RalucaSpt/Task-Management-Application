import { Component, EventEmitter, Output} from '@angular/core';
import { OnInit } from '@angular/core';
import { Status } from '../Status';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent implements OnInit {

  statuses = Object.values(Status);

  ngOnInit(): void {
  }
  
  selectStatus(status: Status): void {
    console.log(status); 
    this.statusSelected.emit(status);
    }
  @Output() statusSelected: EventEmitter<Status> = new EventEmitter();
} 
  
