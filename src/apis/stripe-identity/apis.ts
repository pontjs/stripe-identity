/**
 * @author pontx-generator
 * @description API 类型定义
 */

import type * as schemas from './schemas';

export declare namespace APIs {
  export type GetIdentityVerificationReportsParams = {
    /**
     * @description A string to reference this user. This can be a customer ID, a session ID, or similar, and can be used to reconcile this verification with your internal systems.
     */
    client_reference_id?: string;
    /**
     * @description Only return VerificationReports that were created during the given date interval.
     */
    created?: any;
    /**
     * @description A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.
     */
    ending_before?: string;
    /**
     * @description Specifies which fields in the response should be expanded.
     */
    expand?: Array<string>;
    /**
     * @description A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.
     */
    limit?: number;
    /**
     * @description A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.
     */
    starting_after?: string;
    /**
     * @description Only return VerificationReports of this type
     */
    type?: 'document' | 'id_number';
    /**
     * @description Only return VerificationReports created by this VerificationSession ID. It is allowed to provide a VerificationIntent ID.
     */
    verification_session?: string;
  };

  export type GetIdentityVerificationReportsReportParams = {
    /**
     * @description Specifies which fields in the response should be expanded.
     */
    expand?: Array<string>;
  };

  export type GetIdentityVerificationSessionsParams = {
    /**
     * @description A string to reference this user. This can be a customer ID, a session ID, or similar, and can be used to reconcile this verification with your internal systems.
     */
    client_reference_id?: string;
    /**
     * @description Only return VerificationSessions that were created during the given date interval.
     */
    created?: any;
    /**
     * @description A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.
     */
    ending_before?: string;
    /**
     * @description Specifies which fields in the response should be expanded.
     */
    expand?: Array<string>;
    /**
     * @description A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.
     */
    limit?: number;
    /**
     * @description Customer ID
     */
    related_customer?: string;
    /**
     * @description The ID of the Account representing a customer.
     */
    related_customer_account?: string;
    /**
     * @description A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.
     */
    starting_after?: string;
    /**
     * @description Only return VerificationSessions with this status. [Learn more about the lifecycle of sessions](https://docs.stripe.com/identity/how-sessions-work).
     */
    status?: 'canceled' | 'processing' | 'requires_input' | 'verified';
  };

  export type GetIdentityVerificationSessionsSessionParams = {
    /**
     * @description Specifies which fields in the response should be expanded.
     */
    expand?: Array<string>;
  };

}

// ============ API 集合类型 ============

/**
 * API 类型定义
 */
