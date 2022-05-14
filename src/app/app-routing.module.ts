import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PassengersComponent } from './passengers/passengers.component';

const routes: Routes = [
    {
        path: 'pasajeros',
        component: PassengersComponent
    }
];

@NgModule({
    imports: [[RouterModule.forRoot(routes)]],
    exports: [RouterModule]
})
export class AppRoutingModule { }
