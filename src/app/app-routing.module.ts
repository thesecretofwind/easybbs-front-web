import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BoardContentComponent } from './components/board-content/board-content.component';

const routes: Routes = [
  {
    path:'',
    component: BoardContentComponent
  },
  {
    path: 'forum/:id',
    component: BoardContentComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
