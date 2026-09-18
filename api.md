# Shared

Types:

- <code><a href="./src/resources/shared.ts">Signals</a></code>
- <code><a href="./src/resources/shared.ts">Target</a></code>

# Lookup

Types:

- <code><a href="./src/resources/lookup.ts">LookupLookupResponse</a></code>

Methods:

- <code title="get /v2/lookup/{phone_number}">client.lookup.<a href="./src/resources/lookup.ts">lookup</a>(phoneNumber, { ...params }) -> LookupLookupResponse</code>

# Notify

Types:

- <code><a href="./src/resources/notify.ts">NotifyGetSubscriptionConfigResponse</a></code>
- <code><a href="./src/resources/notify.ts">NotifyGetSubscriptionPhoneNumberResponse</a></code>
- <code><a href="./src/resources/notify.ts">NotifyListSubscriptionConfigsResponse</a></code>
- <code><a href="./src/resources/notify.ts">NotifyListSubscriptionPhoneNumberEventsResponse</a></code>
- <code><a href="./src/resources/notify.ts">NotifyListSubscriptionPhoneNumbersResponse</a></code>
- <code><a href="./src/resources/notify.ts">NotifyReplyResponse</a></code>
- <code><a href="./src/resources/notify.ts">NotifySendResponse</a></code>
- <code><a href="./src/resources/notify.ts">NotifySendBatchResponse</a></code>

Methods:

- <code title="get /v2/notify/management/subscriptions/{config_id}">client.notify.<a href="./src/resources/notify.ts">getSubscriptionConfig</a>(configId) -> NotifyGetSubscriptionConfigResponse</code>
- <code title="get /v2/notify/management/subscriptions/{config_id}/phone_numbers/{phone_number}">client.notify.<a href="./src/resources/notify.ts">getSubscriptionPhoneNumber</a>(configId, phoneNumber) -> NotifyGetSubscriptionPhoneNumberResponse</code>
- <code title="get /v2/notify/management/subscriptions">client.notify.<a href="./src/resources/notify.ts">listSubscriptionConfigs</a>({ ...params }) -> NotifyListSubscriptionConfigsResponse</code>
- <code title="get /v2/notify/management/subscriptions/{config_id}/phone_numbers/{phone_number}/events">client.notify.<a href="./src/resources/notify.ts">listSubscriptionPhoneNumberEvents</a>(configId, phoneNumber, { ...params }) -> NotifyListSubscriptionPhoneNumberEventsResponse</code>
- <code title="get /v2/notify/management/subscriptions/{config_id}/phone_numbers">client.notify.<a href="./src/resources/notify.ts">listSubscriptionPhoneNumbers</a>(configId, { ...params }) -> NotifyListSubscriptionPhoneNumbersResponse</code>
- <code title="post /v2/notify/reply">client.notify.<a href="./src/resources/notify.ts">reply</a>({ ...params }) -> NotifyReplyResponse</code>
- <code title="post /v2/notify">client.notify.<a href="./src/resources/notify.ts">send</a>({ ...params }) -> NotifySendResponse</code>
- <code title="post /v2/notify/batch">client.notify.<a href="./src/resources/notify.ts">sendBatch</a>({ ...params }) -> NotifySendBatchResponse</code>

# Transactional

Types:

- <code><a href="./src/resources/transactional.ts">TransactionalSendResponse</a></code>

Methods:

- <code title="post /v2/transactional">client.transactional.<a href="./src/resources/transactional.ts">send</a>({ ...params }) -> TransactionalSendResponse</code>

# Verification

Types:

- <code><a href="./src/resources/verification/verification.ts">VerificationCreateResponse</a></code>
- <code><a href="./src/resources/verification/verification.ts">VerificationCheckResponse</a></code>

Methods:

- <code title="post /v2/verification">client.verification.<a href="./src/resources/verification/verification.ts">create</a>({ ...params }) -> VerificationCreateResponse</code>
- <code title="post /v2/verification/check">client.verification.<a href="./src/resources/verification/verification.ts">check</a>({ ...params }) -> VerificationCheckResponse</code>

## Phone

### History

Types:

- <code><a href="./src/resources/verification/phone/history.ts">PhoneVerificationCarrier</a></code>
- <code><a href="./src/resources/verification/phone/history.ts">PhoneVerificationMoney</a></code>
- <code><a href="./src/resources/verification/phone/history.ts">PhoneVerificationPsd2Transaction</a></code>
- <code><a href="./src/resources/verification/phone/history.ts">HistoryRetrieveResponse</a></code>
- <code><a href="./src/resources/verification/phone/history.ts">HistoryListResponse</a></code>

Methods:

