function WinScreen(context) {
    this.context = context;
    this.w = context.playWidth * 0.8;
    this.h = context.height * 0.3;
    this.backgroundColor = '#bdbe';
    this.borderColor = '#444e';
    let cx = context.width / 2;
    let cy = context.height / 5;

    let closeButtonWidth = this.w / 10;
    let closeButton = new CloseButton(this.context, cx + this.w / 2, cy - this.h / 2, closeButtonWidth);

    let titleLabel = new Label(this.context, 'GOOD JOB!', cx - this.w * 0.35, cy - this.h * 0.3, this.w * 0.7, this.w * 0.15);
    titleLabel.center = true;
    let buttonWidth = this.w * 0.6;
    let buttonHeight = buttonWidth * 0.15;
    let lessButton = new Button(this.context, 'PREV LEVEL', buttonHeight, cx, cy - this.h * 0.05, buttonWidth, buttonHeight);
    lessButton.mouseReleased = function () {
        if (this.clickedOn()) {
            context.numVerts -= 1;
            context.levelLabel.update();
            context.reset();
        }
    };
    let sameButton = new Button(this.context, 'SAME LEVEL', buttonHeight, cx, cy + this.h * 0.15, buttonWidth, buttonHeight);
    sameButton.mouseReleased = function () {
        if (this.clickedOn()) {
            context.gameScreen = "play";
            context.levelLabel.update();
            context.reset();
        }
    };
    let moreButton = new Button(this.context, 'NEXT LEVEL', buttonHeight, cx, cy + this.h * 0.35, buttonWidth, buttonHeight);
    moreButton.mouseReleased = function () {
        if (this.clickedOn()) {
            context.numVerts += 1;
            context.levelLabel.update();
            context.reset();
        }
    };

    this.draw = function () {
        this.context.rectMode(this.context.CENTER, this.context.CENTER);
        this.context.fill(this.backgroundColor);
        this.context.stroke(this.borderColor);
        this.context.strokeWeight(2);
        this.context.rect(cx, cy, this.w, this.h, 10);
        closeButton.draw();
        titleLabel.draw();
        lessButton.draw();
        sameButton.draw();
        moreButton.draw();

    };

    this.mouseReleased = function () {
        if (closeButton.clickedOn()) {
            context.gameScreen = "play";
            context.winScreenClosed = true;
        }
        lessButton.mouseReleased();
        sameButton.mouseReleased();
        moreButton.mouseReleased();
    };
}