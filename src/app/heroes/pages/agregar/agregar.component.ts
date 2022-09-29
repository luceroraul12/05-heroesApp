import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, CanActivate, Router, RouterLinkActive } from '@angular/router';
import { switchMap } from 'rxjs';
import { DialogoDeConfirmacionComponent } from '../../components/dialogo-de-confirmacion/dialogo-de-confirmacion.component';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
    `
    img{
      border-radius: 30px;
      width: 100%
    }
    `

  ],
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

  constructor(
    private activatedRoute: ActivatedRoute, 
    private heroesService: HeroesService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog) {}

  ngOnInit(): void {
    if(this.router.url.includes("editar")){
      this.activatedRoute.params
      .pipe(switchMap(({id}) => this.heroesService.getHeroePorId(id)))
      .subscribe(heroeObtenido => {
      console.log("heroe llegado", heroeObtenido);
      this.heroe = heroeObtenido
    });
    }
  }

  emitirSnackBar(mensaje: string): void {
    this.snackBar.open(mensaje, undefined, {
      duration: 1000,
      horizontalPosition: "end",
      verticalPosition: "top",
    })
  }

  guardar(){

    if(this.heroe.superhero == ""){
      alert("heroe sin nombre");
      return
    }

    if(this.heroe.alter_ego == ""){
      alert("heroe sin alter ego");
      return
    }

    if(this.heroe.id){
      this.heroesService.editarHeroe(this.heroe).subscribe(heroe => console.log("heroe modificado", heroe));

    } else {
      this.heroesService.agregarHeroe(this.heroe).subscribe(heroe => 
          this.router.navigate(['heroes/editar',heroe.id])
        );
    }
  
    this.emitirSnackBar("Heroe creado!!!!!!!!!!!!!!")
    
  }

  eliminar(): void{

    const dialog = this.dialog.open(DialogoDeConfirmacionComponent, {
      data: this.heroe
    });

    dialog.afterClosed().subscribe(
      resultado => {
        if(resultado){
          this.heroesService.eliminarHeroe(this.heroe.id!).subscribe(
            respuesta => {
              this.router.navigate(["/heroes"]);
            }
          )
        }
      }
    )


    

    // this.emitirSnackBar("Heroe eliminado!!!!!")
  }
}
