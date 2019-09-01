
class CheckerColor{}

CheckerColor.WHITE = 0;
CheckerColor.BLACK = 1;

class Checker {
    constructor (color){
        this.color = color;
    }
}

class Board {
    constructor(){
        // white: 0->23, black: 23->0
        this.fields = new Array(24);
        this.whiteBarCounter = new Array(24);
        this.blackBarCounter = new Array(24);
    }

    addCheckersToField(field, color, quantity){
        for (var i = 0; i < quantity; i++)
            field.push(new Checker(color));
    }

    reset() {
        this.fields = new Array(24);
        for (var i = 0; i < this.fields.length; i++)
            this.fields[i] = new Array();
        
        this.addCheckersToField(this.fields[0], CheckerColor.WHITE, 2);
        this.addCheckersToField(this.fields[5], CheckerColor.BLACK, 5);
        this.addCheckersToField(this.fields[7], CheckerColor.BLACK, 3);
        this.addCheckersToField(this.fields[11], CheckerColor.WHITE, 5);
        this.addCheckersToField(this.fields[12], CheckerColor.BLACK, 5);
        this.addCheckersToField(this.fields[16], CheckerColor.WHITE, 3);
        this.addCheckersToField(this.fields[18], CheckerColor.WHITE, 5);
        this.addCheckersToField(this.fields[23], CheckerColor.BLACK, 2);
    }

    print(){
        console.log("11  10  09  08  07  06 |05  04  03  02  01  00");
        let s = "";
        for (let i = 11; i >= 0;i--) {
            if (this.fields[i].length > 0) {
                s += this.fields[i].length.toString().padStart(2, "0");
                if (this.fields[i][0].color == CheckerColor.WHITE)
                    s += "W ";
                else
                    s += "B ";
            }
            else {
                s += "    ";
            }
            if (i == 6)
                s = s.slice(0, -1) + "|";
        }
        console.log(s);
        console.log();
        s = "";
        for (let i = 12; i < 24; i++) {
            if (this.fields[i].length > 0) {
                s += this.fields[i].length.toString().padStart(2, "0");
                if (this.fields[i][0].color == CheckerColor.WHITE)
                    s += "W ";
                else
                    s += "B ";
            }
            else {
                s += "    ";
            }
            if (i == 17)
                s = s.slice(0, -1) + "|";
        }
        console.log(s);
        console.log("12  13  14  15  16  17 |18  19  20  21  22  23");
    }
}

class Dice {
    constructor(){}
    roll() {
        return Math.floor(Math.random() * Math.floor(6));
    }
}

class Game {
    constructor(){
        this.board = new Board();
        this.board.reset();
        this.board.print();
        this.turn = CheckerColor.WHITE;
        this.dice1 = new Dice();
        this.dice2 = new Dice();
    }

    
}

var g = new Game();
