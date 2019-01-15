function HelpScreen(context) {
    this.context = context;
    this.w = context.gameState.playWidth * 0.8;
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
            context.gameState.gameScreen = "play";
        }
        backButton.mouseReleased();
        forwardButton.mouseReleased();
    };
}

