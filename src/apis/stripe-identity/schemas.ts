/**
 * @title GelatoDocumentReport
 * @description Result from a document check
 */
export type gelato_document_report = {
  /**
   * @description Address as it appears in the document.
   */
  address?: any;
  /**
   * @description Date of birth as it appears in the document.
   */
  dob?: any;
  /**
   * @description Details on the verification error. Present when status is `unverified`.
   */
  error?: any;
  /**
   * @description Expiration date of the document.
   */
  expiration_date?: any;
  /**
   * @description Array of [File](https://docs.stripe.com/api/files) ids containing images for this document.
   */
  files?: Array<string>;
  /**
   * @description First name as it appears in the document.
   */
  first_name?: string;
  /**
   * @description Issued date of the document.
   */
  issued_date?: any;
  /**
   * @description Issuing country of the document.
   */
  issuing_country?: string;
  /**
   * @description Last name as it appears in the document.
   */
  last_name?: string;
  /**
   * @description Document ID number.
   */
  number?: string;
  /**
   * @description Sex of the person in the document.
   */
  sex?: '[redacted]' | 'female' | 'male' | 'unknown';
  /**
   * @description Status of this `document` check.
   */
  status: 'unverified' | 'verified';
  /**
   * @description Type of the document.
   */
  type?: 'driving_license' | 'id_card' | 'passport';
  /**
   * @description Place of birth as it appears in the document.
   */
  unparsed_place_of_birth?: string;
  /**
   * @description Sex as it appears in the document.
   */
  unparsed_sex?: string;
}

/**
 * @title GelatoEmailReport
 * @description Result from a email check
 */
export type gelato_email_report = {
  /**
   * @description Email to be verified.
   */
  email?: string;
  /**
   * @description Details on the verification error. Present when status is `unverified`.
   */
  error?: any;
  /**
   * @description Status of this `email` check.
   */
  status: 'unverified' | 'verified';
}

/**
 * @title GelatoIdNumberReport
 * @description Result from an id_number check
 */
export type gelato_id_number_report = {
  /**
   * @description Date of birth.
   */
  dob?: any;
  /**
   * @description Details on the verification error. Present when status is `unverified`.
   */
  error?: any;
  /**
   * @description First name.
   */
  first_name?: string;
  /**
   * @description ID number. When `id_number_type` is `us_ssn`, only the last 4 digits are present.
   */
  id_number?: string;
  /**
   * @description Type of ID number.
   */
  id_number_type?: 'br_cpf' | 'sg_nric' | 'us_ssn';
  /**
   * @description Last name.
   */
  last_name?: string;
  /**
   * @description Status of this `id_number` check.
   */
  status: 'unverified' | 'verified';
}

/**
 * @title GelatoVerificationReportOptions
 */
export type gelato_verification_report_options = {
  document?: gelato_report_document_options;
  id_number?: gelato_report_id_number_options;
}

/**
 * @title GelatoPhoneReport
 * @description Result from a phone check
 */
export type gelato_phone_report = {
  /**
   * @description Details on the verification error. Present when status is `unverified`.
   */
  error?: any;
  /**
   * @description Phone to be verified.
   */
  phone?: string;
  /**
   * @description Status of this `phone` check.
   */
  status: 'unverified' | 'verified';
}

/**
 * @title GelatoSelfieReport
 * @description Result from a selfie check
 */
export type gelato_selfie_report = {
  /**
   * @description ID of the [File](https://docs.stripe.com/api/files) holding the image of the identity document used in this check.
   */
  document?: string;
  /**
   * @description Details on the verification error. Present when status is `unverified`.
   */
  error?: any;
  /**
   * @description ID of the [File](https://docs.stripe.com/api/files) holding the image of the selfie used in this check.
   */
  selfie?: string;
  /**
   * @description Status of this `selfie` check.
   */
  status: 'unverified' | 'verified';
}

/**
 * @title GelatoSessionLastError
 * @description Shows last VerificationSession error
 */
