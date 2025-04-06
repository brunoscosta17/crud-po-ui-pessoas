import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideHttpClient } from '@angular/common/http';

import { PoPageDynamicEditModule } from '@po-ui/ng-templates';

import { EditPeopleComponent } from './edit-people.component';

describe('EditPeopleComponent', () => {
  let component: EditPeopleComponent;
  let fixture: ComponentFixture<EditPeopleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        PoPageDynamicEditModule
      ],
      providers: [provideHttpClient()]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
