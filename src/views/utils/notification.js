import { NotificationManager } from 'react-notifications';

const createNotification = (type, message, category, time=2000) => {
    switch (type) {
        case 'info':
            NotificationManager.info(message, category, time);
            break;
        case 'success':
            NotificationManager.success(message, category, time);
            break;
        case 'warning':
            NotificationManager.warning(message, category, time);
            break;
        case 'error':
            NotificationManager.error(message, category, time);
            break;
        default:
            break;
    }
};

export default createNotification