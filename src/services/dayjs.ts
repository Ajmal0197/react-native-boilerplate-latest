import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

/**
 * Configured Day.js instance with essential plugins
 *
 * Lightweight (2KB) alternative to Moment.js (72KB).
 * Immutable by design.
 */
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

export default dayjs;
