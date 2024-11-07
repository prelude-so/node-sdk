# Authentication

Types:

- <code><a href="./src/resources/authentication/authentication.ts">AuthenticationCreateResponse</a></code>
- <code><a href="./src/resources/authentication/authentication.ts">AuthenticationRetrieveResponse</a></code>

Methods:

- <code title="post /authentication">client.authentication.<a href="./src/resources/authentication/authentication.ts">create</a>({ ...params }) -> AuthenticationCreateResponse</code>
- <code title="get /authentication/{auth_uuid}">client.authentication.<a href="./src/resources/authentication/authentication.ts">retrieve</a>(authUuid) -> AuthenticationRetrieveResponse</code>

## Feedback

Types:

- <code><a href="./src/resources/authentication/feedback.ts">FeedbackCreateResponse</a></code>

Methods:

- <code title="post /authentication/feedback">client.authentication.feedback.<a href="./src/resources/authentication/feedback.ts">create</a>({ ...params }) -> FeedbackCreateResponse</code>

# Check

Types:

- <code><a href="./src/resources/check.ts">CheckCreateResponse</a></code>

Methods:

- <code title="post /check">client.check.<a href="./src/resources/check.ts">create</a>({ ...params }) -> CheckCreateResponse</code>

# Retry

Types:

- <code><a href="./src/resources/retry.ts">RetryCreateResponse</a></code>

Methods:

- <code title="post /retry">client.retry.<a href="./src/resources/retry.ts">create</a>({ ...params }) -> RetryCreateResponse</code>

# Lookup

Types:

- <code><a href="./src/resources/lookup.ts">LookupRetrieveResponse</a></code>

Methods:

- <code title="get /lookup/{phone_number}">client.lookup.<a href="./src/resources/lookup.ts">retrieve</a>(phoneNumber, { ...params }) -> LookupRetrieveResponse</code>
