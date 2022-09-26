import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [`
      img {
        width: 100%;
        border-radius: 20px;
      }
  `],
})
export class HeroeComponent implements OnInit {
  constructor(
    private router: ActivatedRoute,
    private heroesService: HeroesService
  ) {}

  @Input() heroe!: Heroe;

  ngOnInit(): void {
    this.router.params
      .pipe(
        switchMap(({ id }) => this.heroesService.getHeroePorId(id)),
        tap(console.log))
      .subscribe((heroe: Heroe[]) => this.heroe = heroe[0]);
  }
}
