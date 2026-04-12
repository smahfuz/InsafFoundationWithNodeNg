import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MemberService, Member } from '../../services/member';

@Component({
  selector: 'app-members',
  imports: [CommonModule, FormsModule],
  templateUrl: './members.html',
})
export class Members implements OnInit {
  members: Member[] = [];
  isModalOpen = false;
  isEditing = false;
  
  currentMember: Member = { name: '', email: '', phone: '', address: '' };

  constructor(private memberService: MemberService) {}

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers(): void {
    this.memberService.getMembers().subscribe({
      next: (data) => this.members = data,
      error: (err) => console.error('Error fetching members', err)
    });
  }

  openModal(member?: Member): void {
    if (member) {
      this.isEditing = true;
      this.currentMember = { ...member }; // Clone
    } else {
      this.isEditing = false;
      this.currentMember = { name: '', email: '', phone: '', address: '' };
    }
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.currentMember = { name: '', email: '', phone: '', address: '' };
  }

  saveMember(): void {
    if (this.isEditing && this.currentMember.id) {
      this.memberService.updateMember(this.currentMember.id, this.currentMember).subscribe({
        next: () => {
          this.loadMembers();
          this.closeModal();
        }
      });
    } else {
      this.memberService.createMember(this.currentMember).subscribe({
        next: () => {
          this.loadMembers();
          this.closeModal();
        }
      });
    }
  }

  deleteMember(id?: number): void {
    if (id && confirm('Are you sure you want to delete this member?')) {
      this.memberService.deleteMember(id).subscribe({
        next: () => this.loadMembers()
      });
    }
  }
}
