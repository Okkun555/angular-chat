import { formatDate } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'commentDate'
})
export class CommentDatePipe implements PipeTransform {

  // テンプレートから渡ってくるデータを処理するパイプのメイン処理メソッド
  // コメントの日付パイプ
  transform(value: number, ...args: string[]): string {
    // オプションがなければ日本語時間になる
    const format = args[0] || 'yyyy年MM月dd日 HH:mm';
    return formatDate(value, format, 'en-US');
  }

}
