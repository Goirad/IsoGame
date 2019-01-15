function MenuScreen(context, playWidth) {
    this.context = context;
    this.z = 0;
    this.w = playWidth * 0.8;
    this.h = context.height * 0.9;

    this.backgroundColor = '#dbbe';
    this.borderColor = '#444e';
    this.textColor = '#444e';
    this.lvlButtons = [];
    let f = 0.2;
    let n = 4;
    let buttWidth = (this.w) / (n + (n + 1) * f);
    let xSpace = buttWidth * f;

    let cx = this.context.width / 2;
    let cy = this.context.height / 2;

    let menuTitleLabel = new Label(this.context, 'MENU', cx - this.w * 0.125, cy - this.h * 0.45, this.w * 0.25, this.w * 0.1);
    menuTitleLabel.center = true;
    this.menuCloseButton = new CloseButton(this.context, cx + this.w / 2, cy - this.h / 2, this.w / 10);


    this.offsetTouchCheckbox = new CheckBox(this.context, cx + this.w / 2 - xSpace - this.w * 3 / 50, cy + this.h * 0.2, this.w * 3 / 25);
    this.offsetTouchCheckbox.checked = true;
    this.offsetTouchLabel = new Label(this.context, "TOUCH OFFSET", cx - this.w / 2 + xSpace, cy + this.h * 0.2, this.w * 0.75, this.w * 0.1);

    this.advancedMoveCheckbox = new CheckBox(this.context, cx + this.w / 2 - xSpace - this.w * 3 / 50, cy + this.h * 0.3, this.w * 3 / 25);
    this.advancedMoveCheckbox.checked = false;
    this.advancedMoveLabel = new Label(this.context, "ADVANCED MOVE", cx - this.w / 2 + xSpace, cy + this.h * 0.3, this.w * 0.75, this.w * 0.1);

    for (let i = 0; i < 4; i++) {
        let row = [];
        for (let j = 0; j < 4; j++) {
            let n = 4 * i + j + 3;
            let b = new Button(this.context,
                '' + n, buttWidth / 2,
                cx - this.w / 2 + xSpace + buttWidth / 2 + j * (xSpace + buttWidth),
                cy - this.h / 3 + i * (xSpace + buttWidth),
                buttWidth,
                buttWidth);
            row.push(b);
        }
        this.lvlButtons.push(row);
    }

    this.draw = function () {
        this.context.rectMode(this.context.CENTER, this.context.CENTER);
        this.context.fill(this.backgroundColor);
        this.context.stroke(this.borderColor);
        this.context.strokeWeight(2);
        this.context.rect(cx, cy, this.w, this.h, 10);
        this.menuCloseButton.draw();
        //this.context.fill(this.textColor);
        //this.context.textSize(this.h/15);
        //this.context.text('MENU', cx, this.context.height / 10);
        menuTitleLabel.draw();
        for (let row of this.lvlButtons) {
            for (let b of row) {
                b.draw();
            }
        }

        this.offsetTouchCheckbox.draw();
        this.offsetTouchLabel.draw();

        this.advancedMoveCheckbox.draw();
        this.advancedMoveLabel.draw();
    };

    this.mouseReleased = function () {
        for (let row of this.lvlButtons) {
            for (let b of row) {
                if (b.clickedOn()) {
                    context.numVerts = parseInt(b.text);
                    context.levelLabel.update();
                    context.reset();
                }
            }
        }
        if (this.menuCloseButton.clickedOn()) {
            context.gameScreen = "play";
        }

        this.offsetTouchCheckbox.clickedOn();
        context.offsetTouch = this.offsetTouchCheckbox.checked;

        this.advancedMoveCheckbox.clickedOn();
        context.advancedMove = this.advancedMoveCheckbox.checked;
    };
}