- <code title="get /v2/verification/phone/history/{id}">client.verification.phone.history.<a href="./src/resources/verification/phone/history.ts">retrieve</a>(id) -> HistoryRetrieveResponse</code>
- <code title="get /v2/verification/phone/history">client.verification.phone.history.<a href="./src/resources/verification/phone/history.ts">list</a>({ ...params }) -> HistoryListResponse</code>

# VerificationManagement

Types:

- <code><a href="./src/resources/verification-management/verification-management.ts">VerificationManagementDeletePhoneNumberResponse</a></code>
- <code><a href="./src/resources/verification-management/verification-management.ts">VerificationManagementListPhoneNumbersResponse</a></code>
- <code><a href="./src/resources/verification-management/verification-management.ts">VerificationManagementListSenderIDsResponse</a></code>
- <code><a href="./src/resources/verification-management/verification-management.ts">VerificationManagementSetPhoneNumberResponse</a></code>
- <code><a href="./src/resources/verification-management/verification-management.ts">VerificationManagementSubmitSenderIDResponse</a></code>

Methods:

- <code title="delete /v2/verification/management/phone-numbers/{action}">client.verificationManagement.<a href="./src/resources/verification-management/verification-management.ts">deletePhoneNumber</a>(action, { ...params }) -> VerificationManagementDeletePhoneNumberResponse</code>
- <code title="get /v2/verification/management/phone-numbers/{action}">client.verificationManagement.<a href="./src/resources/verification-management/verification-management.ts">listPhoneNumbers</a>(action) -> VerificationManagementListPhoneNumbersResponse</code>
- <code title="get /v2/verification/management/sender-id">client.verificationManagement.<a href="./src/resources/verification-management/verification-management.ts">listSenderIds</a>() -> VerificationManagementListSenderIDsResponse</code>
- <code title="post /v2/verification/management/phone-numbers/{action}">client.verificationManagement.<a href="./src/resources/verification-management/verification-management.ts">setPhoneNumber</a>(action, { ...params }) -> VerificationManagementSetPhoneNumberResponse</code>
- <code title="post /v2/verification/management/sender-id">client.verificationManagement.<a href="./src/resources/verification-management/verification-management.ts">submitSenderId</a>({ ...params }) -> VerificationManagementSubmitSenderIDResponse</code>

## Sandbox

Types:

- <code><a href="./src/resources/verification-management/sandbox.ts">SandboxAddPhoneNumberResponse</a></code>
- <code><a href="./src/resources/verification-management/sandbox.ts">SandboxDeletePhoneNumberResponse</a></code>
- <code><a href="./src/resources/verification-management/sandbox.ts">SandboxListPhoneNumbersResponse</a></code>

Methods:

- <code title="put /v2/verification/management/phone-numbers/sandbox">client.verificationManagement.sandbox.<a href="./src/resources/verification-management/sandbox.ts">addPhoneNumber</a>({ ...params }) -> SandboxAddPhoneNumberResponse</code>
- <code title="delete /v2/verification/management/phone-numbers/sandbox/{phone_number}">client.verificationManagement.sandbox.<a href="./src/resources/verification-management/sandbox.ts">deletePhoneNumber</a>(phoneNumber) -> SandboxDeletePhoneNumberResponse</code>
- <code title="get /v2/verification/management/phone-numbers/sandbox">client.verificationManagement.sandbox.<a href="./src/resources/verification-management/sandbox.ts">listPhoneNumbers</a>() -> SandboxListPhoneNumbersResponse</code>

# Watch

Types:

- <code><a href="./src/resources/watch.ts">WatchEvaluateResponse</a></code>
- <code><a href="./src/resources/watch.ts">WatchPredictResponse</a></code>
- <code><a href="./src/resources/watch.ts">WatchSendEventsResponse</a></code>
- <code><a href="./src/resources/watch.ts">WatchSendFeedbacksResponse</a></code>

Methods:

- <code title="post /v2/watch/eval">client.watch.<a href="./src/resources/watch.ts">evaluate</a>({ ...params }) -> WatchEvaluateResponse</code>
- <code title="post /v2/watch/predict">client.watch.<a href="./src/resources/watch.ts">predict</a>({ ...params }) -> WatchPredictResponse</code>
- <code title="post /v2/watch/event">client.watch.<a href="./src/resources/watch.ts">sendEvents</a>({ ...params }) -> WatchSendEventsResponse</code>
- <code title="post /v2/watch/feedback">client.watch.<a href="./src/resources/watch.ts">sendFeedbacks</a>({ ...params }) -> WatchSendFeedbacksResponse</code>

# Intel

## KYC

Types:

- <code><a href="./src/resources/intel/kyc.ts">KYCMatchResponse</a></code>

Methods:

- <code title="post /v2/intel/kyc/match/{phone}">client.intel.kyc.<a href="./src/resources/intel/kyc.ts">match</a>(phone, { ...params }) -> KYCMatchResponse</code>
