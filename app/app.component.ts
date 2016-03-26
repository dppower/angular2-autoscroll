import {Component, OnInit, ViewChild, AfterViewChecked} from "angular2/core";
import {AsyncPipe} from "angular2/common";
import {Subject, Observable} from "rxjs/Rx";
import {AutoScrollComponent} from "./auto-scroll.component";

@Component({
    selector: 'my-app',
    template: `
    <auto-scroll-display>
        <p *ngFor="#message of chat$ | async">{{message}}</p>
    </auto-scroll-display>
    <div>
        <button type="button" (click)="addNewMessage()">New Message</button>
        <span>Count: {{count}}</span>
    </div>
    `,
    directives: [AutoScrollComponent]
})
export class AppComponent implements OnInit {
    chatSubject: Subject<string> = new Subject<string>();
    chat$: Observable<string[]>;
    count: number = 0;

    addNewMessage() {
        this.count++;
        this.chatSubject.next("new message: " + this.count + ".");
    }

    ngOnInit() {
        this.chat$ = this.chatSubject.map(chat => Array(chat)).scan<string[]>((acc, x) => acc.concat(x));
    }
}