import {Directive, Input, HostBinding, OnChanges, SimpleChange, Output, EventEmitter} from "angular2/core";

@Directive({
    selector: "[autoScroll]"
})
export class AutoscrollDirective {
    @Input() inScrollHeight;
    @Input() inClientHeight;

    @HostBinding("scrollTop") outScrollTop = 0;
    @Output() scrollEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

    ngOnChanges(changes: {[propName: string]: SimpleChange}) {
        if (changes["inScrollHeight"] || changes["inClientHeight"]) {
            this.scrollEvent.emit(true);;
        }
    };

    scroll() {
        this.outScrollTop = this.inScrollHeight - this.inClientHeight;
    };
}