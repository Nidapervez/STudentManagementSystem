#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
console.log(chalk.bgMagenta("*************************WELCOME TO STUDENT MANAGEMENT SYSTEM*************"));
const studentID = Math.floor(1000 + Math.random() * 8000);
let mybalance = 10000;
function getTuitionFee(subjectName) {
    let Course;
    (function (Course) {
        Course[Course["Physics"] = 3000] = "Physics";
        Course[Course["Maths"] = 4000] = "Maths";
        Course[Course["ComputerScience"] = 5000] = "ComputerScience";
        Course[Course["IT"] = 6000] = "IT";
    })(Course || (Course = {}));
    return Course[subjectName];
}
let answers = await inquirer.prompt([
    {
        name: "name",
        type: "input",
        message: "What is your name?",
        validate: function (value) {
            if (value.trim() !== "") {
                return true;
            }
            return "Please enter student name";
        }
    },
    {
        name: "subjectname",
        type: "list",
        message: "In which Subject You want to enroll",
        choices: ["Physics", "Maths", "ComputerScience", "IT"]
    }
]);
console.log(chalk.bgBlueBright(`\nYour Tuition Fee of selected subject is: ${getTuitionFee(answers.subjectname)} /-`));
console.log(chalk.bgCyanBright(`\n Your Account Balance is ${mybalance}`));
console.log(chalk.bgMagenta("************Enter Your Payment Information************"));
let paymentType = await inquirer.prompt([
    {
        name: "payment",
        type: "list",
        message: "Select payment type: ",
        choices: ["JazzCash", "Bank Transfer", "EasyPaisa"]
    },
    {
        name: "amount",
        type: "input",
        message: "Enter amount: ",
        validate: function (value) {
            if (value.trim() !== "") {
                return true;
            }
            return "Please enter a amount";
        }
    }
]);
console.log(chalk.bgMagenta(`\nYou have selected payment method ${paymentType.payment}`));
let payment1 = parseInt(paymentType.amount);
let tuitionfee = getTuitionFee(answers.subjectname);
if (payment1 >= tuitionfee) {
    console.log(chalk.bgWhite(`*************Congratulations. Your fees have been Paid***********\nYou have Successfully enrolled in ${answers.subjectname}`));
    let ans = await inquirer.prompt([
        {
            name: "select",
            type: "list",
            message: "What would you like to do next?",
            choices: ["View Status", "Exit"]
        }
    ]);
    if (ans.select === "View Status") {
        console.log(chalk.blueBright("********* Status***********\n"));
        console.log(`Student Name: ${answers.name}`);
        console.log(`Student ID: ${studentID}`);
        console.log(`Course Name: ${answers.subjectname}`);
        console.log(`Tuition Fees Paid: ${payment1}`);
        console.log(`Balance: ${mybalance -= payment1}`);
    }
    else {
        console.log(chalk.yellowBright(`\nExiting Student Management System`));
    }
}
else {
    console.log(chalk.redBright(`\nInvalid amount. Payment should be equal to or greater than the tuition fee`));
}
