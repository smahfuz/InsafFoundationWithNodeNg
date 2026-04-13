import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsService, NewsUpdate } from '../../services/news';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './news.html',
  styleUrl: './news.scss',
})
export class News implements OnInit {
  newsList: NewsUpdate[] = [];
  loading = true;

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.loadNews();
  }

  loadNews(): void {
    this.loading = true;
    this.newsService.getNews().subscribe({
      next: (data) => {
        this.newsList = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching news', err);
        this.loading = false;
      }
    });
  }

  getNewsImage(image: string | null | undefined): string {
    return image ? `/images/news/${image}` : 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1000&auto=format&fit=crop';
  }
}
