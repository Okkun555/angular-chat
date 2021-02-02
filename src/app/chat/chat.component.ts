import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList, SnapshotAction } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../class/user';
import { Comment } from '../class/comment';


@Component({
  selector: 'ac-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  comments$: Observable<Comment[]>;
  commentRef: AngularFireList<Comment>;
  comment = '';
  currentUser: User;
  currentUser$: Observable<User>;


  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
  ) {
    this.commentRef = db.list('comments');

  }

  ngOnInit(): void {
    this.currentUser$ = this.afAuth.authState.pipe(
      map((user: firebase.User | null) => {
        if (user) {
          this.currentUser = new User(user);
          return this.currentUser;
        }
        return null;
      })
    );

    // データのキーも含めてた戻り値を取得
    this.comments$ = this.commentRef.snapshotChanges()
      .pipe(
        map((snapshots: SnapshotAction<Comment>[]) => {
          return snapshots.map(snapshot => {
            const value = snapshot.payload.val();
            return new Comment({ key: snapshot.payload.key, ...value });
          })
        })
      );
  }

  addComment(comment: string): void {
    if (comment) {
      this.commentRef.push(new Comment({ user: this.currentUser, message: comment }));
      this.comment = '';
    }
  }

  updateComment(comment: Comment): void {
    const { key, message } = comment;
    this.commentRef.update(key, { message });
  }

  deleteCommenta(comment: Comment): void {
    this.commentRef.remove(comment.key);
  }
}
