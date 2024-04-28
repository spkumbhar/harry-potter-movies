import { Component, Input, input } from '@angular/core';
import { Movie } from '../../models/movie';
import { MillionPipe } from '../../shared/Pipes/million.pipe';
import { RouterLink } from '@angular/router';
import { DurationPipe } from '../../shared/Pipes/duration.pipe';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [
   MillionPipe,
   RouterLink,
    DurationPipe
  ],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css'
})
export class MovieListComponent {

  @Input() movie !:Movie

}
