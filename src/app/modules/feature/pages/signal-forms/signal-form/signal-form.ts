import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { form, FormField, pattern, required } from '@angular/forms/signals';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatButton } from '@angular/material/button';

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

interface Province {
  code: string;
  name: string;
}

@Component({
  selector: 'app-signal-form',
  imports: [MatButton, MatInputModule, MatFormFieldModule, FormField, MatDatepickerModule, MatSelectModule],
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

  provinces: Province[] = [
    { code: 'AB', name: 'Alberta' },
    { code: 'BC', name: 'British Columbia' },
    { code: 'MB', name: 'Manitoba' },
    { code: 'NB', name: 'New Brunswick' },
    { code: 'NL', name: 'Newfoundland and Labrador' },
    { code: 'NS', name: 'Nova Scotia' },
    { code: 'ON', name: 'Ontario' },
    { code: 'PE', name: 'Prince Edward Island' },
    { code: 'QC', name: 'Quebec' },
    { code: 'SK', name: 'Saskatchewan' },
    { code: 'NT', name: 'Northwest Territories' },
    { code: 'NU', name: 'Nunavut' },
    { code: 'YT', name: 'Yukon' }
  ];

  protected onSubmit(event: Event) {
    event.preventDefault();
    //this.searchForm.get('addressForm')?.markAllAsTouched();
    //console.log("isValid", this.searchForm.);
    console.log("searchForm", this.searchForm.firstName().value());
    return false;
  }
}
