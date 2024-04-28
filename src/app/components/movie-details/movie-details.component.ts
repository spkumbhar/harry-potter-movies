import { Component, inject, Input } from '@angular/core';
import { MovieDetails } from '../../models/movie';
import { Title } from '@angular/platform-browser';
import { MovieService } from '../../services/movie.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AsyncPipe, DatePipe } from '@angular/common';
import { MillionPipe } from '../../shared/Pipes/million.pipe';
import { DurationPipe } from '../../shared/Pipes/duration.pipe';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [RouterLink,AsyncPipe,MillionPipe,DurationPipe,DatePipe],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css'
})
export class MovieDetailsComponent {
  id:string|null=""
  movie!: MovieDetails;

  constructor(private movieService:MovieService, private titile : Title,private activateRoute: ActivatedRoute){

  }
  ngOnInit(){
    console.log("id:",this.id)
    this.activateRoute.paramMap.subscribe((params) => {
      this.id = params.get('id');
      console.log("iddd:",this.id)
    })
    this.movieService.getMovieById(this.id).subscribe(response=>{
      this.movie = response
    })
  }

}
