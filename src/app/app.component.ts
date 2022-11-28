import { Component } from '@angular/core';
import * as CodeMirror from 'codemirror';

import 'codemirror/mode/python/python';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/addon/display/placeholder';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  content = '';
  title = 'code-edtor';
  snippets = [
    { text: 'amr', displayName: 'select' },
    { text: 'mohsen', displayName: 'update' },
    { text: 't', displayName: 'create' },
    // other snippets for hinting
  ];

  log() {
    console.log(this.content);
  }

  buttonClieck() {
    console.log(this.content);
  }

  getSnippets = (codemirror: any) => {
    CodeMirror.showHint(
      codemirror,
      () => {
        let cursor = codemirror.getCursor();
        let line = codemirror.getLine(cursor.line);
        let start = cursor.ch,
          end = cursor.ch;
        // corrects ignoring trailing whitespaces removal
        while (start && /\w/.test(line.charAt(start - 1))) --start;
        while (end < line.length && /\w/.test(line.charAt(end))) ++end;
        const token = codemirror.getTokenAt(cursor);
        const currentWord = token.string;

        // reduce hint options if user has already entered something
        const list = this.snippets.filter(function (item) {
          return item.displayName.indexOf(currentWord) >= 0;
        });

        return {
          list: list.length ? list : this.snippets,
          from: CodeMirror.Pos(cursor.line, start),
          to: CodeMirror.Pos(cursor.line, end),
        };
      },
      { completeSingle: true }
    );
  };

  addSnippet(){
    this.snippets.push({text:'koko', displayName:'koko'})
  }
}
