import { Component, ElementRef, ViewChild} from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  template: `
    <h5>Buscar:</h5>
    <input
      type="text"
      class="forom-control"
      placeholder="Bucar Gifs..."
      (keyup.enter)="searchTag()"
      #txtTagInput>
  `
})

export class SearchBoxComponent {

  //Decorador para hacer referencia directa al HTML que creamos dentro de nuestro archivo de componente (al HTML local)
  @ViewChild('txtTagInput')//Recibe el nombre de la referencia de aquel elemento de la vista que necesitamos, por ejemplo.
  public tagInput!:ElementRef<HTMLInputElement>;//le digo que siempre recibirá un valor con ! al final del nombre de la propiedad

  constructor(private gifsService:GifsService){

  }


  /*//al añadir decorador de ViewChild no necesito recibir el argumento de tipo string porque
    aquel argumento ya lo tengo en la propiedad de TagInput:
  searchTag(newTag:string):void{*/
  searchTag(){
    const newTag=this.tagInput.nativeElement.value;/*Ahora de TagInput que es elemento HTML creado nativamente en
    este archivo, extraigo el valor que trae consigo*/
    //console.log({newTag})

    this.gifsService.searchTag(newTag);

    this.tagInput.nativeElement.value=''

  }

}
