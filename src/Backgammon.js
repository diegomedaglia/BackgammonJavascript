
class CheckerColor{}

CheckerColor.WHITE = 0;
CheckerColor.BLACK = 1;
CheckerColor.NONE = 2;

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

    checkersInField (fieldNo){
        let nCheckers = this.fields[fieldNo].length;
        let color = CheckerColor.NONE;
        if (nCheckers > 0)
            color = this.fields[fieldNo][0].color;

        return {length:nCheckers, color:color};
    }
}

class Dice {
    constructor(){}
    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    roll() {
        let points =  this.getRandomInt(1, 6);
        console.log(points);
        return points;
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
        this.N_FIELDS = 24;
    }

    roll(){
        return{dice1: this.dice1.roll(), dice2: this.dice2.roll()};
    }

    isValidField(fieldNo){
        return fieldNo >= 0 && fieldNo < this.N_FIELDS;
    }

    move (srcField, destField){
        if (!this.isValidField(srcField) || 
            !this.isValidField(destField))
            return false;
        
        let sF = this.board.fields[srcField];
        let dF = this.board.fields[destField];

        if (sF.length == 0 || 
            sF[0].color != this.turn ||
            (dF.length != 0 && sF[0].color != dF[0].color))
            return false;
        
        dF.push(sF.pop());
        return true;
    }

    getCheckerAt(fieldNo){
        if (this.isValidField(fieldNo) &&
            this.board.fields[fieldNo].length > 0){
            return this.board.fields[fieldNo][0];
        }

        return null;
    }

    checkersInField (fieldNo){
        if (this.isValidField(fieldNo))
            return this.board.checkersInField(fieldNo);
        return null;
    }
}

var g = new Game();
var selected = -1;

function getFieldForDiv(div){
    if (div.id.slice(0, 1) == "f") {
        return parseInt(div.id.slice(1), 10) - 1;
    }
    return NaN;
}

function getDivForField(fieldNo){
    if (g.isValidField(fieldNo)){
        return document.getElementById("f" + (fieldNo + 1).toString());
    }
    return null;
}

function updateDiv(div){
    let divField = getFieldForDiv(div);
    let f = g.checkersInField(divField);
    if (f.length > 0) {
        div.innerText = f.length;
    }
    else {
        div.innerText = "";
    }

    switch (f.color) {
        case CheckerColor.NONE:
            div.className = "board-field nocheckers-field";
            break;
        case CheckerColor.WHITE:
            div.className = "board-field white-field";
            break;
        case CheckerColor.BLACK:
            div.className = "board-field black-field";
            break;                        
    }
}

function selectDiv(){
    let no = getFieldForDiv(this);
    
    if (g.isValidField(no))
    {
        if (selected > -1 )
        {
            if (g.move(selected, no)) 
            {
                updateDiv(this);
                updateDiv(getDivForField(selected));
            }
            getDivForField(selected).classList.remove("field-selected");
            selected = -1;
        } 
        else
        {
            let checker = g.getCheckerAt(no);
            if (checker !== null){
                selected = no;
                this.classList.add("field-selected");
            }
        }
    }
}

function setupFieldEvents(div) 
{
    div.onclick = selectDiv;
}

window.onload = () => {
    for (let i = 1; i <= g.N_FIELDS; ++i){
        let div = document.getElementById( "f" + i.toString() );

        setupFieldEvents(div);
        updateDiv(div);
    }
};

function roll(){
    let dice = g.roll();
    console.log(dice.dice1);
    console.log(dice.dice2);
    document.getElementById("dice1").innerText = dice.dice1;
    document.getElementById("dice2").innerText = dice.dice2;
}
