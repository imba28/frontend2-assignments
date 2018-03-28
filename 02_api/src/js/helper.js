import moment from 'moment';

export function dateFormat(input, args) {
    const date = moment(input);
    const {format = "d.m.Y"} = args.hash;
    return date.format(format);
}

export function getAge(input) {
    return moment().diff(input, 'years');
}

export function ordinal(input) {
    input = parseInt(input, 10);
    let suffix = '';
    if (input == 1) {
        suffix = 'st';
    } else if(input == 2) {
        suffix = 'nd'
    } else if(input == 3) {
        suffix = 'rd';
    } else {
        suffix = 'th';
    }

    return input + suffix;
}