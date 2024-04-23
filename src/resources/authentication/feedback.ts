// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import * as Core from 'prelude/core';
import { APIResource } from 'prelude/resource';
import * as FeedbackAPI from 'prelude/resources/authentication/feedback';

export class Feedback extends APIResource {
  /**
   * Send feedback
   */
  create(body: FeedbackCreateParams, options?: Core.RequestOptions): Core.APIPromise<FeedbackCreateResponse> {
    return this._client.post('/authentication/feedback', { body, ...options });
  }
}

export interface FeedbackCreateResponse {
  /**
   * The UUID of the feedback.
   */
  uuid?: string;
}

export interface FeedbackCreateParams {
  /**
   * Your customer UUID, which can be found in the API settings in the dashboard.
   */
  customer_uuid: string;

  /**
   * An E.164 formatted phone number.
   */
  phone_number: string;

  /**
   * The type of the feedback.
   */
  status: 'onboarded' | 'not_onboarded';
}

export namespace Feedback {
  export import FeedbackCreateResponse = FeedbackAPI.FeedbackCreateResponse;
  export import FeedbackCreateParams = FeedbackAPI.FeedbackCreateParams;
}
