// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';

export class Transactional extends APIResource {
  /**
   * Legacy route maintained for backward compatibility. Migrate to `/v2/notify`
   * instead.
   *
   * @deprecated
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
  variables: { [key: string]: string };

  /**
   * The callback URL.
   */
  callback_url?: string;

  /**
   * A user-defined identifier to correlate this transactional message with. It is
   * returned in the response and any webhook events that refer to this transactional
   * message.
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
   * A user-defined identifier to correlate this transactional message with. It is
   * returned in the response and any webhook events that refer to this
   * transactionalmessage.
   */
  correlation_id?: string;

  /**
   * A document to attach to the message. Only supported on WhatsApp templates that
   * have a document header.
   */
  document?: TransactionalSendParams.Document;

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
   * The preferred delivery channel for the message. When specified, the system will
   * prioritize sending via the requested channel if the template is configured for
   * it.
   *
   * If not specified and the template is configured for WhatsApp, the message will
   * be sent via WhatsApp first, with automatic fallback to SMS if WhatsApp delivery
   * is unavailable.
   *
   * Supported channels: `sms`, `rcs`, `whatsapp`.
   */
  preferred_channel?: 'sms' | 'rcs' | 'whatsapp';

  /**
   * The variables to be replaced in the template.
   */
  variables?: { [key: string]: string };
}

export namespace TransactionalSendParams {
  /**
   * A document to attach to the message. Only supported on WhatsApp templates that
   * have a document header.
   */
  export interface Document {
    /**
     * The filename to display for the document.
     */
    filename: string;

    /**
     * The URL of the document to attach. Must be a valid HTTP or HTTPS URL.
     */
    url: string;
  }
}

export declare namespace Transactional {
  export {
    type TransactionalSendResponse as TransactionalSendResponse,
    type TransactionalSendParams as TransactionalSendParams,
  };
}
