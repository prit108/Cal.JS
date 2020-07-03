var num = document.querySelectorAll(".num div");//all the num buttons
var operator = document.querySelectorAll(".symbol div");//all the operator
var display = document.getElementById("display");//display div
var result = document.getElementById("equal");//equal btn
var clear = document.getElementById("clear");//clear all button
var resultDisplayed = false;//keeps the track whether the result has been displayed 

//add click listeners to the number btns
for(var i = 0 ; i < num.length ; i++)
{
    num[i].addEventListener("click", function(e)
    {
        /** if currently there is no result displayed then,
            add the pressed number to the display div
          * if the result has been displayed then,
            clear the display and then add the number to the div         
        */
       if(resultDisplayed == false)
       {
           display.innerHTML += e.target.innerHTML;
       }
       else if(lastChar == "+" || lastChar == "-" || lastChar == "×" || lastChar == "÷")
       {
           resultDisplayed = false;
           display.innerHTML += e.target.innerHTML;
       }
       else
       {
           resultDisplayed = false;
           display.innerHTML = "";
           display.innerHTML += e.target.innerHTML;
       }
    });
}

//add click listeners to the operator btns
for(var i = 0 ; i < operator.length ; i++ )
{
    operator[i].addEventListener("click", function(e)
    {
        /** if a character has been pressed then,
            replace the character with the current
          * if a character is pressed without any number,
            ignore it
          * if any of the above case has not occured
            add it to the input string
        */
        var currentString = display.innerHTML;
        var lastChar = currentString[currentString.length - 1];
        
        if(lastChar === "+" || lastChar == "-" || lastChar == "×" || lastChar == "÷")
        {
            var newString = currentString.substring(0,currentString.length - 1) + e.target.innerHTML;
            display.innerHTML = newString;
        }
        else if(currentString.length == 0)
        {
            window.alert("Enter an operand first!!");
        }
        else
        {
            display.innerHTML += e.target.innerHTML;
        }
    });
}

//when the equals btn is pressed
result.addEventListener("click", function()
{
    var inputString = display.innerHTML;
    var lastChar = inputString[inputString.length - 1];
    
    //if the last entered character was a operator ask for the missing operand
    if(lastChar === "+" || lastChar == "-" || lastChar == "×" || lastChar == "÷")
    {
        window.alert("Enter an operand after an operator!!");
    }
    else
    {
        var numbers = inputString.split(/\+|\-|\÷|\×/g);//forming an array of numbers
        var op = inputString.replace(/[0-9]|\./g, "").split("");//forming an array of operators
        console.log(numbers);
        console.log(op);

        //performing the arithmetic according to the BODMAS
        //each of these while blocks execute the operations and replaces the two operands in the numbers array with the result
        var div = op.indexOf("÷");
        while(div!=-1)
        {
            numbers.splice(div,2,numbers[div]/numbers[div+1]);
            op.splice(div,1);
            div = op.indexOf("÷");
        }
        console.log(numbers);

        var multi = op.indexOf("×");
        while(multi!=-1)
        {
            numbers.splice(multi,2,numbers[multi]*numbers[multi+1]);
            op.splice(multi,1);
            multi = op.indexOf("×");
        }
        console.log(numbers);

        var sub = op.indexOf("-");
        while(sub!=-1)
        {
             numbers.splice(sub,2,numbers[sub]-numbers[sub+1]);
             op.splice(sub,1);
            sub = op.indexOf("-");
        }
         console.log(numbers);

        var add = op.indexOf("+");
         while(add!=-1)
        {
           numbers.splice(add,2,parseFloat(numbers[add])+parseFloat(numbers[add+1]));
           op.splice(add,1);
           add = op.indexOf("+");
        }
        console.log(numbers);

        display.innerHTML = "";
        display.innerHTML = numbers[0];

        resultDisplayed = true;
    }
});

clear.addEventListener("click",function()
{
    display.innerHTML = "";
});
