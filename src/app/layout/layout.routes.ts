import { Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { TaskMasterComponent } from './pages/task-master/task-master.component';
import { PruebaComponent } from './pages/prueba/prueba.component';
import { TeamsComponent } from './pages/teams/teams.component';
import { MyTaskComponent } from './pages/my-task/my-task.component';
import { UserComponent } from './pages/user/user.component';
import { NotificationComponent } from './pages/notification/notification.component';


export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,

        children: [
            {
                path: 'notificaciones',
                component: NotificationComponent,
            },
            {
                path: 'teams',
                component: TeamsComponent,
            },
            {
                path: 'tareas/:id/:name',
                component: TaskMasterComponent,
            },
            {
                path: 'myTask',
                component: MyTaskComponent,
            },

            {
                path: 'users',
                component: UserComponent,
            }

        ],
    },
];