### Hooks

There are several custom hooks that are used within this application. Hooks are functional React components that allow the frontend to access different services or APIs on the backend or with our database.

There are four hooks so far:

useListen - listens for any database changes.

useListRetriever - allows list of users to be fetched from the backend.

useDelete - allows the frontend to access delete functionality on the backend.

useMobile - pre-packaged with the Next.js app, it essentially just makes viewing the app dynamic.

A potential refactor we could utilize to make this more efficient is to use Redux and RTK Query. RTK Query automates data fetching, caching, and state management. The section cards at the top of the dashboard is currently static, needs to have the page refreshed in order to update.