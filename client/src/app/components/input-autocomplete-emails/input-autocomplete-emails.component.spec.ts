import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputAutocompleteEmailsComponent } from './input-autocomplete-emails.component';
import { InputAutocompleteEmailsModule } from './input-autocomplete-emails.module';

describe('InputAutocompleteEmailsComponent', () => {
  let component: InputAutocompleteEmailsComponent;
  let fixture: ComponentFixture<InputAutocompleteEmailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InputAutocompleteEmailsComponent],
      imports: [InputAutocompleteEmailsModule, BrowserAnimationsModule],
    });
    fixture = TestBed.createComponent(InputAutocompleteEmailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
