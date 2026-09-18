// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';
import * as Shared from './shared';

/**
 * Evaluate email addresses and phone numbers for trustworthiness.
 */
export class Watch extends APIResource {
  /**
   * **Beta.** The request and response shapes may still change, and flows and
   * recipes are configured by Prelude on your behalf for now. Talk to us before you
   * build against it.
   *
   * Score a target against the rules configured for one moment in your product —
   * signup, checkout, password reset. The flow selects which recipes run; each
   * recipe scores its rules against a threshold and returns its own verdict, and the
   * evaluation answers with the most severe verdict and action across them. Where
   * Predict returns a single model-derived outcome, Eval returns the full breakdown,
   * so you can see which rules fired and which could not run. Scoring-only — it does
   * not update counters by itself.
   *
   * @example
   * ```ts
   * const response = await client.watch.evaluate({
   *   flow_id: 'flo_01jc0t6fwwfgfsq1md24mhyztj',
   *   target: { type: 'phone_number', value: '+30123456789' },
   * });
   * ```
   */
  evaluate(body: WatchEvaluateParams, options?: Core.RequestOptions): Core.APIPromise<WatchEvaluateResponse> {
    return this._client.post('/v2/watch/eval', { body, ...options });
  }

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

export interface WatchEvaluateResponse {
  /**
   * The evaluation identifier.
   */
  id: string;

  /**
   * What the evaluation suggests you do, being the most severe action across the
   * recipes that ran. Advisory: enforcement is yours.
   *
   * - `ALLOW` - Let the request through.
   * - `BLOCK` - Refuse the request.
   * - `CHALLENGE` - Let the request through behind an additional check.
   */
  action: 'ALLOW' | 'BLOCK' | 'CHALLENGE';

  /**
   * One result per recipe that ran. A recipe the flow names but that is not in
   * service is absent rather than reported as having passed.
   */
  recipes: Array<WatchEvaluateResponse.Recipe>;

  /**
   * The evaluation-level verdict, being the most severe verdict across the recipes
   * that ran.
   *
   * - `PASS` - No recipe flagged.
   * - `FLAG` - At least one recipe flagged.
   */
  verdict: 'PASS' | 'FLAG';
}

export namespace WatchEvaluateResponse {
  export interface Recipe {
    /**
     * At least one rule could not be evaluated, so the score rests on less than the
     * whole recipe. The score is still returned — a partial verdict is more useful
     * than none — but it is labeled rather than passed off as whole.
     */
    partial_evidence: boolean;

    /**
     * The recipe that produced this result.
     */
    recipe_id: string;

    /**
     * One result per rule in the recipe, in membership order. Every rule runs — a
     * score is only meaningful when complete, so there is no short-circuit on the
     * first trigger.
     */
    rules: Array<Recipe.Rule>;

    /**
     * The sum of the weights of the rules that triggered, clamped to the range -100
     * to 100. Two scores at a bound are not comparable.
     */
    score: number;

    /**
     * The score at or above which this recipe flags.
     */
    threshold: number;

    /**
     * This recipe's own verdict. Normally the score against the threshold, unless a
     * preempting rule fired — see `determined_by`.
     */
    verdict: 'PASS' | 'FLAG';

    /**
     * The preempting rule that set `verdict`, present only when a rule rather than the
     * score decided it. Without it a recipe can report a score under its threshold and
     * still flag, with nothing in the payload accounting for the difference.
     */
    determined_by?: string;
  }

  export namespace Recipe {
    export interface Rule {
      /**
       * What the rule concluded.
       *
       * - `TRIGGERED` - The condition held; `weight` was added to the score.
       * - `NOT_TRIGGERED` - The condition did not hold.
       * - `NOT_EVALUATED` - The rule could not run, because something it reads never
       *   arrived. This is not a quieter `NOT_TRIGGERED`: it contributed nothing either
       *   way, and it is why `partial_evidence` is set on the recipe.
       */
      outcome: 'TRIGGERED' | 'NOT_TRIGGERED' | 'NOT_EVALUATED';

      /**
       * The rule that produced this result. Present whatever the rule's visibility, so a
       * rule you cannot see the condition of is still one you can reweight, switch off,
       * or ask us about.
       */
      rule_id: string;

      /**
       * What this rule contributes to the recipe's score when it triggers.
       */
      weight: number;

      /**
       * Why the rule could not run, set only when `outcome` is `NOT_EVALUATED`.
       *
       * A rule you authored names the signal or attribute it waited on, since you wrote
       * the expression that reads it. A Prelude-managed rule reports `missing_data` and
       * nothing more: the signal it waited on is part of a condition that is not
       * disclosed.
       */
      blocked_by?: string;

      /**
       * The rule's name, present for a rule you authored and omitted for a
       * Prelude-managed one. A managed rule's name describes what it looks for, which is
       * as much of the condition as the expression is.
       */
      name?: string;

      /**
       * The rule could not run for a reason on our side rather than anything about your
       * request. `outcome` is `NOT_EVALUATED` and the failure is ours to fix.
       */
      unavailable?: boolean;
    }
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

export interface WatchEvaluateParams {
  /**
   * The flow to evaluate. A flow names the moment you are guarding and selects the
   * recipes that run.
   */
  flow_id: string;

  /**
   * The identifier to score — a phone number or email address.
   */
  target: Shared.Target;

  /**
   * Values for the attributes the flow's recipes declare, keyed without the `attr.`
   * namespace a rule uses to reference them.
   *
   * An attribute a recipe declares and this request omits is treated as missing
   * evidence, not as an empty value: the rules reading it report `NOT_EVALUATED`
   * rather than being scored as though the condition were false. A key no recipe in
   * the flow declares is ignored rather than rejected, so one payload can serve
   * flows that read different attributes.
   */
  attributes?: { [key: string]: string };

  /**
   * The identifier of the dispatch that came from the front-end SDK. Signals it
   * carries fill in anything the request did not state; the request wins where both
   * supply a value.
   */
  dispatch_id?: string;

  /**
   * The signals used for anti-fraud. For more details, refer to
   * [Signals](/verify/v2/documentation/prevent-fraud#signals).
   */
  signals?: Shared.Signals;
}

export interface WatchPredictParams {
  /**
   * The signup identifier to score — a phone number or email address.
   */
  target: Shared.Target;

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
  signals?: Shared.Signals;
}

export namespace WatchPredictParams {
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
    target: Shared.Target;
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
    target: Shared.Target;

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
    type WatchEvaluateResponse as WatchEvaluateResponse,
    type WatchPredictResponse as WatchPredictResponse,
    type WatchSendEventsResponse as WatchSendEventsResponse,
    type WatchSendFeedbacksResponse as WatchSendFeedbacksResponse,
    type WatchEvaluateParams as WatchEvaluateParams,
    type WatchPredictParams as WatchPredictParams,
    type WatchSendEventsParams as WatchSendEventsParams,
    type WatchSendFeedbacksParams as WatchSendFeedbacksParams,
  };
}
