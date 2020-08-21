/**
 * Created by Casimir on 27/07/2020.
 */

export class JwtResponse {
    accessToken: string;
    type: string;
    username: string;
    authorities: string[];
}