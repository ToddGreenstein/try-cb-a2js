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
}