export type gelato_session_last_error = {
  /**
   * @description A short machine-readable string giving the reason for the verification or user-session failure.
   */
  code?: 'abandoned' | 'consent_declined' | 'country_not_supported' | 'device_not_supported' | 'document_expired' | 'document_type_not_supported' | 'document_unverified_other' | 'email_unverified_other' | 'email_verification_declined' | 'id_number_insufficient_document_data' | 'id_number_mismatch' | 'id_number_unverified_other' | 'phone_unverified_other' | 'phone_verification_declined' | 'selfie_document_missing_photo' | 'selfie_face_mismatch' | 'selfie_manipulated' | 'selfie_unverified_other' | 'under_supported_age';
  /**
   * @description A message that explains the reason for verification or user-session failure.
   */
  reason?: string;
}

/**
 * @title GelatoVerificationSessionOptions
 */
export type gelato_verification_session_options = {
  document?: gelato_session_document_options;
  email?: gelato_session_email_options;
  id_number?: gelato_session_id_number_options;
  matching?: gelato_session_matching_options;
  phone?: gelato_session_phone_options;
}

/**
 * @title GelatoProvidedDetails
 */
export type gelato_provided_details = {
  /**
   * @description Email of user being verified
   */
  email?: string;
  /**
   * @description Phone number of user being verified
   */
  phone?: string;
}

export type verification_session_redaction = {
  /**
   * @description Indicates whether this object and its related objects have been redacted or not.
   */
  status: 'processing' | 'redacted' | 'validated';
}

/**
 * @title GelatoRelatedPerson
 */
export type gelato_related_person = {
  /**
   * @description Token referencing the associated Account of the related Person resource.
   */
  account: string;
  /**
   * @description Token referencing the related Person resource.
   */
  person: string;
}

/**
 * @title GelatoVerifiedOutputs
 */
export type gelato_verified_outputs = {
  /**
   * @description The user's verified address.
   */
  address?: any;
  /**
   * @description The user’s verified date of birth.
   */
  dob?: any;
  /**
   * @description The user's verified email address
   */
  email?: string;
  /**
   * @description The user's verified first name.
   */
  first_name?: string;
  /**
   * @description The user's verified id number.
   */
  id_number?: string;
  /**
   * @description The user's verified id number type.
   */
  id_number_type?: 'br_cpf' | 'sg_nric' | 'us_ssn';
  /**
   * @description The user's verified last name.
   */
  last_name?: string;
  /**
   * @description The user's verified phone number
   */
  phone?: string;
  /**
   * @description The user's verified sex.
   */
  sex?: '[redacted]' | 'female' | 'male' | 'unknown';
  /**
   * @description The user's verified place of birth as it appears in the document.
   */
  unparsed_place_of_birth?: string;
  /**
   * @description The user's verified sex as it appears in the document.
   */
  unparsed_sex?: string;
}

/**
 * @title Address
 */
export type address = {
  /**
   * @description City, district, suburb, town, or village.
   */
  city?: string;
  /**
   * @description Two-letter country code ([ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)).
   */
  country?: string;
  /**
   * @description Address line 1, such as the street, PO Box, or company name.
   */
  line1?: string;
  /**
   * @description Address line 2, such as the apartment, suite, unit, or building.
   */
  line2?: string;
  /**
   * @description ZIP or postal code.
   */
  postal_code?: string;
  /**
   * @description State, county, province, or region ([ISO 3166-2](https://en.wikipedia.org/wiki/ISO_3166-2)).
   */
  state?: string;
}

/**
 * @title GelatoDataDocumentReportDateOfBirth
 * @description Point in Time
 */
export type gelato_data_document_report_date_of_birth = {
  /**
   * @description Numerical day between 1 and 31.
   */
  day?: number;
  /**
   * @description Numerical month between 1 and 12.
   */
  month?: number;
  /**
   * @description The four-digit year.
   */
  year?: number;
}

/**
 * @title GelatoDocumentReportError
 */
export type gelato_document_report_error = {
  /**
   * @description A short machine-readable string giving the reason for the verification failure.
   */
  code?: 'document_expired' | 'document_type_not_supported' | 'document_unverified_other';
  /**
   * @description A human-readable message giving the reason for the failure. These messages can be shown to your users.
   */
  reason?: string;
}

/**
 * @title GelatoDataDocumentReportExpirationDate
 * @description Point in Time
 */
