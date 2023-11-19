import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { FileUploadComponent } from './file-upload.component';
import { FileUploadModule } from './file-upload.module';

describe('FileUploadComponent', () => {
  let component: FileUploadComponent;
  let fixture: ComponentFixture<FileUploadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FileUploadComponent],
      imports: [FileUploadModule, HttpClientModule],
    });
    fixture = TestBed.createComponent(FileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
