import { Account, Bank } from "./bank"

const readline = require("readline-sync");

let TDBank = new Bank("3824974", "Richmond, BC");

let JacksAccount = new Account("jackboeri", "password", 12000);

let NataliasAccount = new Account("natalia", "password", 6500);

TDBank.addUser(JacksAccount);
TDBank.addUser(NataliasAccount);


const successfulLogin = (username:string) => {
    console.log("Welcome, " + username);
    return username;
}

let choice = 0;
let username: string , password: string;
let currentUser: string = "";
let currentAccount: Account;
let notLoggedIn: boolean = currentUser === "";
let loggedIn: boolean = currentUser.length > 0;
let amount: number;

while (true) {

    notLoggedIn = currentUser === "";
    loggedIn = currentUser.length > 0;

    if(loggedIn) {
        choice = readline.question("\nWelcome, " + currentUser + "!\n\t0. View your balance\n\t1. Deposit\n\t2. Withdraw\n\t3. Log out");
        
    } else if(notLoggedIn) {
        choice = readline.question("\nWelcome to the Bank UI\n\t1. Login to Bank Account\n\t2. List Bank Accounts");

    }

    if(notLoggedIn) {
        
        if (choice == 1) {
            username = readline.question("Username: ");
            password = readline.question("Password: ");
            TDBank.login(username, password) ? currentUser = successfulLogin(username) : console.log("Login failed");
        } else if(choice == 2) {
            console.log(TDBank.getBankUsersList());
        }
    } else if (loggedIn) {
        currentAccount = TDBank.getAccount(currentUser);
        if(choice == 0) {
            console.log(currentAccount.getBalance());
        } else if (choice == 1) {
            // Deposit
            amount = readline.questionInt("Deposit - Amount: ");
            currentAccount.deposit(amount);
        } else if(choice == 2) {
            // Withdraw
            amount = readline.questionInt("Withdraw - Amount: ");
            currentAccount.withdraw(amount);
        } else if(choice == 3) {
            // Log out
            currentUser = "";
        }
    }
} 