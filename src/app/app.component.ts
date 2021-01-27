import { Component } from '@angular/core';

import { Comment } from './class/comment';
import { User } from './class/user';

const CURRENT_USER: User = new User(1, '高橋真帆');
const ANOTHER_USER: User = new User(2, '首藤杏菜');

// モックデータ
const COMMENTS: Comment[] = [
  new Comment(ANOTHER_USER, 'お疲れ様です'),
  new Comment(ANOTHER_USER, '機能の追加はどうですか？'),
  new Comment(CURRENT_USER, '順調です'),
  new Comment(CURRENT_USER, 'もうすぐ完了です'),
];

@Component({
  selector: 'ac-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  comment = '';
  comments = COMMENTS;
  currentUser = CURRENT_USER;


  addComment(comment: string): void {
    if (comment) {
      console.log(this.comments);
      this.comments.push(new Comment(this.currentUser, comment));
    }
  }
}
