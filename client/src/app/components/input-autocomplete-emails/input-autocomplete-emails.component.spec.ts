import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputAutocompleteEmailsComponent } from './input-autocomplete-emails.component';

describe('InputAutocompleteEmailsComponent', () => {
  let component: InputAutocompleteEmailsComponent;
  let fixture: ComponentFixture<InputAutocompleteEmailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InputAutocompleteEmailsComponent],
    });
    fixture = TestBed.createComponent(InputAutocompleteEmailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
