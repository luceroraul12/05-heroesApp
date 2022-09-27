import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, CanActivate, RouterLinkActive } from '@angular/router';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [],
})
export class AgregarComponent implements OnInit {

  public creadores =  [
    {
      id: "DC Comics",
      desc: "DC - Comics"
    },
    {
      id: "Marvel Comics",
      desc: "Marvel - Comics"
    }
  ]

  public heroe: Heroe = {
      superhero: "",
      alter_ego: "",
      characters: "",
      first_appearance: "",
      publisher: Publisher.DCComics,
      alt_img: ""
  };

  constructor(private router: ActivatedRoute) {}

  ngOnInit(): void {
    this.router.params.subscribe(({ id }) => console.log(id));
  }
}
