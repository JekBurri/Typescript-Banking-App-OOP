//Bank deposits/Withdraws using Encapsulation

const readline = require("readline-sync");

class Bank {
    private bankName: string;
    private location: string;
    private users: Account[];
    static unique: number = 0;

    public constructor(bankName:string, location:string) {
        this.bankName = bankName;
        this.location = location;
        this.users = [];
        Bank.unique++;
    }

    public addUser(user:Account) {
        this.users.push(user);
    }

    public removeUser(ID:number):Account[] { //remove by username
        for(let i=0;i<=this.users.length;i++) {
            if(this.users[i].ID == ID) {
                this.users.splice(i,1);
            }
        }
        Bank.unique--;
        return this.users;
    }

    public getBankUsersList():Account[] {
        return this.users;
    }

    public getBankUsersCount():number {
        return Bank.unique;
    }

    public login(username:string, password:string):boolean {
        // find user Account
        for(let i=0;i<=this.users.length;i++) {
            if(this.users[i].getUsername() == username) {
                if(this.users[i].getPassword() == password) {
                    return true;
                }
            }
        }
        return false;
        // once loggged in, you have authorization boolean : true
    }

    public getAccount(username:string):Account {
        for(let i=0;i<this.users.length;i++) {
            if(this.users[i].getUsername()==username) {
                return this.users[i];
            }

        }
        throw new Error(`Account with username '${username}' not found.`);
    }
    
}

class Account {
    static deposit(d: number) {
        throw new Error("Method not implemented.");
    }
    static withdraw(w: number) {
        throw new Error("Method not implemented.");
    }
    static getBalance() {
        throw new Error("Method not implemented.");
    }
    
    private _username: string;
    private _password: string;
    static counter: number = 0;
    public ID: number = 100000; 
    private balance: number = 100;
    static unique: number = 0;

    public getUnique():number {
        return Account.unique;
    }

    public constructor(user:string, pass:string, balance:number) {
        this._username = this.setUsername(user);
        this._password = this.setPassword(pass);
        Account.counter++;
        this.ID = this.ID + Account.counter;
        this.balance = this.deposit(this.balance + balance);
        Account.unique++;
    }

    public deposit(amount: number):number {
        amount > 0 ? this.balance += amount : console.log("You cannot deposit negative values");
        return this.balance;
    }

    public withdraw(amount:number):void {
        amount <= this.balance ? this.balance -= amount : console.log("Sorry, this user does not have enough funds.");
    }

    public getBalance():number {
        return this.balance;
    }

    public setUsername(username:string):string {
        if(username.length >= 5) {
            this._username = username;
        } else {
            console.log("Sorry " + this._username + ", you need a minimum of 5 characters for your username");
        }
        return username;
    }

    public setPassword(password:string):string {
        if(password.length >= 8) {
            this._password = password;
        } else {
            console.log("Sorry " + this._username + ", you need a minimum of 8 characters for your password");
        }
        return password;
    }

    public getUsername():string {
        return this._username;
    }

    public getPassword():string {
        return this._password;
    }

   
}

export { Bank, Account };








