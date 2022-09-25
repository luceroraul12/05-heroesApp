import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, CanActivate, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [],
})
export class AgregarComponent implements OnInit {
  constructor(private router: ActivatedRoute) {}

  ngOnInit(): void {
    this.router.params.subscribe(({ id }) => console.log(id));
  }
}
