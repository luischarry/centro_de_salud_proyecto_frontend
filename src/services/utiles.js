import { decodeToken } from "react-jwt";

export const Decoder = (token) => {
    const decodedToken = decodeToken(token);
    return decodedToken;
}

export const errorCheck = (name, value) => {
    switch (name) {
        case 'first_name':
        case 'second_name':
        case 'surname':
        case 'second_surname':
            if (! /[a-z]/gi.test(value)) {
                return ("*");

            } else {
                return '';
            };

        case 'email':
            if (! /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value)) {
                return "Email in invalid format";
            } else {
                return '';
            }

        case 'phone':
            if (! /(?=.*?[0-9])/.test(value)) {
                return "*";
            } else {
                return "";
            }
        case 'dni':
            if (! /^[0-9]{8}[A-Za-z]$/.test(value)) {
                return "*";
            } else {
                return "";
            }
        case 'cipa':
            if (! /(?=.*?[0-10])/.test(value)) {
                return "*";
            } else {
                return "";
            }
        case 'password':
            if (value.length < 5) {
                return "The password is too short"
            } else {

                //Checking the password format....

                if (! /[\d()+-]/g.test(value)) {
                    return "Password in invalid format";
                } else {
                    return "";
                }
            }

        default:
            console.log("what are you sending to me????");
            break;

    }

}