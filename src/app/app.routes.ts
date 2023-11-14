import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoModule } from './modules/todo/todo.module';
import { TodoComponent } from './modules/todo/components/todo.component';

const routes: Routes = [{ component: TodoComponent, path: '' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class RoutesModule {}
