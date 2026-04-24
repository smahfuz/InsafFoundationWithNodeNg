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
      name: 'Ujjal Ali',
      role: 'Member',
      imageUrl: '/images/committees/571249929_25072259815775516_6437562358574731270_n.jpg'
    },
    {
      name: 'Sydur Rahman',
      role: 'Member',
      imageUrl: '/images/committees/151031898_696085994415772_4853668275872735270_n.jpg'
    },
    // {
    //   name: 'Mahfuz Ahammed',
    //   role: 'Member',
    //   imageUrl: '/images/committees/450529863_3778228039119886_3234417432257102295_n.jpg'
    // },
    // {
    //   name: 'Akib',
    //   role: 'Member',
    //   imageUrl: '/images/committees/488886821_2499612927037111_4723461957892870766_n.jpg'
    // },
    // {
    //   name: 'Rosin Hossen',
    //   role: 'Member',
    //   imageUrl: '/images/committees/660282092_1490183569298229_4755263152437248916_n.jpg'
    // }
  ];
}
