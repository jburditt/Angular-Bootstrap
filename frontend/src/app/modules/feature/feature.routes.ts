import { Route } from "@angular/router";
import { FormPageComponent } from "@app/modules/feature/pages/form/form.component";
import { NgRxStoreComponent } from "@app/modules/feature/pages/ngrx-store/ngrx-store.component";
import { FlagsPageComponent } from "./pages/flags/flags.component";

const enum FeatureRoutes {
  HOME = '',
  FORM = 'form',
  FLAGS = 'flags',
  NGRX_STORE = 'ngrx-store',
}

export default [
  {
    path: FeatureRoutes.HOME,
    component: FormPageComponent,
  },
  {
    path: FeatureRoutes.FORM,
    component: FormPageComponent,
  },
  {
    path: FeatureRoutes.FLAGS,
    component: FlagsPageComponent,
  },
  {
    path: FeatureRoutes.NGRX_STORE,
    component: NgRxStoreComponent,
  }
] satisfies Route[];
