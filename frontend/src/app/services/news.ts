import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface NewsUpdate {
  id?: number;
  title: string;
  category?: string | null;
  content: string;
  image?: string | null;
  publishDate?: string;
}

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private apiUrl = `${environment.apiUrl}/news`;

  constructor(private http: HttpClient) { }

  getNews(): Observable<NewsUpdate[]> {
    return this.http.get<NewsUpdate[]>(this.apiUrl);
  }

  getNewsById(id: number): Observable<NewsUpdate> {
    return this.http.get<NewsUpdate>(`${this.apiUrl}/${id}`);
  }

  createNews(news: NewsUpdate): Observable<NewsUpdate> {
    return this.http.post<NewsUpdate>(this.apiUrl, news);
  }

  updateNews(id: number, news: NewsUpdate): Observable<NewsUpdate> {
    return this.http.put<NewsUpdate>(`${this.apiUrl}/${id}`, news);
  }

  deleteNews(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
