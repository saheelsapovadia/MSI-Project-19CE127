import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadBulkProjectDialogComponent } from './upload-bulk-project-dialog.component';

describe('UploadBulkProjectDialogComponent', () => {
  let component: UploadBulkProjectDialogComponent;
  let fixture: ComponentFixture<UploadBulkProjectDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadBulkProjectDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadBulkProjectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
