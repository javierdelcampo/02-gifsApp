import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'neooEK8wCPwAbQ9LUxORAZQheFrz3IYW';
  private servicioURL: string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];

  public resultados: Gif[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor (private http: HttpClient) {
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];

    if (this._historial.length > 0) {
      this.buscarGifs(this._historial[0]);
    }
  }


  buscarGifs( query: string = '' ) {
    query = query.trim().toLowerCase();

    if (!this._historial.includes(query)) {
      this._historial.unshift( query );
      localStorage.setItem('historial', JSON.stringify(this._historial));
    } else {
      console.log('Ya existe');
    }
     
    this._historial = this._historial.splice(0,10);
    console.log(this._historial);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query);

    console.log('Params:' + params.toString());

    //this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=${this.apiKey}&q=${query}`)
    this.http.get<SearchGifsResponse>(`${ this.servicioURL }/search`, { params: params } )
        .subscribe( ( resp ) => {
          this.resultados = resp.data;
          localStorage.setItem('resultados', JSON.stringify(this.resultados));
        });

  }

}