export type gelato_data_document_report_expiration_date = {
  /**
   * @description Numerical day between 1 and 31.
   */
  day?: number;
  /**
   * @description Numerical month between 1 and 12.
   */
  month?: number;
  /**
   * @description The four-digit year.
   */
  year?: number;
}

/**
 * @title GelatoDataDocumentReportIssuedDate
 * @description Point in Time
 */
export type gelato_data_document_report_issued_date = {
  /**
   * @description Numerical day between 1 and 31.
   */
  day?: number;
  /**
   * @description Numerical month between 1 and 12.
   */
  month?: number;
  /**
   * @description The four-digit year.
   */
  year?: number;
}

/**
 * @title GelatoEmailReportError
 */
export type gelato_email_report_error = {
  /**
   * @description A short machine-readable string giving the reason for the verification failure.
   */
  code?: 'email_unverified_other' | 'email_verification_declined';
  /**
   * @description A human-readable message giving the reason for the failure. These messages can be shown to your users.
   */
  reason?: string;
}

/**
 * @title GelatoDataIdNumberReportDate
 * @description Point in Time
 */
export type gelato_data_id_number_report_date = {
  /**
   * @description Numerical day between 1 and 31.
   */
  day?: number;
  /**
   * @description Numerical month between 1 and 12.
   */
  month?: number;
  /**
   * @description The four-digit year.
   */
  year?: number;
}

/**
 * @title GelatoIdNumberReportError
 */
export type gelato_id_number_report_error = {
  /**
   * @description A short machine-readable string giving the reason for the verification failure.
   */
  code?: 'id_number_insufficient_document_data' | 'id_number_mismatch' | 'id_number_unverified_other';
  /**
   * @description A human-readable message giving the reason for the failure. These messages can be shown to your users.
   */
  reason?: string;
}

/**
 * @title GelatoReportDocumentOptions
 */
export type gelato_report_document_options = {
  /**
   * @description Array of strings of allowed identity document types. If the provided identity document isn’t one of the allowed types, the verification check will fail with a document_type_not_allowed error code.
   */
  allowed_types?: Array<'driving_license' | 'id_card' | 'passport'>;
  /**
   * @description Collect an ID number and perform an [ID number check](https://docs.stripe.com/identity/verification-checks?type=id-number) with the document’s extracted name and date of birth.
   */
  require_id_number?: boolean;
  /**
   * @description Disable image uploads, identity document images have to be captured using the device’s camera.
   */
  require_live_capture?: boolean;
  /**
   * @description Capture a face image and perform a [selfie check](https://docs.stripe.com/identity/verification-checks?type=selfie) comparing a photo ID and a picture of your user’s face. [Learn more](https://docs.stripe.com/identity/selfie).
   */
  require_matching_selfie?: boolean;
}

/**
 * @title GelatoReportIdNumberOptions
 */
export type gelato_report_id_number_options = {

}

/**
 * @title GelatoPhoneReportError
 */
export type gelato_phone_report_error = {
  /**
   * @description A short machine-readable string giving the reason for the verification failure.
   */
  code?: 'phone_unverified_other' | 'phone_verification_declined';
  /**
   * @description A human-readable message giving the reason for the failure. These messages can be shown to your users.
   */
  reason?: string;
}

/**
 * @title GelatoSelfieReportError
 */
export type gelato_selfie_report_error = {
  /**
   * @description A short machine-readable string giving the reason for the verification failure.
   */
  code?: 'selfie_document_missing_photo' | 'selfie_face_mismatch' | 'selfie_manipulated' | 'selfie_unverified_other';
  /**
   * @description A human-readable message giving the reason for the failure. These messages can be shown to your users.
   */
  reason?: string;
}

/**
 * @title GelatoSessionDocumentOptions
 */
