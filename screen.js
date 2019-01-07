//encapsulates the bare minimum idea of a game screen
//eg play screen, menu screen, help screen, etc

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
                    context.levelLabel.text = 'LEVEL   ' + context.numVerts;
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

function PlayScreen(context) {

}

function HelpScreen(context) {
    this.context = context;
    this.w = context.playWidth * 0.8;
    this.h = context.height * 0.9;
    this.backgroundColor = '#bdde';
    this.borderColor = '#444e';
    this.textColor = '#444e';
    let cx = context.width / 2;
    let cy = context.height / 2;

    let closeButtonWidth = this.w / 10;
    let closeButton = new CloseButton(this.context, cx + this.w / 2, cy - this.h / 2, closeButtonWidth);

    let titleLabel = new Label(this.context, 'HELP', cx - this.w * 0.125, cy - this.h * 0.45, this.w * 0.25, this.w * 0.1);
    titleLabel.center = true;

    let currentPage = 0;
    let numPages = 3;


    this.draw = function () {
        this.context.push();

        this.context.rectMode(this.context.CENTER, this.context.CENTER);
        this.context.fill(this.backgroundColor);
        this.context.stroke(this.borderColor);
        this.context.strokeWeight(2);
        this.context.rect(cx, cy, this.w, this.h, 10);
        closeButton.draw();
        titleLabel.draw();
        if (currentPage > 0) backButton.draw();
        if (currentPage < numPages - 1) forwardButton.draw();

        //text;
        if (currentPage === 0) {
            this.drawPage0();
        } else if (currentPage === 1) {
            this.drawPage1();
        } else if (currentPage === 2) {
            this.drawPage2();
        }
        this.context.pop();


    };

    this.drawPage2 = function () {
        this.context.fill(this.textColor);
        this.context.textAlign(this.context.LEFT, this.context.CENTER);
        this.context.textSize(this.h / 30);
        let leftPos = cx - this.w * 0.4;
        let upPos = cy - this.h * 0.38;

        this.context.fill('#eeee');
        this.context.stroke(2);
        this.context.rectMode(this.context.CENTER);
        this.context.rect(cx, upPos + 3.5 * this.h / 25 - 0.5 * this.h / 25, this.w * 0.9, this.h / 25 * 7.5, 5);
        this.context.rect(cx, upPos + 11.5 * this.h / 25 - 0.5 * this.h / 25, this.w * 0.9, this.h / 25 * 7.5, 5);

        this.context.fill('#444e');
        this.context.noStroke();
        this.context.text('Offset Touch         ', leftPos, upPos);
        this.context.text('Changes whether the  ', leftPos, upPos + 2 * this.h / 25);
        this.context.text('selected vertex is   ', leftPos, upPos + 3 * this.h / 25);
        this.context.text('offset from the touch', leftPos, upPos + 4 * this.h / 25);
        this.context.text('location for easier  ', leftPos, upPos + 5 * this.h / 25);
        this.context.text('visibility.          ', leftPos, upPos + 6 * this.h / 25);

        this.context.text('Advanced Move        ', leftPos, upPos + 8 * this.h / 25);
        this.context.text('Allows you to select ', leftPos, upPos + 10 * this.h / 25);
        this.context.text('whether to move the  ', leftPos, upPos + 11 * this.h / 25);
        this.context.text('graph vertices, the  ', leftPos, upPos + 12 * this.h / 25);
        this.context.text('goal vertices, or    ', leftPos, upPos + 13 * this.h / 25);
        this.context.text('both.                ', leftPos, upPos + 14 * this.h / 25);

    };

    this.drawPage1 = function () {
        this.context.fill(this.textColor);
        this.context.textAlign(this.context.LEFT, this.context.CENTER);
        this.context.textSize(this.h / 30);
        let leftPos = cx - this.w * 0.4;
        let upPos = cy - this.h * 0.38;

        this.context.fill('#eeee');
        this.context.stroke(2);
        this.context.rectMode(this.context.CENTER);
        this.context.rect(cx, upPos + 3 * this.h / 25 - 0.5 * this.h / 25, this.w * 0.9, this.h / 25 * 6.5, 5);
        this.context.rect(cx, upPos + 9 * this.h / 25 - 0.5 * this.h / 25, this.w * 0.9, this.h / 25 * 4.5, 5);
        this.context.rect(cx, upPos + 14.5 * this.h / 25 - 0.5 * this.h / 25, this.w * 0.9, this.h / 25 * 5.5, 5);

        this.context.fill('#444e');
        this.context.noStroke();
        this.context.text('The level determines ', leftPos, upPos);
        this.context.text('how many vertices    ', leftPos, upPos + 1 * this.h / 25);
        this.context.text('your graph has. Every', leftPos, upPos + 2 * this.h / 25);
        this.context.text('time you play a level', leftPos, upPos + 3 * this.h / 25);
        this.context.text('the puzzle is        ', leftPos, upPos + 4 * this.h / 25);
        this.context.text('randomized.          ', leftPos, upPos + 5 * this.h / 25);

        this.context.text('When you win you are ', leftPos, upPos + 7 * this.h / 25);
        this.context.text('sent to the selected ', leftPos, upPos + 8 * this.h / 25);
        this.context.text('level and get a new  ', leftPos, upPos + 9 * this.h / 25);
        this.context.text('puzzle of that level.', leftPos, upPos + 10 * this.h / 25);

        this.context.text('You can also undo    ', leftPos, upPos + 12 * this.h / 25);
        this.context.text('after winning if you ', leftPos, upPos + 13 * this.h / 25);
        this.context.text('want to go to a      ', leftPos, upPos + 14 * this.h / 25);
        this.context.text('specific point in the', leftPos, upPos + 15 * this.h / 25);
        this.context.text('attempt.             ', leftPos, upPos + 16 * this.h / 25);


    };

    this.drawPage0 = function () {
        this.context.fill(this.textColor);
        this.context.textAlign(this.context.LEFT, this.context.CENTER);
        this.context.textSize(this.h / 30);
        let leftPos = cx - this.w * 0.4;
        let upPos = cy - this.h * 0.38;

        this.context.fill('#eeee');
        this.context.rectMode(this.context.CENTER);
        this.context.stroke(2);
        this.context.rect(cx, upPos + 1.5 * this.h / 25 - 0.5 * this.h / 25, this.w * 0.9, this.h / 25 * 3.5, 5);
        this.context.rect(cx, upPos + 6 * this.h / 25 - 0.5 * this.h / 25, this.w * 0.9, this.h / 25 * 4.5, 5);
        this.context.rect(cx, upPos + 11.5 * this.h / 25 - 0.5 * this.h / 25, this.w * 0.9, this.h / 25 * 5.5, 5);
        this.context.rect(cx, upPos + 16.5 * this.h / 25 - 0.5 * this.h / 25, this.w * 0.9, this.h / 25 * 3.5, 5);

        this.context.fill('#444e');
        this.context.noStroke();

        this.context.text('Swap vertices so that', leftPos, upPos);
        this.context.text('there is an edge over', leftPos, upPos + 1 * this.h / 25);
        this.context.text('every track.', leftPos, upPos + 2 * this.h / 25);

        this.context.text('Tracks are blue if', leftPos, upPos + 4 * this.h / 25);
        this.context.text('they have an edge,   ', leftPos, upPos + 5 * this.h / 25);
        this.context.text('and red if they are', leftPos, upPos + 6 * this.h / 25);
        this.context.text('missing one.', leftPos, upPos + 7 * this.h / 25);

        this.context.text('Edges cannot be moved', leftPos, upPos + 9 * this.h / 25);
        this.context.text('independently. They  ', leftPos, upPos + 10 * this.h / 25);
        this.context.text('are attached to their', leftPos, upPos + 11 * this.h / 25);
        this.context.text('vertices and move    ', leftPos, upPos + 12 * this.h / 25);
        this.context.text('with them.           ', leftPos, upPos + 13 * this.h / 25);

        this.context.text('RSET lets you try the', leftPos, upPos + 15 * this.h / 25);
        this.context.text('same puzzle from the ', leftPos, upPos + 16 * this.h / 25);
        this.context.text('beginning.           ', leftPos, upPos + 17 * this.h / 25);


    };

    this.createPageButton = function (dir) {
        let x;
        let y = cy + this.h * 0.43;
        if (dir === 0) {
            x = cx - this.w / 2 + this.w * 0.05 + this.w / 12;
        } else {
            x = cx + this.w / 2 - this.w * 0.05 - this.w / 12;
        }
        let button = new Button(this.context, null, null, x, y, this.w / 6, this.w / 6);
        button.dir = dir;
        button.draw = function () {
            this.context.push();
            //background
            this.context.translate(this.x, this.y);
            this.context.rectMode(this.context.CENTER);
            this.context.strokeWeight(2);
            this.context.fill('#eeee');
            this.context.rect(0, 0, this.w, this.w, 10);

            let f = 0.25 * this.w;
            this.context.strokeWeight(5);
            if (dir === 0) {
                this.context.line(0, -f, -f, 0);
                this.context.line(-f, 0, 0, f);
            } else {
                this.context.line(0, -f, f, 0);
                this.context.line(f, 0, 0, f);
            }

            this.context.pop();
        };
        button.mouseReleased = function () {
            if (this.clickedOn()) {
                if (this.dir === 0) {
                    if (currentPage > 0) currentPage -= 1;
                } else {
                    if (currentPage < numPages - 1) currentPage += 1;
                }
            }
        };
        return button;
    };
    let backButton = this.createPageButton(0);
    let forwardButton = this.createPageButton(1);

    this.mouseReleased = function () {
        if (closeButton.clickedOn()) {
            context.gameScreen = "play";
        }
        backButton.mouseReleased();
        forwardButton.mouseReleased();
    };
}

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
            context.reset();
        }
    };
    let sameButton = new Button(this.context, 'SAME LEVEL', buttonHeight, cx, cy + this.h * 0.15, buttonWidth, buttonHeight);
    sameButton.mouseReleased = function () {
        if (this.clickedOn()) {
            context.gameScreen = "play";
            context.reset();
        }
    };
    let moreButton = new Button(this.context, 'NEXT LEVEL', buttonHeight, cx, cy + this.h * 0.35, buttonWidth, buttonHeight);
    moreButton.mouseReleased = function () {
        if (this.clickedOn()) {
            context.numVerts += 1;
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