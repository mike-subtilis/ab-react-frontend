import { format } from 'date-fns';

export const formatDateTimeFriendly = (dt) => format(dt, 'yyyy-MMM-d h:mm a');
