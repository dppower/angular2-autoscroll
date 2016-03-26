import {Component, ViewChild, AfterViewChecked, OnInit, ChangeDetectorRef} from "angular2/core";
import {AutoscrollDirective} from "./auto-scroll.directive";

@Component({
    selector: "auto-scroll-display",
    template: `
    <div #this class="chat-box" [inScrollHeight]="this.scrollHeight" [inClientHeight]="this.clientHeight" autoScroll (scrollEvent)="shouldScroll = $event">
        <ng-content></ng-content>
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
export class AutoScrollComponent implements AfterViewChecked {
    @ViewChild(AutoscrollDirective) autoScroll: AutoscrollDirective;
    shouldScroll: boolean = false;

    constructor(private cdr_: ChangeDetectorRef) { };

    ngAfterViewChecked() {
        if (this.shouldScroll) {
            this.autoScroll.scroll();
            this.cdr_.detectChanges();
            this.shouldScroll = false;
        }
    }
}