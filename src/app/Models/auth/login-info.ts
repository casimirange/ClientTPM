/**
 * Created by Casimir on 27/07/2020.
 */

export class AuthLoginInfo {
    username: string;
    password: string;

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }
}