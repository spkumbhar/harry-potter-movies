import { Component, inject } from '@angular/core';
import { combineLatest, debounceTime, distinctUntilChanged, map, Observable, startWith, Subject, tap } from 'rxjs';
import { Movie } from '../../models/movie';
import { MovieService } from '../../services/movie.service';
import { Router, RouterLink } from '@angular/router';
import { MovieListComponent } from '../movie-list/movie-list.component';
import { FormsModule } from '@angular/forms';
import { AsyncPipe, DatePipe } from '@angular/common';
import { MillionPipe } from '../../shared/Pipes/million.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
   MovieListComponent,
   RouterLink,
   FormsModule,
   DatePipe,
   AsyncPipe,
   MillionPipe



  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  movies!: Observable<Movie[]>;
  searchByMovieTitle = new Subject<string>();
  searchByMovieReleaseYear = new Subject<string>();


  filterByTitleInput!: string;
  filterByDateInput!: string;
  stillSearching = false;


  private defaultSearchValue = '';
  private readonly moviesService = inject(MovieService);


  ngOnInit(): void {
    this.movies = this.initializeMovies();

  }

  filterByTitle(): void {
    this.searchByMovieTitle.next(this.filterByTitleInput);
  }

  filterByReleaseDate(): void {
    this.searchByMovieReleaseYear.next(this.filterByDateInput);
  }


  private initializeMovies(): Observable<Movie[]> {
    return combineLatest([
      this.searchByMovieReleaseYear.pipe(
        startWith(this.defaultSearchValue),
        debounceTime(100),
        distinctUntilChanged()
      ),
      this.searchByMovieTitle.pipe(
        startWith(this.defaultSearchValue),
        debounceTime(100),
        distinctUntilChanged()
      ),
      this.moviesService.getAllMovies()
    ]).pipe(
      tap(([yearSearch, titleSearch]) => {
        this.stillSearching = [yearSearch, titleSearch].some(
          value => value != this.defaultSearchValue
        );
      }),
      map(([yearSearch, titleSearch, movies]) => {
        let filteredMovies = movies;

        if (yearSearch !== this.defaultSearchValue) {
          filteredMovies = filteredMovies.filter(({ release_date }) =>
            release_date.startsWith(yearSearch)
          );
        }

        if (titleSearch !== this.defaultSearchValue) {
          filteredMovies = filteredMovies.filter(({ title }) =>
            title.toLowerCase().includes(titleSearch.toLowerCase())
          );
        }

        return filteredMovies;
      })
    );
  }


}
