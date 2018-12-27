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
        this.context.stroke('#444e');
        this.context.strokeWeight(2);
        this.context.fill(this.color);
        this.context.rect(0, 0, this.w, this.h, 10);
        this.context.textSize(this.textSize);
        this.context.textAlign(this.context.CENTER, this.context.CENTER);
        this.context.fill('#444e');
        this.context.text(this.text, 0, 0);

        this.context.pop();
    }

    clickedOn() {
        let x = this.context.mouseX;
        let y = this.context.mouseY;
        return x > this.x - this.w/2 && x < this.x + this.w/2 && y > this.y - this.h/2 && y < this.y + this.h/2;
    }

}