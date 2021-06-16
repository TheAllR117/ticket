import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { News } from '../interfaces/interfaces';


@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  apiKey : string = 'AIzaSyDAYDRUB8-MNmO6JAy0aHaNaOKmE5VZHpI';
  news: News;

  constructor(public http: HttpClient) { }

    getVideosForChanel(channel, maxResults): Observable<Object> {
      let url = 'https://www.googleapis.com/youtube/v3/search?key=' + this.apiKey + '&channelId=' + channel + '&order=date&part=snippet &type=video,id&maxResults=' + maxResults
      return this.http.get(url)
        .pipe(map((res) => {
          return res;
        }))
    }

    getNews() {
      return this.http.get<News>(`https://eucombgasolineras.mx/wp-json/wp/v2/posts`);
    }
}