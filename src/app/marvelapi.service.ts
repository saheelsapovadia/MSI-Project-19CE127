import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class MarvelapiService {

  data:any = {};
  URI:string = "https://gateway.marvel.com:443/v1/public/characters/1011334?apikey=214d8984b3d975e67bdd43a22506d427";

  constructor(private http: HttpClient) { 
    this.getCharacters()
  }

  getCharacters(){
    let req = this.http.get(this.URI)
    return req;
  }
}
