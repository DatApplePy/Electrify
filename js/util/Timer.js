import {renderTimer} from "../renderer.js";

export class Timer {
    #millis;
    #seconds;
    #minutes;
    #intId;
    #finished;


    constructor(millis = 0, seconds = 0, minutes = 0, finished = false) {
        this.#millis = millis;
        this.#seconds = seconds;
        this.#minutes = minutes;
        this.#finished = finished;
    }

    static loadTimer(timer) {
        return new Timer(timer.millis, timer.seconds, timer.minutes, timer.finished);
    }

    startT() {
        if (!this.#finished) {
            if (this.#intId !== null) {
                clearInterval(this.#intId);
            }
            this.#intId = setInterval(() => {
                this.#step();
                renderTimer(this);
            }, 10);
        } else {
            renderTimer(this);
        }
    }

    stopT() {
        clearInterval(this.#intId);
        this.#finished = true;
    }

    #step() {
        this.#millis += 10;
        if (this.#millis === 1000) {
            this.#millis = 0;
            this.#seconds++;
            if (this.#seconds === 60) {
                this.#seconds = 0;
                this.#minutes++;
            }
        }
    }

    getTime() {
        return [this.#millis, this.#seconds, this.#minutes];
    }

    toJSON() {
        return {
            millis: this.#millis,
            seconds: this.#seconds,
            minutes: this.#minutes,
            finished: this.#finished
        };
    }
}