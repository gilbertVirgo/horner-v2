# horner-v2

Version 2 of the Horner bible reading plan program that I wrote. This one lets you fill in your progress so that you don't skip chapters.

# Setup

I have a cron job running ./dispatch.js every day.
In the background I'm running ./server.js (using pm2).

# Testing

You can run dispatch with a `--to` argument.
I could run a dispatch test to my email only using `node ./dispatch.js --to=gilbertjvirgo@gmail.com` assuming I'm a user in the db.
