import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { form, FormField, required } from '@angular/forms/signals';

interface FormData {
  date: string;
  firstName: string;
  addressForm: {
    addressLine1: string;
    addressLine2: string;
    city: string;
    province: string;
    postalCode: string;
  };
}

@Component({
  selector: 'app-signal-form',
  imports: [MatInputModule, MatFormFieldModule, FormField],
  templateUrl: './signal-form.html',
  styleUrl: './signal-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignalForm {

  searchModel = signal<FormData>({
    date: '',
    firstName: '',
    addressForm: {
      addressLine1: '',
      addressLine2: '',
      city: '',
      province: '',
      postalCode: '',
    },
  });
  searchForm = form(this.searchModel, (schemaPath) => {
    required(schemaPath.firstName);
    required(schemaPath.addressForm.addressLine1);
    required(schemaPath.addressForm.city);
    required(schemaPath.addressForm.province);
    required(schemaPath.addressForm.postalCode);
  });

  constructor() {

  }

  protected onSubmit() {
    //this.searchForm.get('addressForm')?.markAllAsTouched();
    //console.log("isValid", this.searchForm.valid);
    console.log("searchForm", this.searchForm.firstName().value());
    return false;
  }
}
