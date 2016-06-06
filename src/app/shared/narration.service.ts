import { Injectable, Input } from '@angular/core';

export class Narration {
    public step: string;
    public narration: string;
    public pre: string;

    constructor(s: string, n: string, pre?: string) {
        this.step = s;
        this.narration = n;
        this.pre = pre ? pre : null;
    }
};

@Injectable()
export class NarrationService {
    dataArray: Narration[] = [];

    clear() {
        this.dataArray.length = 0;
    }

    add(step: string, details: string) {
        this.dataArray.push(new Narration(step, details));
    }

    addPre(step: string, details: string, pre: string) {
        this.dataArray.push(new Narration(step, details, pre));
    }

    fallbackPre(expectedPreCount: number, genericMessage: string, realPre: string[]) {
        var i = 1;
        for (var ctx of realPre) {
            this.addPre(genericMessage +
                " (note: expected " + expectedPreCount + " backend queries but got " + realPre.length
                + ", " + i++ + "/" + realPre.length + ")",
                "A query was executed in the backend:",
                ctx);
        }
    }
}