export type APIs = {
  /**
   * GET /v1/identity/verification_reports
   * <p>List all verification reports.</p>
   * @summary: List VerificationReports
   */
  getIdentityVerificationReports: (
    params: APIs.GetIdentityVerificationReportsParams,
    requestInit?: RequestInit,
  ) => Promise<{
  data: Array<schemas.stripe_identity_verification_report>;
  /**
   * @description True if this list has another page of items after this one that can be fetched.
   */
  has_more: boolean;
  /**
   * @description String representing the object's type. Objects of the same type share the same value. Always has the value `list`.
   */
  object: 'list';
  /**
   * @description The URL where this list can be accessed.
   */
  url: string
}>;

  /**
   * GET /v1/identity/verification_reports/{report}
   * <p>Retrieves an existing VerificationReport</p>
   * @summary: Retrieve a VerificationReport
   */
  getIdentityVerificationReportsReport: (
    report: string,
    params: APIs.GetIdentityVerificationReportsReportParams,
    requestInit?: RequestInit,
  ) => Promise<schemas.stripe_identity_verification_report>;

  /**
   * GET /v1/identity/verification_sessions
   * <p>Returns a list of VerificationSessions</p>
   * @summary: List VerificationSessions
   */
  getIdentityVerificationSessions: (
    params: APIs.GetIdentityVerificationSessionsParams,
    requestInit?: RequestInit,
  ) => Promise<{
  data: Array<schemas.stripe_identity_verification_session>;
  /**
   * @description True if this list has another page of items after this one that can be fetched.
   */
  has_more: boolean;
  /**
   * @description String representing the object's type. Objects of the same type share the same value. Always has the value `list`.
   */
  object: 'list';
  /**
   * @description The URL where this list can be accessed.
   */
  url: string
}>;

  /**
   * POST /v1/identity/verification_sessions
   * <p>Creates a VerificationSession object.</p>
   * 
   * <p>After the VerificationSession is created, display a verification modal using the session <code>client_secret</code> or send your users to the session’s <code>url</code>.</p>
   * 
   * <p>If your API key is in test mode, verification checks won’t actually process, though everything else will occur as if in live mode.</p>
   * 
   * <p>Related guide: <a href="https://docs.stripe.com/identity/verify-identity-documents">Verify your users’ identity documents</a></p>
   * @summary: Create a VerificationSession
   */
  postIdentityVerificationSessions: (
    body: {
      /**
       * @description A string to reference this user. This can be a customer ID, a session ID, or similar, and can be used to reconcile this verification with your internal systems.
       */
      client_reference_id?: string;
      /**
       * @description Specifies which fields in the response should be expanded.
       */
      expand?: Array<string>;
      /**
       * @description Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`.
       */
      metadata?: Record<any, string>;
      /**
       * @title session_options_param
       * @description A set of options for the session’s verification checks.
       */
      options?: {
        document?: any
      };
      /**
       * @title provided_details_param
       * @description Details provided about the user being verified. These details might be shown to the user.
       */
      provided_details?: {
        email?: string;
        phone?: string
      };
      /**
       * @description Customer ID
       */
      related_customer?: string;
      /**
       * @description The ID of the Account representing a customer.
       */
      related_customer_account?: string;
      /**
       * @title related_person_param
       * @description Tokens referencing a Person resource and its associated account.
       */
      related_person: {
        account: string;
        person: string
      };
      /**
       * @description The URL that the user will be redirected to upon completing the verification flow.
       */
      return_url?: string;
      /**
       * @description The type of [verification check](https://docs.stripe.com/identity/verification-checks) to be performed. You must provide a `type` if not passing `verification_flow`.
       */
      type?: 'document' | 'id_number';
      /**
       * @description The ID of a verification flow from the Dashboard. See https://docs.stripe.com/identity/verification-flows.
       */
      verification_flow?: string
    },
    requestInit?: RequestInit,
  ) => Promise<schemas.stripe_identity_verification_session>;

  /**
   * GET /v1/identity/verification_sessions/{session}
   * <p>Retrieves the details of a VerificationSession that was previously created.</p>
   * 
   * <p>When the session status is <code>requires_input</code>, you can use this method to retrieve a valid
   * <code>client_secret</code> or <code>url</code> to allow re-submission.</p>
   * @summary: Retrieve a VerificationSession
   */
  getIdentityVerificationSessionsSession: (
    session: string,
    params: APIs.GetIdentityVerificationSessionsSessionParams,
    requestInit?: RequestInit,
  ) => Promise<schemas.stripe_identity_verification_session>;

  /**
   * POST /v1/identity/verification_sessions/{session}
   * <p>Updates a VerificationSession object.</p>
   * 
   * <p>When the session status is <code>requires_input</code>, you can use this method to update the
   * verification check and options.</p>
   * @summary: Update a VerificationSession
   */
  postIdentityVerificationSessionsSession: (
    session: string,
    body: {
      /**
       * @description Specifies which fields in the response should be expanded.
       */
      expand?: Array<string>;
      /**
       * @description Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`.
       */
      metadata?: Record<any, string>;
      /**
       * @title session_options_param
       * @description A set of options for the session’s verification checks.
       */
      options?: {
        document?: any
      };
      /**
       * @title provided_details_param
       * @description Details provided about the user being verified. These details may be shown to the user.
       */
      provided_details?: {
        email?: string;
        phone?: string
      };
      /**
       * @description The type of [verification check](https://docs.stripe.com/identity/verification-checks) to be performed.
       */
      type?: 'document' | 'id_number'
    },
    requestInit?: RequestInit,
  ) => Promise<schemas.stripe_identity_verification_session>;

  /**
   * POST /v1/identity/verification_sessions/{session}/cancel
   * <p>A VerificationSession object can be canceled when it is in <code>requires_input</code> <a href="https://docs.stripe.com/identity/how-sessions-work">status</a>.</p>
   * 
   * <p>Once canceled, future submission attempts are disabled. This cannot be undone. <a href="https://docs.stripe.com/identity/verification-sessions#cancel">Learn more</a>.</p>
   * @summary: Cancel a VerificationSession
   */
  postIdentityVerificationSessionsSessionCancel: (
    session: string,
    body: {
      /**
       * @description Specifies which fields in the response should be expanded.
       */
      expand?: Array<string>
    },
    requestInit?: RequestInit,
  ) => Promise<schemas.stripe_identity_verification_session>;

  /**
   * POST /v1/identity/verification_sessions/{session}/redact
   * <p>Redact a VerificationSession to remove all collected information from Stripe. This will redact
   * the VerificationSession and all objects related to it, including VerificationReports, Events,
   * request logs, etc.</p>
   * 
   * <p>A VerificationSession object can be redacted when it is in <code>requires_input</code> or <code>verified</code>
   * <a href="https://docs.stripe.com/identity/how-sessions-work">status</a>. Redacting a VerificationSession in <code>requires_action</code>
   * state will automatically cancel it.</p>
   * 
   * <p>The redaction process may take up to four days. When the redaction process is in progress, the
   * VerificationSession’s <code>redaction.status</code> field will be set to <code>processing</code>; when the process is
   * finished, it will change to <code>redacted</code> and an <code>identity.verification_session.redacted</code> event
   * will be emitted.</p>
   * 
   * <p>Redaction is irreversible. Redacted objects are still accessible in the Stripe API, but all the
   * fields that contain personal data will be replaced by the string <code>[redacted]</code> or a similar
   * placeholder. The <code>metadata</code> field will also be erased. Redacted objects cannot be updated or
   * used for any purpose.</p>
   * 
   * <p><a href="https://docs.stripe.com/identity/verification-sessions#redact">Learn more</a>.</p>
   * @summary: Redact a VerificationSession
   */
  postIdentityVerificationSessionsSessionRedact: (
    session: string,
    body: {
      /**
       * @description Specifies which fields in the response should be expanded.
       */
      expand?: Array<string>
    },
    requestInit?: RequestInit,
  ) => Promise<schemas.stripe_identity_verification_session>;

};

export declare namespace APIs {
}
