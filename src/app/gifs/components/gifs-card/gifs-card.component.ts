import { Component, Input, OnInit } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-card',
  templateUrl: './gifs-card.component.html'
})
export class GifsCardComponent implements OnInit{
  /* El onInit es un método especial de Angular
que se ejevutará cuando el componente se haya inicializado */
  @Input()
  public gif!:Gif;

  ngOnInit(): void {
    if(!this.gif)throw new Error('Gif property is required');
  }
}