export type gelato_session_document_options = {
  /**
   * @description Array of strings of allowed identity document types. If the provided identity document isn’t one of the allowed types, the verification check will fail with a document_type_not_allowed error code.
   */
  allowed_types?: Array<'driving_license' | 'id_card' | 'passport'>;
  /**
   * @description Collect an ID number and perform an [ID number check](https://docs.stripe.com/identity/verification-checks?type=id-number) with the document’s extracted name and date of birth.
   */
  require_id_number?: boolean;
  /**
   * @description Disable image uploads, identity document images have to be captured using the device’s camera.
   */
  require_live_capture?: boolean;
  /**
   * @description Capture a face image and perform a [selfie check](https://docs.stripe.com/identity/verification-checks?type=selfie) comparing a photo ID and a picture of your user’s face. [Learn more](https://docs.stripe.com/identity/selfie).
   */
  require_matching_selfie?: boolean;
}

/**
 * @title GelatoSessionEmailOptions
 */
export type gelato_session_email_options = {
  /**
   * @description Request one time password verification of `provided_details.email`.
   */
  require_verification?: boolean;
}

/**
 * @title GelatoSessionIdNumberOptions
 */
export type gelato_session_id_number_options = {

}

/**
 * @title GelatoSessionMatchingOptions
 */
export type gelato_session_matching_options = {
  /**
   * @description Strictness of the DOB matching policy to apply.
   */
  dob?: 'none' | 'similar';
  /**
   * @description Strictness of the name matching policy to apply.
   */
  name?: 'none' | 'similar';
}

/**
 * @title GelatoSessionPhoneOptions
 */
export type gelato_session_phone_options = {
  /**
   * @description Request one time password verification of `provided_details.phone`.
   */
  require_verification?: boolean;
}

/**
 * @title GelatoDataVerifiedOutputsDate
 * @description Point in Time
 */
export type gelato_data_verified_outputs_date = {
  /**
   * @description Numerical day between 1 and 31.
   */
  day?: number;
  /**
   * @description Numerical month between 1 and 12.
   */
  month?: number;
  /**
   * @description The four-digit year.
   */
  year?: number;
}

/**
 * @title GelatoVerificationReport
 * @description A VerificationReport is the result of an attempt to collect and verify data from a user.
The collection of verification checks performed is determined from the `type` and `options`
parameters used. You can find the result of each verification check performed in the
appropriate sub-resource: `document`, `id_number`, `selfie`.

Each VerificationReport contains a copy of any data collected by the user as well as
reference IDs which can be used to access collected images through the [FileUpload](https://docs.stripe.com/api/files)
API. To configure and create VerificationReports, use the
[VerificationSession](https://docs.stripe.com/api/identity/verification_sessions) API.

Related guide: [Accessing verification results](https://docs.stripe.com/identity/verification-sessions#results).
 */
export type stripe_identity_verification_report = {
  /**
   * @description A string to reference this user. This can be a customer ID, a session ID, or similar, and can be used to reconcile this verification with your internal systems.
   */
  client_reference_id?: string;
  /**
   * @description Time at which the object was created. Measured in seconds since the Unix epoch.
   */
  created: number;
  document?: gelato_document_report;
  email?: gelato_email_report;
  /**
   * @description Unique identifier for the object.
   */
  id: string;
  id_number?: gelato_id_number_report;
  /**
   * @description If the object exists in live mode, the value is `true`. If the object exists in test mode, the value is `false`.
   */
  livemode: boolean;
  /**
   * @description String representing the object's type. Objects of the same type share the same value.
   */
  object: 'identity.verification_report';
  options?: gelato_verification_report_options;
  phone?: gelato_phone_report;
  selfie?: gelato_selfie_report;
  /**
   * @description Type of report.
   */
  type: 'document' | 'id_number' | 'verification_flow';
  /**
   * @description The configuration token of a verification flow from the dashboard.
   */
  verification_flow?: string;
  /**
   * @description ID of the VerificationSession that created this report.
   */
  verification_session?: string;
}

/**
 * @title GelatoVerificationSession
 * @description A VerificationSession guides you through the process of collecting and verifying the identities
of your users. It contains details about the type of verification, such as what [verification
check](https://docs.stripe.com/identity/verification-checks) to perform. Only create one VerificationSession for
each verification in your system.

A VerificationSession transitions through [multiple
statuses](https://docs.stripe.com/identity/how-sessions-work) throughout its lifetime as it progresses through
the verification flow. The VerificationSession contains the user's verified data after
verification checks are complete.

Related guide: [The Verification Sessions API](https://docs.stripe.com/identity/verification-sessions)
 */
