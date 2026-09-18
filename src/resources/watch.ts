// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';

/**
 * Evaluate email addresses and phone numbers for trustworthiness.
 */
export class Watch extends APIResource {
  /**
   * At signup, score the user's phone number or email address (target) as legitimate
   * or suspicious. Scoring-only — does not update counters by itself. When using
   * Feedback, call predict before verification.started on the same target (and
   * correlation_id when used) so feedback can warm Watch auth-start counters. Use
   * Events for product fraud labels; use Feedback only if you run your own phone
   * verification funnel outside Prelude Verify.
   *
   * @example
   * ```ts
   * const response = await client.watch.predict({
   *   target: { type: 'phone_number', value: '+30123456789' },
   * });
   * ```
   */
  predict(body: WatchPredictParams, options?: Core.RequestOptions): Core.APIPromise<WatchPredictResponse> {
    return this._client.post('/v2/watch/predict', { body, ...options });
  }

  /**
   * Send custom fraud signals from your application (labels and confidence levels).
   * Events capture product-specific risk patterns and are weighted when scoring
   * traffic. Use without Predict or Feedback if you only need to report product-side
   * abuse (for example account.banned). Feedback is a separate, optional endpoint
   * for self-hosted phone verification funnels.
   *
   * @example
   * ```ts
   * const response = await client.watch.sendEvents({
   *   events: [
   *     {
   *       confidence: 'maximum',
   *       label: 'account.banned',
   *       target: {
   *         type: 'phone_number',
   *         value: '+30123456789',
   *       },
   *     },
   *   ],
   * });
   * ```
   */
  sendEvents(
    body: WatchSendEventsParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<WatchSendEventsResponse> {
    return this._client.post('/v2/watch/event', { body, ...options });
  }

  /**
   * Optional. Report verification-funnel steps (verification.started,
   * verification.completed) when you run phone verification outside Prelude Verify.
   * Feeds Watch abuse-rate counters for your own flow. Call Predict on the same
   * target before verification.started and reuse metadata.correlation_id so
   * auth-start counters receive predict signals; without a linked predict, only
   * attempt-rate counters update on started. Not required if you only use Events
   * and/or Predict, or if Verify already handles verification for that traffic.
   *
   * @example
   * ```ts
   * const response = await client.watch.sendFeedbacks({
   *   feedbacks: [
   *     {
   *       target: {
   *         type: 'phone_number',
   *         value: '+30123456789',
   *       },
   *       type: 'verification.started',
   *     },
   *   ],
   * });
   * ```
   */
  sendFeedbacks(
    body: WatchSendFeedbacksParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<WatchSendFeedbacksResponse> {
    return this._client.post('/v2/watch/feedback', { body, ...options });
  }
}

export interface WatchPredictResponse {
  /**
   * The prediction identifier.
   */
  id: string;

  /**
   * The prediction outcome.
   */
  prediction: 'legitimate' | 'suspicious';

  /**
   * A string that identifies this specific request. Report it back to us to help us
   * diagnose your issues.
   */
  request_id: string;

  /**
   * The risk factors that contributed to the suspicious prediction. Only present
   * when prediction is "suspicious" and the anti-fraud system detected specific risk
   * signals.
   *
   * - `account_risk_profile` - The target matches a risk profile derived from the
   *   outcomes reported on your own account, rather than from a signal shared across
   *   accounts.
   * - `behavioral_pattern` - The phone number past behavior during verification
   *   flows exhibits suspicious patterns.
   * - `device_attribute` - The device exhibits characteristics associated with
   *   suspicious activity patterns.
   * - `fraud_database` - The phone number has been flagged as suspicious in one or
   *   more of our fraud databases.
   * - `location_discrepancy` - The phone number prefix and IP address discrepancy
   *   indicates potential fraud.
   * - `network_fingerprint` - The network connection exhibits characteristics
   *   associated with suspicious activity patterns.
   * - `poor_conversion_history` - The phone number has a history of poorly
   *   converting to a verified phone number.
   * - `prefix_concentration` - The phone number is part of a range known to be
   *   associated with suspicious activity patterns.
   * - `suspected_request_tampering` - The SDK signature is invalid and the request
   *   is considered to be tampered with.
   * - `suspicious_ip_address` - The IP address is deemed to be associated with
   *   suspicious activity patterns.
   * - `temporary_phone_number` - The phone number is known to be a temporary or
   *   disposable number.
   */
  risk_factors?: Array<
    | 'account_risk_profile'
    | 'behavioral_pattern'
    | 'device_attribute'
    | 'fraud_database'
    | 'location_discrepancy'
    | 'network_fingerprint'
    | 'poor_conversion_history'
    | 'prefix_concentration'
    | 'suspected_request_tampering'
    | 'suspicious_ip_address'
    | 'temporary_phone_number'
  >;
}

export interface WatchSendEventsResponse {
  /**
   * A string that identifies this specific request. Report it back to us to help us
   * diagnose your issues.
   */
  request_id: string;

  /**
   * The status of the events dispatch.
   */
  status: 'success';
}

export interface WatchSendFeedbacksResponse {
  /**
   * A string that identifies this specific request. Report it back to us to help us
   * diagnose your issues.
   */
  request_id: string;

  /**
   * The status of the feedbacks sending.
   */
  status: 'success';
}

export interface WatchPredictParams {
  /**
   * The signup identifier to score — a phone number or email address.
   */
  target: WatchPredictParams.Target;

  /**
   * The identifier of the dispatch that came from the front-end SDK.
   */
  dispatch_id?: string;

  /**
   * The metadata for this prediction.
   */
  metadata?: WatchPredictParams.Metadata;

  /**
   * The signals used for anti-fraud. For more details, refer to
   * [Signals](/verify/v2/documentation/prevent-fraud#signals).
   */
  signals?: WatchPredictParams.Signals;
}

export namespace WatchPredictParams {
  /**
   * The signup identifier to score — a phone number or email address.
   */
  export interface Target {
    /**
     * The type of the target. Either "phone_number" or "email_address".
     */
    type: 'phone_number' | 'email_address';

    /**
     * An E.164 formatted phone number or an email address.
     */
    value: string;
  }

  /**
   * The metadata for this prediction.
   */
  export interface Metadata {
    /**
     * A user-defined identifier to correlate this prediction with. It is returned in
     * the response and any webhook events that refer to this prediction.
     */
    correlation_id?: string;
  }

  /**
   * The signals used for anti-fraud. For more details, refer to
   * [Signals](/verify/v2/documentation/prevent-fraud#signals).
   */
  export interface Signals {
    /**
     * The version of your application.
     */
    app_version?: string;

    /**
     * A unique ID for the user's device. You should ensure that each user device has a
     * unique `device_id` value. Ideally, for Android, this corresponds to the
     * `ANDROID_ID` and for iOS, this corresponds to the `identifierForVendor`.
     */
    device_id?: string;

    /**
     * The model of the user's device.
     */
    device_model?: string;

    /**
     * The type of the user's device.
     */
    device_platform?: 'android' | 'ios' | 'ipados' | 'tvos' | 'web';

    /**
     * Whether the end-user already exists in your system, for example an existing
     * account signing in again rather than a first-time signup. Unlike
     * `is_trusted_user`, this signal does not bypass fraud checks; it is taken into
     * account as one additional anti-fraud signal. For more details, refer to
     * [Signals](/verify/v2/documentation/prevent-fraud#signals).
     */
    existing_user?: boolean;

    /**
     * The public IP v4 or v6 address of the end-user's device. You should collect this
     * from your backend. If your backend is behind a proxy, use the `X-Forwarded-For`,
     * `Forwarded`, `True-Client-IP`, `CF-Connecting-IP` or an equivalent header to get
     * the actual public IP of the end-user's device.
     */
    ip?: string;

    /**
     * This signal should indicate a higher level of trust, explicitly stating that the
     * user is genuine. Contact us to discuss your use case. For more details, refer to
     * [Signals](/verify/v2/documentation/prevent-fraud#signals).
     */
    is_trusted_user?: boolean;

    /**
     * The JA4 fingerprint observed for the end-user's connection. Prelude will infer
     * it automatically when you use our Frontend SDKs (which use Prelude's edge
     * network), but you can also forward the value if you terminate TLS yourself.
     */
    ja4_fingerprint?: string;

    /**
     * The version of the user's device operating system.
     */
    os_version?: string;

    /**
     * The user agent of the user's device. If the individual fields (os_version,
     * device_platform, device_model) are provided, we will prioritize those values
     * instead of parsing them from the user agent string.
     */
    user_agent?: string;
  }
}

export interface WatchSendEventsParams {
  /**
   * A list of events to dispatch. A maximum of 100 events can be sent in a single
   * request.
   */
  events: Array<WatchSendEventsParams.Event>;
}

export namespace WatchSendEventsParams {
  export interface Event {
    /**
     * How much this event tells us to trust the end-user's legitimacy — not how
     * certain you are that the event occurred. In increasing order of trust:
     * `minimum`, `low`, `neutral`, `high`, `maximum`.
     *
     * Use `minimum` for an event tied to a user you trust the least to be legitimate
     * (e.g. a `payment.chargeback`), and `maximum` for an event tied to a highly
     * trustworthy user (e.g. a confirmed 3DS payment). Prelude weights these signals
     * when scoring traffic: it filters out users tied to low-confidence events while
     * preserving the experience for users tied to high-confidence ones.
     */
    confidence: 'maximum' | 'high' | 'neutral' | 'low' | 'minimum';

    /**
     * A label to describe what the event refers to.
     */
    label: string;

    /**
     * The event target. Only supports phone numbers for now.
     */
    target: Event.Target;
  }

  export namespace Event {
    /**
     * The event target. Only supports phone numbers for now.
     */
    export interface Target {
      /**
       * The type of the target. Either "phone_number" or "email_address".
       */
      type: 'phone_number' | 'email_address';

      /**
       * An E.164 formatted phone number or an email address.
       */
      value: string;
    }
  }
}

export interface WatchSendFeedbacksParams {
  /**
   * A list of feedbacks to send. A maximum of 100 feedbacks can be sent in a single
   * request.
   */
  feedbacks: Array<WatchSendFeedbacksParams.Feedback>;
}

export namespace WatchSendFeedbacksParams {
  export interface Feedback {
    /**
     * The feedback target. Only supports phone numbers for now.
     */
    target: Feedback.Target;

    /**
     * The type of feedback.
     */
    type: 'verification.started' | 'verification.completed';

    /**
     * The metadata for this feedback.
     */
    metadata?: Feedback.Metadata;
  }

  export namespace Feedback {
    /**
     * The feedback target. Only supports phone numbers for now.
     */
    export interface Target {
      /**
       * The type of the target. Either "phone_number" or "email_address".
       */
      type: 'phone_number' | 'email_address';

      /**
       * An E.164 formatted phone number or an email address.
       */
      value: string;
    }

    /**
     * The metadata for this feedback.
     */
    export interface Metadata {
      /**
       * A user-defined identifier to correlate this feedback with. It is returned in the
       * response and any webhook events that refer to this feedback.
       */
      correlation_id?: string;
    }
  }
}

export declare namespace Watch {
  export {
    type WatchPredictResponse as WatchPredictResponse,
    type WatchSendEventsResponse as WatchSendEventsResponse,
    type WatchSendFeedbacksResponse as WatchSendFeedbacksResponse,
    type WatchPredictParams as WatchPredictParams,
    type WatchSendEventsParams as WatchSendEventsParams,
    type WatchSendFeedbacksParams as WatchSendFeedbacksParams,
  };
}
