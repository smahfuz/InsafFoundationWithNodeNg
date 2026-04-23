import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface NewsUpdate {
  title: string;
  content: string;
  image?: string;
  category?: string;
  publishDate: Date;
}

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
  selectedNews: NewsUpdate | null = null;

  ngOnInit(): void {
    this.loadStaticNews();
  }

  // 🔹 Static Data (No DB)
  loadStaticNews(): void {
    this.newsList = [
      {
        title: 'বন্যা কবলিত এলাকার জন্য ফান্ড কালেকশন',
        content: '',
        image: 'poor-people-er-shop-making.jpg',
        category: 'ত্রাণ বিতরণ',
        publishDate: new Date(),
      },
      {
        title: 'শিশুদের জন্য বিজ্ঞান শেখা',
        content: '......',
        image: 'small-child-schiense-learn.jpg',
        category: 'বিজ্ঞান',
        publishDate: new Date(),
      }

    ];

    this.loading = false;
  }

  // 🔹 Select news for detail view
  selectNews(news: NewsUpdate): void {
    this.selectedNews = news;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // 🔹 Back button
  closeNews(): void {
    this.selectedNews = null;
  }

  // 🔹 Image handler (fixed)
  getNewsImage(news: NewsUpdate): string {

    // Local image (public folder)
    if (news.image && !news.image.startsWith('http')) {
      return `/images/news/${news.image}`;
    }

    // External image
    if (news.image && news.image.startsWith('http')) {
      return news.image;
    }

    // Default images
    const defaults: { [key: string]: string } = {
      'ত্রাণ বিতরণ': '/images/news/default.jpg',
      'স্বাস্থ্য সেবা': '/images/news/default.jpg',
      'শিক্ষা সহায়তা': '/images/news/default.jpg',
      'পরিবেশ রক্ষা': '/images/news/default.jpg'
    };

    return defaults[news.category || ''] || '/images/news/default.jpg';
  }
}