# Lookup

Types:

- <code><a href="./src/resources/lookup.ts">LookupLookupResponse</a></code>

Methods:

- <code title="get /v2/lookup/{phone_number}">client.lookup.<a href="./src/resources/lookup.ts">lookup</a>(phoneNumber, { ...params }) -> LookupLookupResponse</code>

# Transactional

Types:

- <code><a href="./src/resources/transactional.ts">TransactionalSendResponse</a></code>

Methods:

- <code title="post /v2/transactional">client.transactional.<a href="./src/resources/transactional.ts">send</a>({ ...params }) -> TransactionalSendResponse</code>

# Verification

Types:

- <code><a href="./src/resources/verification.ts">VerificationCreateResponse</a></code>
- <code><a href="./src/resources/verification.ts">VerificationCheckResponse</a></code>

Methods:

- <code title="post /v2/verification">client.verification.<a href="./src/resources/verification.ts">create</a>({ ...params }) -> VerificationCreateResponse</code>
- <code title="post /v2/verification/check">client.verification.<a href="./src/resources/verification.ts">check</a>({ ...params }) -> VerificationCheckResponse</code>

# Watch

Types:

- <code><a href="./src/resources/watch.ts">WatchPredictResponse</a></code>
- <code><a href="./src/resources/watch.ts">WatchSendEventsResponse</a></code>
- <code><a href="./src/resources/watch.ts">WatchSendFeedbacksResponse</a></code>

Methods:

- <code title="post /v2/watch/predict">client.watch.<a href="./src/resources/watch.ts">predict</a>({ ...params }) -> WatchPredictResponse</code>
- <code title="post /v2/watch/event">client.watch.<a href="./src/resources/watch.ts">sendEvents</a>({ ...params }) -> WatchSendEventsResponse</code>
- <code title="post /v2/watch/feedback">client.watch.<a href="./src/resources/watch.ts">sendFeedbacks</a>({ ...params }) -> WatchSendFeedbacksResponse</code>
