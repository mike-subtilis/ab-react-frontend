import { format } from 'date-fns';

export const formatDateTimeFriendly = dt => format(dt, 'yyyy-MMM-d h:mm a');
export const formatDateTimeISO = dt => format(dt, 'yyyy-MM-ddThh:mm:ss');
