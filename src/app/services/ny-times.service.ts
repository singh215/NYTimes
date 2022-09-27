import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NyTimesService {

  constructor(private http: HttpClient) { }

  key = 'zkB81reH91sMF4fiir5hAx50wxKaQXgf';

  getTopStoriesByCategory = (category):Observable<any> => {
    return this.http.get(`https://api.nytimes.com/svc/topstories/v2/${category}.json?api-key=${this.key}`);
  }

  searchArticle = (begin_date, end_date, facet = false, facet_fields = [],
    facet_filter = '', fl = '', fq = '', page = 0, q = '', sort = ''):Observable<any> => {
    return this.http.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${this.key}` +
    `&begin_date=${begin_date}&end_date=${end_date}`);
  }
}
