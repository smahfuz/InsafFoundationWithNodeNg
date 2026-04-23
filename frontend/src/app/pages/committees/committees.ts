import { Component } from '@angular/core';

interface CommitteeMember {
  name: string;
  role: string;
  imageUrl: string;
}

@Component({
  selector: 'app-committees',
  imports: [],
  templateUrl: './committees.html',
  styleUrl: './committees.scss',
})
export class Committees {
  members: CommitteeMember[] = [
    {
      name: 'Mahfuz Ahammed',
      role: 'Member',
      imageUrl: '/images/committees/450529863_3778228039119886_3234417432257102295_n.jpg'
    }
  ];
}
