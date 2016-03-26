import {Component, OnInit, ViewChild, AfterViewChecked, ChangeDetectorRef} from "angular2/core";
import {AsyncPipe} from "angular2/common";
import {Subject, Observable} from "rxjs/Rx";
import {AutoscrollDirective} from "./auto-scroll.directive";

@Component({
    selector: 'my-app',
    template: `
    <div #this class="chat-box" [inScrollHeight]="this.scrollHeight" [inClientHeight]="this.clientHeight" autoScroll (scrollEvent)="shouldScroll = $event">
        <p *ngFor="#message of chat$ | async">{{message}}</p>
    </div>
    <div>
        <button type="button" (click)="addNewMessage()">New Message</button>
        <span>Count: {{count}}</span>
    </div>
    `,
    styles: [`
    .chat-box {
        height: 200px;
        width: 400px;
        overflow-y: scroll;
    }
    `],
    directives: [AutoscrollDirective]
})
export class AppComponent implements OnInit {
    chatSubject: Subject<string> = new Subject<string>();
    chat$: Observable<string[]>;
    count: number = 0;

    @ViewChild(AutoscrollDirective) autoScroll: AutoscrollDirective;
    shouldScroll: boolean = false;

    constructor(private cdr_: ChangeDetectorRef) { };

    ngAfterViewChecked() {
        if (this.shouldScroll) {
            //setTimeout(() => this.autoScroll.scroll(), 0);
            this.autoScroll.scroll();
            this.cdr_.detectChanges();
            this.shouldScroll = false;
        }
    }

    addNewMessage() {
        this.count++;
        this.chatSubject.next("new message: " + this.count + ".");
    }

    ngOnInit() {
        this.chat$ = this.chatSubject.map(chat => Array(chat)).scan<string[]>((acc, x) => acc.concat(x));
    }
}