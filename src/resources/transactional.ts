// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';

export class Transactional extends APIResource {
  /**
   * Send a transactional message to your user.
   */
  send(
    body: TransactionalSendParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<TransactionalSendResponse> {
    return this._client.post('/v2/transactional', { body, ...options });
  }
}

export interface TransactionalSendResponse {
  /**
   * The message identifier.
   */
  id: string;

  /**
   * The message creation date.
   */
  created_at: string;

  /**
   * The message expiration date.
   */
  expires_at: string;

  /**
   * The template identifier.
   */
  template_id: string;

  /**
   * The recipient's phone number.
   */
  to: string;

  /**
   * The variables to be replaced in the template.
   */
  variables: Record<string, string>;

  /**
   * The callback URL.
   */
  callback_url?: string;

  /**
   * A unique, user-defined identifier that will be included in webhook events.
   */
  correlation_id?: string;

  /**
   * The Sender ID.
   */
  from?: string;
}

export interface TransactionalSendParams {
  /**
   * The template identifier.
   */
  template_id: string;

  /**
   * The recipient's phone number.
   */
  to: string;

  /**
   * The callback URL.
   */
  callback_url?: string;

  /**
   * A unique, user-defined identifier that will be included in webhook events.
   */
  correlation_id?: string;

  /**
   * The message expiration date.
   */
  expires_at?: string;

  /**
   * The Sender ID.
   */
  from?: string;

  /**
   * A BCP-47 formatted locale string with the language the text message will be sent
   * to. If there's no locale set, the language will be determined by the country
   * code of the phone number. If the language specified doesn't exist, the default
   * set on the template will be used.
   */
  locale?: string;

  /**
   * The variables to be replaced in the template.
   */
  variables?: Record<string, string>;
}

export declare namespace Transactional {
  export {
    type TransactionalSendResponse as TransactionalSendResponse,
    type TransactionalSendParams as TransactionalSendParams,
  };
}
