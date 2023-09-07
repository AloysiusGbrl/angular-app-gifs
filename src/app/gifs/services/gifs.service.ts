import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

//const GIPHY_APP_KEY='lHwF0thM5bXGTMQ3DOmLPKyn0QTA0Vd6'

@Injectable({providedIn: 'root'})
export class GifsService {
  //creando una propiedad para almacenar todo lo que el usuario estará buscando, todos los Tags
  public gifList:Gif[]=[];
  private _tagsHistory:string[]=[];
  private apiKey:string='lHwF0thM5bXGTMQ3DOmLPKyn0QTA0Vd6';
  private serviceUrl:string='https://api.giphy.com/v1/gifs';

  constructor(private http:HttpClient) {
    this.loadLocalStorage();
  }

  get tagsHistory(){
    return [...this._tagsHistory];/* operador spred (...) para crear una copia del valor de los TagsHistory */
  }

  organizeHotory(tag:string){
    tag=tag.toLowerCase();//para hacer todo el texto en minúsculas
    //si el tagHistory incluye el tag que el usuario está ingresando entonces eliminaré el anterior tag del mismo nombre
    if(this.tagsHistory.includes(tag)){
      //filter sirve para regresar un nuuevo arreglo, pero sólo regresará todos los elementos cuya función regrese un true
      //si oldtag es diferente al tag que el usuario está ingresando, entonces si dejaré pasar al nuevo tag
      this._tagsHistory=this._tagsHistory.filter((oldTag)=>oldTag !== tag)/*Ahora tengo un arreglo con todos los tags,
      menos el que cohincida*/
    }
    this._tagsHistory.unshift(tag)//Inserta el nuevo elemento (tag) al inicio del arreglo

    //Ahora configuraré que el arreglo sólo pueda contener una determinada cantidad de elementos
    this._tagsHistory=this._tagsHistory.splice(0,10);//Mi arreglo sólo podrá contener 10 datos

    this.saveLocalStorage();
  }

  private saveLocalStorage():void{//salvaremos el arreglo de las busquedas de gifs de nuestra página
    localStorage.setItem('history', JSON.stringify(this._tagsHistory))
  }

  private loadLocalStorage():void{
    if(!localStorage.getItem('history'))return;
    this._tagsHistory=JSON.parse(localStorage.getItem ('history')!)
    if(this._tagsHistory.length===0)return;
    this.searchTag(this._tagsHistory[0])
  }

  /*async*/ searchTag(tag:string):/*Promise<*/void/*>*/{//fragmentos comentados del romorudimentario
    if(tag.length===0)return;//Si usuario ingresa string vacío no pasará nada

    this.organizeHotory(tag);
    //this._tagsHistory.unshift(tag)//Para añadir el Tag al inicio de la Lista del arreglo--//Ya no necesario--
    ///console.log(this.tagsHistory)

    //Modo de usar API con herramientas de angular
    /*//modo 1  ----
    this.http.get('https://api.giphy.com/v1/gifs/search?api_key=lHwF0thM5bXGTMQ3DOmLPKyn0QTA0Vd6&q=Halo&limit=10')
    .subscribe(resp=>{
      console.log(resp);
    })*/

    //Modo 2, más estructurado
    const params=new HttpParams()
    .set('api_key',this.apiKey)
    .set('limit', 10)
    .set('q', tag)

    this.http.get<SearchResponse>(`${this.serviceUrl}/search`,{params})
    .subscribe(resp=>{
      //console.log(resp);
      this.gifList=resp.data
      //console.log({gifs:this.gifList});
    })

    //Modo rudimentario de enlazar al app con el API (Con herramientas JavaScript)
    /*fetch('https://api.giphy.com/v1/gifs/search?api_key=lHwF0thM5bXGTMQ3DOmLPKyn0QTA0Vd6&q=Halo&limit=10')
    .then(resp=> resp.json())
    .then(data=>console.log(data))*/
    /*//Lo msimo pero de otro modo
    const resp=await fetch('https://api.giphy.com/v1/gifs/search?api_key=lHwF0thM5bXGTMQ3DOmLPKyn0QTA0Vd6&q=Halo&limit=10')
    const data = await resp.json()
    console.log(data)
    */
  }

}
