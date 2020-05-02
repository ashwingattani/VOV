import {Toast} from 'native-base';

export function camelize(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
    if (+match === 0) return ''; // or if (/\s+/.test(match)) for white spaces
    return index === 0 ? match.toLowerCase() : match.toUpperCase();
  });
}

export function showToast(message, status, onClose = () => {}) {
  Toast.show({
    text: message,
    position: 'bottom',
    type: status,
    duration: 5000,
    onClose: onClose,
  });
}
