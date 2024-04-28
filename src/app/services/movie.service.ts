import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie, MovieDetails } from '../models/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private movieApiUrl: string = '/movies';
  private readonly http = inject(HttpClient);

  getAllMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.movieApiUrl);
  }

  getMovieById(movieId: string|null): Observable<MovieDetails> {


    return this.http.get<MovieDetails>(`${this.movieApiUrl}/${movieId}`);
  }
}