export type stripe_identity_verification_session = {
  /**
   * @description A string to reference this user. This can be a customer ID, a session ID, or similar, and can be used to reconcile this verification with your internal systems.
   */
  client_reference_id?: string;
  /**
   * @description The short-lived client secret used by Stripe.js to [show a verification modal](https://docs.stripe.com/js/identity/modal) inside your app. This client secret expires after 24 hours and can only be used once. Don’t store it, log it, embed it in a URL, or expose it to anyone other than the user. Make sure that you have TLS enabled on any page that includes the client secret. Refer to our docs on [passing the client secret to the frontend](https://docs.stripe.com/identity/verification-sessions#client-secret) to learn more.
   */
  client_secret?: string;
  /**
   * @description Time at which the object was created. Measured in seconds since the Unix epoch.
   */
  created: number;
  /**
   * @description Unique identifier for the object.
   */
  id: string;
  /**
   * @description If present, this property tells you the last error encountered when processing the verification.
   */
  last_error?: any;
  /**
   * @description ID of the most recent VerificationReport. [Learn more about accessing detailed verification results.](https://docs.stripe.com/identity/verification-sessions#results)
   */
  last_verification_report?: any;
  /**
   * @description If the object exists in live mode, the value is `true`. If the object exists in test mode, the value is `false`.
   */
  livemode: boolean;
  /**
   * @description Set of [key-value pairs](https://docs.stripe.com/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format.
   */
  metadata: Record<any, string>;
  /**
   * @description String representing the object's type. Objects of the same type share the same value.
   */
  object: 'identity.verification_session';
  /**
   * @description A set of options for the session’s verification checks.
   */
  options?: any;
  /**
   * @description Details provided about the user being verified. These details may be shown to the user.
   */
  provided_details?: any;
  /**
   * @description Redaction status of this VerificationSession. If the VerificationSession is not redacted, this field will be null.
   */
  redaction?: any;
  /**
   * @description Customer ID
   */
  related_customer?: string;
  /**
   * @description The ID of the Account representing a customer.
   */
  related_customer_account?: string;
  related_person?: gelato_related_person;
  /**
   * @description Status of this VerificationSession. [Learn more about the lifecycle of sessions](https://docs.stripe.com/identity/how-sessions-work).
   */
  status: 'canceled' | 'processing' | 'requires_input' | 'verified';
  /**
   * @description The type of [verification check](https://docs.stripe.com/identity/verification-checks) to be performed.
   */
  type: 'document' | 'id_number' | 'verification_flow';
  /**
   * @description The short-lived URL that you use to redirect a user to Stripe to submit their identity information. This URL expires after 48 hours and can only be used once. Don’t store it, log it, send it in emails or expose it to anyone other than the user. Refer to our docs on [verifying identity documents](https://docs.stripe.com/identity/verify-identity-documents?platform=web&type=redirect) to learn how to redirect users to Stripe.
   */
  url?: string;
  /**
   * @description The configuration token of a verification flow from the dashboard.
   */
  verification_flow?: string;
  /**
   * @description The user’s verified data.
   */
  verified_outputs?: any;
}

/**
 * @description An error response from the Stripe API.
 */
export type stripe_error = {
  error: stripe_api_error;
}

/**
 * @description Common Stripe Identity error details. Identity-relevant public fields are modeled while additional Stripe fields remain allowed.
 */
export type stripe_api_error = {
  /**
   * @description A Stripe error code that can be handled programmatically.
   */
  code?: string;
  /**
   * @description An official documentation URL for the reported error code.
   */
  doc_url?: string;
  /**
   * @description A human-readable message with more details about the error.
   */
  message?: string;
  /**
   * @description For a parameter-specific error, the related parameter name.
   */
  param?: string;
  /**
   * @description A URL to the request log entry in the Stripe Dashboard.
   */
  request_log_url?: string;
  /**
   * @description The type of error returned by Stripe.
   */
  type: 'api_error' | 'card_error' | 'idempotency_error' | 'invalid_request_error';
}