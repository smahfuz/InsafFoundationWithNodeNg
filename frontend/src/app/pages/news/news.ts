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

  getNewsImage(news: NewsUpdate): string {
    if (news.image && !news.image.startsWith('http')) {
      return `/images/news/${news.image}`;
    }
    
    if (news.image && news.image.startsWith('http')) {
      return news.image;
    }

    // Default high-quality images from Unsplash based on category
    const defaults: { [key: string]: string } = {
      'রক্ত দান': 'https://images.unsplash.com/photo-1615461066870-40b124f293db?q=80&w=1000&auto=format&fit=crop',
      'মেডিকেল ক্যাম্প': 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1000&auto=format&fit=crop',
      'বৃক্ষ রোপণ': 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1000&auto=format&fit=crop',
      'ঈদ উৎসব': 'https://images.unsplash.com/photo-1564032994050-8b010c7104ae?q=80&w=1000&auto=format&fit=crop',
      'প্যান্ডেমিক সেবা': 'https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=1000&auto=format&fit=crop',
      'ঈদ ফুডপ্যাক': 'https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=1000&auto=format&fit=crop',
      'রমজান ফুডপ্যাক': 'https://images.unsplash.com/photo-1534073828943-f801091bb18c?q=80&w=1000&auto=format&fit=crop',
      'পোশাক বিতরণ': 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=1000&auto=format&fit=crop'
    };

    return defaults[news.category || ''] || 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1000&auto=format&fit=crop';
  }
}
