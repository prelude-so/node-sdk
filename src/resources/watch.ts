// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';

export class Watch extends APIResource {
  /**
   * Predict the outcome of a verification based on Prelude’s anti-fraud system.
   */
  predict(body: WatchPredictParams, options?: Core.RequestOptions): Core.APIPromise<WatchPredictResponse> {
    return this._client.post('/v2/watch/predict', { body, ...options });
  }

  /**
   * Send real-time event data from end-user interactions within your application.
   * Events will be analyzed for proactive fraud prevention and risk scoring.
   */
  sendEvents(
    body: WatchSendEventsParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<WatchSendEventsResponse> {
    return this._client.post('/v2/watch/event', { body, ...options });
  }

  /**
   * Send feedback regarding your end-users verification funnel. Events will be
   * analyzed for proactive fraud prevention and risk scoring.
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
   * The prediction target. Only supports phone numbers for now.
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
   * The prediction target. Only supports phone numbers for now.
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
     * A user-defined identifier to correlate this prediction with.
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
     * The unique identifier for the user's device. For Android, this corresponds to
     * the `ANDROID_ID` and for iOS, this corresponds to the `identifierForVendor`.
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
     * The IP address of the user's device.
     */
    ip?: string;

    /**
     * This signal should provide a higher level of trust, indicating that the user is
     * genuine. For more details, refer to
     * [Signals](/verify/v2/documentation/prevent-fraud#signals).
     */
    is_trusted_user?: boolean;

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
   * A list of events to dispatch.
   */
  events: Array<WatchSendEventsParams.Event>;
}

export namespace WatchSendEventsParams {
  export interface Event {
    /**
     * A confidence level you want to assign to the event.
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
   * A list of feedbacks to send.
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
     * The identifier of the dispatch that came from the front-end SDK.
     */
    dispatch_id?: string;

    /**
     * The metadata for this feedback.
     */
    metadata?: Feedback.Metadata;

    /**
     * The signals used for anti-fraud. For more details, refer to
     * [Signals](/verify/v2/documentation/prevent-fraud#signals).
     */
    signals?: Feedback.Signals;
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
       * A user-defined identifier to correlate this feedback with.
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
       * The unique identifier for the user's device. For Android, this corresponds to
       * the `ANDROID_ID` and for iOS, this corresponds to the `identifierForVendor`.
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
       * The IP address of the user's device.
       */
      ip?: string;

      /**
       * This signal should provide a higher level of trust, indicating that the user is
       * genuine. For more details, refer to
       * [Signals](/verify/v2/documentation/prevent-fraud#signals).
       */
      is_trusted_user?: boolean;

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
