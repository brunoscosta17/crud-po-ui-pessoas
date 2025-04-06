import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideHttpClient } from '@angular/common/http';

import { PoPageDynamicDetailModule } from '@po-ui/ng-templates';

import { DetailPeopleComponent } from './detail-people.component';

describe('DetailPeopleComponent', () => {
  let component: DetailPeopleComponent;
  let fixture: ComponentFixture<DetailPeopleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        PoPageDynamicDetailModule
      ],
      providers: [provideHttpClient()]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailPeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
