import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';

export const routes: Routes = [

    {
        path: 'movies',
        component:HomeComponent
    },

    {
      path:"movies/:id",
      component:MovieDetailsComponent
    },
    {
      path:"",
      redirectTo:"movies",
      pathMatch:"full"
    },
    {path:"**",
      component:ErrorPageComponent
    }
];
