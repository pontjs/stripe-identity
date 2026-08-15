export const specMeta = {
  name: "Stripe Identity API",
  hasTags: false,
  url: [
    {
      url: "https://api.stripe.com"
    }
  ],
  apis: {
    "getIdentityVerificationReports": {
      method: "GET",
      path: "/v1/identity/verification_reports",
      consumes: [],
      produces: ["application/json"],
      pathParams: null,
      queryParams: ["client_reference_id", "created", "ending_before", "expand", "limit", "starting_after", "type", "verification_session"],
      bodyParams: null
    },

    "getIdentityVerificationReportsReport": {
      method: "GET",
      path: "/v1/identity/verification_reports/{report}",
      consumes: [],
      produces: ["application/json"],
      pathParams: ["report"],
      queryParams: ["expand"],
      bodyParams: null
    },

    "getIdentityVerificationSessions": {
      method: "GET",
      path: "/v1/identity/verification_sessions",
      consumes: [],
      produces: ["application/json"],
      pathParams: null,
      queryParams: ["client_reference_id", "created", "ending_before", "expand", "limit", "related_customer", "related_customer_account", "starting_after", "status"],
      bodyParams: null
    },

    "postIdentityVerificationSessions": {
      method: "POST",
      path: "/v1/identity/verification_sessions",
      consumes: ["application/x-www-form-urlencoded"],
      produces: ["application/json"],
      pathParams: null,
      queryParams: null,
      bodyParams: {
        contentType: "application/x-www-form-urlencoded",
        canMerge: false
      }
    },

    "getIdentityVerificationSessionsSession": {
      method: "GET",
      path: "/v1/identity/verification_sessions/{session}",
      consumes: [],
      produces: ["application/json"],
      pathParams: ["session"],
      queryParams: ["expand"],
      bodyParams: null
    },

    "postIdentityVerificationSessionsSession": {
      method: "POST",
      path: "/v1/identity/verification_sessions/{session}",
      consumes: ["application/x-www-form-urlencoded"],
      produces: ["application/json"],
      pathParams: ["session"],
      queryParams: null,
      bodyParams: {
        contentType: "application/x-www-form-urlencoded",
        canMerge: false
      }
    },

    "postIdentityVerificationSessionsSessionCancel": {
      method: "POST",
      path: "/v1/identity/verification_sessions/{session}/cancel",
      consumes: ["application/x-www-form-urlencoded"],
      produces: ["application/json"],
      pathParams: ["session"],
      queryParams: null,
      bodyParams: {
        contentType: "application/x-www-form-urlencoded",
        canMerge: false
      }
    },

    "postIdentityVerificationSessionsSessionRedact": {
      method: "POST",
      path: "/v1/identity/verification_sessions/{session}/redact",
      consumes: ["application/x-www-form-urlencoded"],
      produces: ["application/json"],
      pathParams: ["session"],
      queryParams: null,
      bodyParams: {
        contentType: "application/x-www-form-urlencoded",
        canMerge: false
      }
    }
  }
} as const;
