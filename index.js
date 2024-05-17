import inquirer from "inquirer";
import chalk from "chalk";
import say from "say";
(async () => {
    let selectDate;
    let isSlectDate = true;
    let slectDat = new Date();
    while (isSlectDate) {
        selectDate = await inquirer.prompt([
            { name: "year", message: "Enter a Year", type: "number" },
            { name: "month", message: "Enter a Month (1-12)", type: "number" },
            { name: "date", message: "Enter a Date", type: "number" },
        ]);
        if (!selectDate.year || !selectDate.month || !selectDate.date) {
            console.log(chalk.red("\n \t Please Fill the Input and Enter only Number \n"));
        }
        else if (selectDate.year < slectDat.getFullYear() || selectDate.month < slectDat.getMonth() || selectDate.date <= slectDat.getDate()) {
            console.log(chalk.red("\n\tThe selected year or month or date has already passed. Please choose a future date\n"));
        }
        else {
            isSlectDate = false;
        }
        ;
    }
    ;
    isSlectDate = true;
    let customMssage;
    while (isSlectDate) {
        customMssage = await inquirer.prompt([
            { name: "userMessage", message: "Enter Your Message:", type: "string" },
        ]);
        if (!customMssage.userMessage) {
            console.log(chalk.red("\n\tPlease Enter a Message\n"));
        }
        else {
            isSlectDate = false;
        }
        ;
    }
    ;
    // Set Date
    let setDate = new Date(selectDate.year, selectDate.month - 1, selectDate.date);
    let timer = setInterval(funcTimer, 1000);
    function funcTimer() {
        let ourDate = new Date();
        //Time Difference
        let timeDiff = setDate.getTime() - ourDate.getTime();
        //check if time equal to 0
        if (timeDiff <= 0) {
            clearInterval(timer);
            console.log(chalk.red(`\n \t${customMssage.userMessage}\n`));
            say.speak(customMssage.userMessage);
            return;
        }
        ;
        let convDay = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        let convHour = Math.floor(timeDiff % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
        let convMin = Math.floor(timeDiff % (1000 * 60 * 60) / (1000 * 60));
        let convSec = Math.floor(timeDiff % (1000 * 60) / 1000);
        console.clear();
        console.log(chalk.greenBright("\n \t Remaining Days For New Year \n"));
        console.log(chalk.greenBright(`\t ${chalk.italic(convDay)} Days , ${chalk.italic(convHour)} Hours , ${chalk.italic(convMin)} Min , ${chalk.italic(convSec)} Sec. \n`));
    }
    ;
})();
