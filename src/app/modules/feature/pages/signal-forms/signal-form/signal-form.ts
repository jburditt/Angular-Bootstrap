import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { form, FormField, pattern, required } from '@angular/forms/signals';
import { MatDatepickerModule } from '@angular/material/datepicker';

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
  imports: [MatInputModule, MatFormFieldModule, FormField, MatDatepickerModule],
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
    required(schemaPath.date);
    required(schemaPath.firstName);
    required(schemaPath.addressForm.addressLine1);
    required(schemaPath.addressForm.city);
    required(schemaPath.addressForm.province);
    required(schemaPath.addressForm.postalCode);
    //pattern(schemaPath.addressForm.postalCode, /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/, 'Invalid postal code format');
  });

  constructor() {

  }

  protected onSubmit(event: Event) {
    event.preventDefault();
    //this.searchForm.get('addressForm')?.markAllAsTouched();
    //console.log("isValid", this.searchForm.);
    console.log("searchForm", this.searchForm.firstName().value());
    return false;
  }
}
