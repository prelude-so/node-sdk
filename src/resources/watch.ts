// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';

export class Watch extends APIResource {
  /**
   * Once the user with a trustworthy phone number demonstrates authentic behavior,
   * call this endpoint to report their authenticity to our systems.
   */
  feedBack(body: WatchFeedBackParams, options?: Core.RequestOptions): Core.APIPromise<WatchFeedBackResponse> {
    return this._client.post('/v2/watch/feedback', { body, ...options });
  }

  /**
   * Identify trustworthy phone numbers to mitigate fake traffic or traffic involved
   * in fraud and international revenue share fraud (IRSF) patterns. This endpoint
   * must be implemented in conjunction with the `watch/feedback` endpoint.
   */
  predict(body: WatchPredictParams, options?: Core.RequestOptions): Core.APIPromise<WatchPredictResponse> {
    return this._client.post('/v2/watch/predict', { body, ...options });
  }
}

export interface WatchFeedBackResponse {
  /**
   * A unique identifier for your feedback request.
   */
  id: string;
}

export interface WatchPredictResponse {
  /**
   * A unique identifier for your prediction request.
   */
  id: string;

  /**
   * A label indicating the trustworthiness of the phone number.
   */
  prediction: 'allow' | 'block';

  reasoning: WatchPredictResponse.Reasoning;
}

export namespace WatchPredictResponse {
  export interface Reasoning {
    /**
     * A label explaining why the phone number was classified as not trustworthy
     */
    cause?: 'none' | 'smart_antifraud' | 'repeat_number' | 'invalid_line';

    /**
     * Indicates the risk of the phone number being genuine or involved in fraudulent
     * patterns. The higher the riskier.
     */
    score?: number;
  }
}

export interface WatchFeedBackParams {
  /**
   * You should send a feedback event back to Watch API when your user demonstrates
   * authentic behavior.
   */
  feedback: WatchFeedBackParams.Feedback;

  /**
   * The target. Currently this can only be an E.164 formatted phone number.
   */
  target: WatchFeedBackParams.Target;
}

export namespace WatchFeedBackParams {
  /**
   * You should send a feedback event back to Watch API when your user demonstrates
   * authentic behavior.
   */
  export interface Feedback {
    /**
     * `CONFIRM_TARGET` should be sent when you are sure that the user with this target
     * (e.g. phone number) is trustworthy.
     */
    type: 'CONFIRM_TARGET';
  }

  /**
   * The target. Currently this can only be an E.164 formatted phone number.
   */
  export interface Target {
    /**
     * The type of the target. Currently this can only be "phone_number".
     */
    type: 'phone_number';

    /**
     * An E.164 formatted phone number to verify.
     */
    value: string;
  }
}

export interface WatchPredictParams {
  /**
   * The target. Currently this can only be an E.164 formatted phone number.
   */
  target: WatchPredictParams.Target;

  /**
   * It is highly recommended that you provide the signals to increase prediction
   * performance.
   */
  signals?: WatchPredictParams.Signals;
}

export namespace WatchPredictParams {
  /**
   * The target. Currently this can only be an E.164 formatted phone number.
   */
  export interface Target {
    /**
     * The type of the target. Currently this can only be "phone_number".
     */
    type: 'phone_number';

    /**
     * An E.164 formatted phone number to verify.
     */
    value: string;
  }

  /**
   * It is highly recommended that you provide the signals to increase prediction
   * performance.
   */
  export interface Signals {
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
    device_type?: string;

    /**
     * The IPv4 address of the user's device
     */
    ip?: string;
  }
}

export declare namespace Watch {
  export {
    type WatchFeedBackResponse as WatchFeedBackResponse,
    type WatchPredictResponse as WatchPredictResponse,
    type WatchFeedBackParams as WatchFeedBackParams,
    type WatchPredictParams as WatchPredictParams,
  };
}
