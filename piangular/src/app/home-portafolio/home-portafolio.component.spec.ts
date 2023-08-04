import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePortafolioComponent } from './home-portafolio.component';

describe('HomePortafolioComponent', () => {
  let component: HomePortafolioComponent;
  let fixture: ComponentFixture<HomePortafolioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomePortafolioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomePortafolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


/*
https://cdn.pixabay.com/photo/2023/06/16/17/21/man-8068531_1280.jpg
https://cdn.pixabay.com/photo/2023/07/01/20/01/young-woman-8100839_1280.png
*/