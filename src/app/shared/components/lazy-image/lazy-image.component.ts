import { Component, Input, OnInit } from '@angular/core';
import { timeout } from 'rxjs';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazy-image.component.html'
})
export class LazyImageComponent implements OnInit{
  @Input()
  public url!:string;

  @Input()
  public alt:string='';

  public hasLoaded:boolean=false;

  ngOnInit(): void {
    if(!this.url)throw new Error('URL Property is Required');
  }

  onLoad():void{
    //console.log('Image Loaded')

    //    --Para hacer que retarde un segundo en cargar las imágenes
    /*setTimeout(()=>{
      this.hasLoaded=true;
    },1000)*/

    this.hasLoaded=true;
  }

}
