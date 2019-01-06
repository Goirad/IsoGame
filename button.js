class Button {
    constructor(context, text, textSize,x, y, w, h) {
        this.context = context;
        this.text = text;
        this.x = x;
        this.y = y;
        //context.textSize(30);
        //this.w = context.textWidth(text) + 16;
        this.w = w;
        this.h = h;
        this.color = '#eeee';
        this.textSize = textSize;
    }

    draw() {
        this.context.push();
        this.context.rectMode(this.context.CENTER);
        this.context.translate(this.x, this.y);

        //button box
        this.context.stroke('#444e');
        this.context.strokeWeight(2);
        this.context.fill(this.color);
        this.context.rect(0, 0, this.w, this.h, 10);

        //button text
        this.context.textSize(this.textSize);
        this.context.textAlign(this.context.CENTER, this.context.CENTER);
        this.context.fill('#444e');
        this.context.text(this.text, 0, this.textSize/15);



        this.context.pop();
    }

    clickedOn() {
        let x = this.context.mouseX;
        let y = this.context.mouseY;
        return x > this.x - this.w/2 && x < this.x + this.w/2 && y > this.y - this.h/2 && y < this.y + this.h/2;
    }

}

class CloseButton extends Button {
    constructor(context, x, y, w) {
        super(context, null, null, x, y, w, w);
    }

    draw() {
        this.context.push();
        //background
        this.context.translate(this.x, this.y);
        this.context.rectMode(this.context.CENTER);
        this.context.strokeWeight(2);
        this.context.fill('#eeee');
        this.context.rect(0, 0, this.w, this.w, 10);
        //tick
        let f = 0.25*this.w;
        this.context.strokeWeight(5);
        this.context.line(-f, -f, f, f);
        this.context.line(-f, f, f, -f);

        this.context.pop();
    }
}

class Label {
    constructor(context, text, x, y, w, h) {
        this.context = context;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.text = text;
        this.textSize = h*0.8;
        this.center = false;
        this.context.textSize(this.textSize);
        this.textWidth = this.context.textWidth(this.text);
    }

    draw() {
        this.context.push();

        this.context.translate(this.x, this.y);
        this.context.rectMode(this.context.CORNERS);
        this.context.textSize(this.textSize);
        this.context.fill('#eeee');
        this.context.rect(0, -this.h/2, this.w, this.h/2, 5);
        this.context.fill('#444e');

        if (this.center) {
            this.context.textAlign(this.context.CENTER, this.context.CENTER);
            this.context.text(this.text, this.w/2, this.textSize/15);
        }else{
            this.context.textAlign(this.context.LEFT, this.context.CENTER);
            this.context.text(this.text, this.h*0.17, this.textSize/15);
        }

        this.context.pop();
    }
}

class CheckBox {
    constructor(context, x, y, w) {
        this.context = context;
        this.x = x;
        this.y = y;
        this.w = w;
        this.checked = false;
    }

    draw() {
        this.context.push();
        //background
        this.context.translate(this.x, this.y);
        this.context.rectMode(this.context.CENTER);
        this.context.strokeWeight(2);
        this.context.fill('#eeee');
        this.context.rect(0, 0, this.w, this.w, 10);
        //tick
        if (this.checked) {
            let f = 0.25*this.w;
            this.context.strokeWeight(5);
            this.context.line(-f, 0, -f*0.5, f);
            this.context.line(-f*0.5, f, f, -f);
        }

        this.context.pop();
    }

    clickedOn() {
        let x = this.context.mouseX;
        let y = this.context.mouseY;
        if (x > this.x - this.w/2 && x < this.x + this.w/2 && y > this.y - this.w/2 && y < this.y + this.w/2) {
            this.checked = !this.checked;
        }
    }
}