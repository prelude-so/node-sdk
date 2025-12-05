// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';

export class Notify extends APIResource {
  /**
   * Retrieve a specific subscription management configuration by its ID.
   */
  getSubscriptionConfig(
    configId: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<NotifyGetSubscriptionConfigResponse> {
    return this._client.get(`/v2/notify/management/subscriptions/${configId}`, options);
  }

  /**
   * Retrieve the current subscription status for a specific phone number within a
   * subscription configuration.
   */
  getSubscriptionPhoneNumber(
    configId: string,
    phoneNumber: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<NotifyGetSubscriptionPhoneNumberResponse> {
    return this._client.get(
      `/v2/notify/management/subscriptions/${configId}/phone_numbers/${phoneNumber}`,
      options,
    );
  }

  /**
   * Retrieve a paginated list of subscription management configurations for your
   * account.
   *
   * Each configuration represents a subscription management setup with phone numbers
   * for receiving opt-out/opt-in requests and a callback URL for webhook events.
   */
  listSubscriptionConfigs(
    query?: NotifyListSubscriptionConfigsParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<NotifyListSubscriptionConfigsResponse>;
  listSubscriptionConfigs(
    options?: Core.RequestOptions,
  ): Core.APIPromise<NotifyListSubscriptionConfigsResponse>;
  listSubscriptionConfigs(
    query: NotifyListSubscriptionConfigsParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<NotifyListSubscriptionConfigsResponse> {
    if (isRequestOptions(query)) {
      return this.listSubscriptionConfigs({}, query);
    }
    return this._client.get('/v2/notify/management/subscriptions', { query, ...options });
  }

  /**
   * Retrieve a paginated list of subscription events (status changes) for a specific
   * phone number within a subscription configuration.
   *
   * Events are ordered by timestamp in descending order (most recent first).
   */
  listSubscriptionPhoneNumberEvents(
    configId: string,
    phoneNumber: string,
    query?: NotifyListSubscriptionPhoneNumberEventsParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<NotifyListSubscriptionPhoneNumberEventsResponse>;
  listSubscriptionPhoneNumberEvents(
    configId: string,
    phoneNumber: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<NotifyListSubscriptionPhoneNumberEventsResponse>;
  listSubscriptionPhoneNumberEvents(
    configId: string,
    phoneNumber: string,
    query: NotifyListSubscriptionPhoneNumberEventsParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<NotifyListSubscriptionPhoneNumberEventsResponse> {
    if (isRequestOptions(query)) {
      return this.listSubscriptionPhoneNumberEvents(configId, phoneNumber, {}, query);
    }
    return this._client.get(
      `/v2/notify/management/subscriptions/${configId}/phone_numbers/${phoneNumber}/events`,
      { query, ...options },
    );
  }

  /**
   * Retrieve a paginated list of phone numbers and their subscription statuses for a
   * specific subscription configuration.
   *
   * You can optionally filter by subscription state (SUB or UNSUB).
   */
  listSubscriptionPhoneNumbers(
    configId: string,
    query?: NotifyListSubscriptionPhoneNumbersParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<NotifyListSubscriptionPhoneNumbersResponse>;
  listSubscriptionPhoneNumbers(
    configId: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<NotifyListSubscriptionPhoneNumbersResponse>;
  listSubscriptionPhoneNumbers(
    configId: string,
    query: NotifyListSubscriptionPhoneNumbersParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<NotifyListSubscriptionPhoneNumbersResponse> {
    if (isRequestOptions(query)) {
      return this.listSubscriptionPhoneNumbers(configId, {}, query);
    }
    return this._client.get(`/v2/notify/management/subscriptions/${configId}/phone_numbers`, {
      query,
      ...options,
    });
  }

  /**
   * Send transactional and marketing messages to your users via SMS and WhatsApp
   * with automatic compliance enforcement.
   */
  send(body: NotifySendParams, options?: Core.RequestOptions): Core.APIPromise<NotifySendResponse> {
    return this._client.post('/v2/notify', { body, ...options });
  }

  /**
   * Send the same message to multiple recipients in a single request.
   */
  sendBatch(
    body: NotifySendBatchParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<NotifySendBatchResponse> {
    return this._client.post('/v2/notify/batch', { body, ...options });
  }
}

export interface NotifyGetSubscriptionConfigResponse {
  /**
   * The subscription configuration ID.
   */
  id: string;

  /**
   * The URL to call when subscription status changes.
   */
  callback_url: string;

  /**
   * The date and time when the configuration was created.
   */
  created_at: string;

  /**
   * The subscription messages configuration.
   */
  messages: NotifyGetSubscriptionConfigResponse.Messages;

  /**
   * The human-readable name for the subscription configuration.
   */
  name: string;

  /**
   * The date and time when the configuration was last updated.
   */
  updated_at: string;

  /**
   * A list of phone numbers for receiving inbound messages.
   */
  mo_phone_numbers?: Array<NotifyGetSubscriptionConfigResponse.MoPhoneNumber>;
}

export namespace NotifyGetSubscriptionConfigResponse {
  /**
   * The subscription messages configuration.
   */
  export interface Messages {
    /**
     * Message sent when user requests help.
     */
    help_message?: string;

    /**
     * Message sent when user subscribes.
     */
    start_message?: string;

    /**
     * Message sent when user unsubscribes.
     */
    stop_message?: string;
  }

  export interface MoPhoneNumber {
    /**
     * The ISO 3166-1 alpha-2 country code.
     */
    country_code: string;

    /**
     * The phone number in E.164 format for long codes, or short code format for short
     * codes.
     */
    phone_number: string;
  }
}

export interface NotifyGetSubscriptionPhoneNumberResponse {
  /**
   * The subscription configuration ID.
   */
  config_id: string;

  /**
   * The phone number in E.164 format.
   */
  phone_number: string;

  /**
   * How the subscription state was changed:
   *
   * - `MO_KEYWORD` - User sent a keyword (STOP/START)
   * - `API` - Changed via API
   * - `CSV_IMPORT` - Imported from CSV
   * - `CARRIER_DISCONNECT` - Automatically unsubscribed due to carrier disconnect
   */
  source: 'MO_KEYWORD' | 'API' | 'CSV_IMPORT' | 'CARRIER_DISCONNECT';

  /**
   * The subscription state:
   *
   * - `SUB` - Subscribed (user can receive marketing messages)
   * - `UNSUB` - Unsubscribed (user has opted out)
   */
  state: 'SUB' | 'UNSUB';

  /**
   * The date and time when the subscription status was last updated.
   */
  updated_at: string;

  /**
   * Additional context about the state change (e.g., the keyword that was sent).
   */
  reason?: string;
}

export interface NotifyListSubscriptionConfigsResponse {
  /**
   * A list of subscription management configurations.
   */
  configs: Array<NotifyListSubscriptionConfigsResponse.Config>;

  /**
   * Pagination cursor for the next page of results. Omitted if there are no more
   * pages.
   */
  next_cursor?: string;
}

export namespace NotifyListSubscriptionConfigsResponse {
  export interface Config {
    /**
     * The subscription configuration ID.
     */
    id: string;

    /**
     * The URL to call when subscription status changes.
     */
    callback_url: string;

    /**
     * The date and time when the configuration was created.
     */
    created_at: string;

    /**
     * The subscription messages configuration.
     */
    messages: Config.Messages;

    /**
     * The human-readable name for the subscription configuration.
     */
    name: string;

    /**
     * The date and time when the configuration was last updated.
     */
    updated_at: string;

    /**
     * A list of phone numbers for receiving inbound messages.
     */
    mo_phone_numbers?: Array<Config.MoPhoneNumber>;
  }

  export namespace Config {
    /**
     * The subscription messages configuration.
     */
    export interface Messages {
      /**
       * Message sent when user requests help.
       */
      help_message?: string;

      /**
       * Message sent when user subscribes.
       */
      start_message?: string;

      /**
       * Message sent when user unsubscribes.
       */
      stop_message?: string;
    }

    export interface MoPhoneNumber {
      /**
       * The ISO 3166-1 alpha-2 country code.
       */
      country_code: string;

      /**
       * The phone number in E.164 format for long codes, or short code format for short
       * codes.
       */
      phone_number: string;
    }
  }
}

export interface NotifyListSubscriptionPhoneNumberEventsResponse {
  /**
   * A list of subscription events (status changes) ordered by timestamp descending.
   */
  events: Array<NotifyListSubscriptionPhoneNumberEventsResponse.Event>;

  /**
   * Pagination cursor for the next page of results. Omitted if there are no more
   * pages.
   */
  next_cursor?: string;
}

export namespace NotifyListSubscriptionPhoneNumberEventsResponse {
  export interface Event {
    /**
     * The subscription configuration ID.
     */
    config_id: string;

    /**
     * The phone number in E.164 format.
     */
    phone_number: string;

    /**
     * How the subscription state was changed:
     *
     * - `MO_KEYWORD` - User sent a keyword (STOP/START)
     * - `API` - Changed via API
     * - `CSV_IMPORT` - Imported from CSV
     * - `CARRIER_DISCONNECT` - Automatically unsubscribed due to carrier disconnect
     */
    source: 'MO_KEYWORD' | 'API' | 'CSV_IMPORT' | 'CARRIER_DISCONNECT';

    /**
     * The subscription state after this event:
     *
     * - `SUB` - Subscribed (user can receive marketing messages)
     * - `UNSUB` - Unsubscribed (user has opted out)
     */
    state: 'SUB' | 'UNSUB';

    /**
     * The date and time when the event occurred.
     */
    timestamp: string;

    /**
     * Additional context about the state change (e.g., the keyword that was sent).
     */
    reason?: string;
  }
}

export interface NotifyListSubscriptionPhoneNumbersResponse {
  /**
   * A list of phone numbers and their subscription statuses.
   */
  phone_numbers: Array<NotifyListSubscriptionPhoneNumbersResponse.PhoneNumber>;

  /**
   * Pagination cursor for the next page of results. Omitted if there are no more
   * pages.
   */
  next_cursor?: string;
}

export namespace NotifyListSubscriptionPhoneNumbersResponse {
  export interface PhoneNumber {
    /**
     * The subscription configuration ID.
     */
    config_id: string;

    /**
     * The phone number in E.164 format.
     */
    phone_number: string;

    /**
     * How the subscription state was changed:
     *
     * - `MO_KEYWORD` - User sent a keyword (STOP/START)
     * - `API` - Changed via API
     * - `CSV_IMPORT` - Imported from CSV
     * - `CARRIER_DISCONNECT` - Automatically unsubscribed due to carrier disconnect
     */
    source: 'MO_KEYWORD' | 'API' | 'CSV_IMPORT' | 'CARRIER_DISCONNECT';

    /**
     * The subscription state:
     *
     * - `SUB` - Subscribed (user can receive marketing messages)
     * - `UNSUB` - Unsubscribed (user has opted out)
     */
    state: 'SUB' | 'UNSUB';

    /**
     * The date and time when the subscription status was last updated.
     */
    updated_at: string;

    /**
     * Additional context about the state change (e.g., the keyword that was sent).
     */
    reason?: string;
  }
}

export interface NotifySendResponse {
  /**
   * The message identifier.
   */
  id: string;

  /**
   * The message creation date in RFC3339 format.
   */
  created_at: string;

  /**
   * The message expiration date in RFC3339 format.
   */
  expires_at: string;

  /**
   * The template identifier.
   */
  template_id: string;

  /**
   * The recipient's phone number in E.164 format.
   */
  to: string;

  /**
   * The variables to be replaced in the template.
   */
  variables: { [key: string]: string };

  /**
   * The callback URL where webhooks will be sent.
   */
  callback_url?: string;

  /**
   * A user-defined identifier to correlate this message with your internal systems.
   */
  correlation_id?: string;

  /**
   * The Sender ID used for this message.
   */
  from?: string;

  /**
   * When the message will actually be sent in RFC3339 format with timezone offset.
   * For marketing messages, this may differ from the requested schedule_at due to
   * automatic compliance adjustments.
   */
  schedule_at?: string;
}

export interface NotifySendBatchResponse {
  /**
   * Number of failed sends.
   */
  error_count: number;

  /**
   * The per-recipient result of the bulk send.
   */
  results: Array<NotifySendBatchResponse.Result>;

  /**
   * Number of successful sends.
   */
  success_count: number;

  /**
   * Total number of recipients.
   */
  total_count: number;

  /**
   * The callback URL used for this bulk request, if any.
   */
  callback_url?: string;

  /**
   * A string that identifies this specific request.
   */
  request_id?: string;

  /**
   * The template identifier used for this bulk request.
   */
  template_id?: string;

  /**
   * The variables used for this bulk request.
   */
  variables?: { [key: string]: string };
}

export namespace NotifySendBatchResponse {
  export interface Result {
    /**
     * The recipient's phone number in E.164 format.
     */
    phone_number: string;

    /**
     * Whether the message was accepted for delivery.
     */
    success: boolean;

    /**
     * Present only if success is false.
     */
    error?: Result.Error;

    /**
     * Present only if success is true.
     */
    message?: Result.Message;
  }

  export namespace Result {
    /**
     * Present only if success is false.
     */
    export interface Error {
      /**
       * The error code.
       */
      code?: string;

      /**
       * A human-readable error message.
       */
      message?: string;
    }

    /**
     * Present only if success is true.
     */
    export interface Message {
      /**
       * The message identifier.
       */
      id?: string;

      /**
       * The correlation identifier for the message.
       */
      correlation_id?: string;

      /**
       * The message creation date in RFC3339 format.
       */
      created_at?: string;

      /**
       * The message expiration date in RFC3339 format.
       */
      expires_at?: string;

      /**
       * The Sender ID used for this message.
       */
      from?: string;

      /**
       * The locale used for the message, if any.
       */
      locale?: string;

      /**
       * When the message will actually be sent in RFC3339 format with timezone offset.
       */
      schedule_at?: string;

      /**
       * The recipient's phone number in E.164 format.
       */
      to?: string;
    }
  }
}

export interface NotifyListSubscriptionConfigsParams {
  /**
   * Pagination cursor from the previous response
   */
  cursor?: string;

  /**
   * Maximum number of configurations to return per page
   */
  limit?: number;
}

export interface NotifyListSubscriptionPhoneNumberEventsParams {
  /**
   * Pagination cursor from the previous response
   */
  cursor?: string;

  /**
   * Maximum number of events to return per page
   */
  limit?: number;
}

export interface NotifyListSubscriptionPhoneNumbersParams {
  /**
   * Pagination cursor from the previous response
   */
  cursor?: string;

  /**
   * Maximum number of phone numbers to return per page
   */
  limit?: number;

  /**
   * Filter by subscription state
   */
  state?: 'SUB' | 'UNSUB';
}

export interface NotifySendParams {
  /**
   * The template identifier configured by your Customer Success team.
   */
  template_id: string;

  /**
   * The recipient's phone number in E.164 format.
   */
  to: string;

  /**
   * The URL where webhooks will be sent for message delivery events.
   */
  callback_url?: string;

  /**
   * A user-defined identifier to correlate this message with your internal systems.
   * It is returned in the response and any webhook events that refer to this
   * message.
   */
  correlation_id?: string;

  /**
   * The message expiration date in RFC3339 format. The message will not be sent if
   * this time is reached.
   */
  expires_at?: string;

  /**
   * The Sender ID. Must be approved for your account.
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
   * The preferred channel to be used in priority for message delivery. If the
   * channel is unavailable, the system will fallback to other available channels.
   */
  preferred_channel?: 'sms' | 'whatsapp';

  /**
   * Schedule the message for future delivery in RFC3339 format. Marketing messages
   * can be scheduled up to 90 days in advance and will be automatically adjusted for
   * compliance with local time window restrictions.
   */
  schedule_at?: string;

  /**
   * The variables to be replaced in the template.
   */
  variables?: { [key: string]: string };
}

export interface NotifySendBatchParams {
  /**
   * The template identifier configured by your Customer Success team.
   */
  template_id: string;

  /**
   * The list of recipients' phone numbers in E.164 format.
   */
  to: Array<string>;

  /**
   * The URL where webhooks will be sent for delivery events.
   */
  callback_url?: string;

  /**
   * A user-defined identifier to correlate this request with your internal systems.
   */
  correlation_id?: string;

  /**
   * The message expiration date in RFC3339 format. Messages will not be sent after
   * this time.
   */
  expires_at?: string;

  /**
   * The Sender ID. Must be approved for your account.
   */
  from?: string;

  /**
   * A BCP-47 formatted locale string.
   */
  locale?: string;

  /**
   * Preferred channel for delivery. If unavailable, automatic fallback applies.
   */
  preferred_channel?: 'sms' | 'whatsapp';

  /**
   * Schedule delivery in RFC3339 format. Marketing sends may be adjusted to comply
   * with local time windows.
   */
  schedule_at?: string;

  /**
   * The variables to be replaced in the template.
   */
  variables?: { [key: string]: string };
}

export declare namespace Notify {
  export {
    type NotifyGetSubscriptionConfigResponse as NotifyGetSubscriptionConfigResponse,
    type NotifyGetSubscriptionPhoneNumberResponse as NotifyGetSubscriptionPhoneNumberResponse,
    type NotifyListSubscriptionConfigsResponse as NotifyListSubscriptionConfigsResponse,
    type NotifyListSubscriptionPhoneNumberEventsResponse as NotifyListSubscriptionPhoneNumberEventsResponse,
    type NotifyListSubscriptionPhoneNumbersResponse as NotifyListSubscriptionPhoneNumbersResponse,
    type NotifySendResponse as NotifySendResponse,
    type NotifySendBatchResponse as NotifySendBatchResponse,
    type NotifyListSubscriptionConfigsParams as NotifyListSubscriptionConfigsParams,
    type NotifyListSubscriptionPhoneNumberEventsParams as NotifyListSubscriptionPhoneNumberEventsParams,
    type NotifyListSubscriptionPhoneNumbersParams as NotifyListSubscriptionPhoneNumbersParams,
    type NotifySendParams as NotifySendParams,
    type NotifySendBatchParams as NotifySendBatchParams,
  };
}
