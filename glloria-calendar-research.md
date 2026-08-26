# Google Calendar Integration Notes

Google Calendar's FreeBusy endpoint accepts a POST request to `https://www.googleapis.com/calendar/v3/freeBusy` and returns busy intervals for one or more calendars. It accepts RFC3339 `timeMin` and `timeMax`, an IANA `timeZone`, and calendar IDs. Relevant documented scopes include `https://www.googleapis.com/auth/calendar.readonly`, `https://www.googleapis.com/auth/calendar.events.freebusy`, and `https://www.googleapis.com/auth/calendar.freebusy`.

Creating an event uses the authorized `events.insert` operation for a calendar, with required start and exclusive end values. Timed events should use RFC3339 date-time values with a time-zone offset or an explicit IANA time zone. The documented event-creation scopes include `https://www.googleapis.com/auth/calendar.events` and `https://www.googleapis.com/auth/calendar`. The website should not create a calendar event until the requested slot has been checked and the user has explicitly submitted the booking form.

Google recommends requesting the narrowest OAuth scopes necessary and configuring the OAuth consent screen. For this site, the least-privilege design is to check availability and create consultation events on the owner's primary calendar, while storing only the resulting event ID and appointment status in the website database.

The session's Google Calendar connector is enabled for the account `fatmanour048@gmail.com`. A read-only availability check for 2026-08-27 through 2026-09-03 returned one all-day event, `عيد ميلاد "بابا نور"`, from 2026-08-30 through 2026-08-31. No event was created during this check.

## Sources

1. https://developers.google.com/calendar/api/v3/reference/freebusy/query
2. https://developers.google.com/calendar/api/v3/reference/events/insert
3. https://developers.google.com/calendar/api/guides/auth
