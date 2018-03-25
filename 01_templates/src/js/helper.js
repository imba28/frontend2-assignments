import moment from 'moment';

export function dateFormat(input, args) {
    const date = moment(input);
    const {format = "d.m.Y"} = args;

    return date.format(format);
}

export function getAge(input) {
    return moment().diff(input, 'years');
}