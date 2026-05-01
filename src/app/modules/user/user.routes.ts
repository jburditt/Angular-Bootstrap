import { Route } from "@angular/router";
import { FormPageComponent } from "@app/modules/user/pages/form.component";
import { SearchPageComponent } from "./pages/search.component";

const enum UserRoutes {
  HOME = '',
  SEARCH = 'search',
  EDIT = ':id',
}

export default [
  {
    path: UserRoutes.HOME,
    component: FormPageComponent,
  },
  {
    path: UserRoutes.SEARCH,
    component: SearchPageComponent,
  },
  {
    path: UserRoutes.EDIT,
    component: FormPageComponent,
  }
] satisfies Route[];
