// environment config variables for test/dev/prod
export const DEFAULT_ENVIRONMENT = {
  apiUrl: "http://localhost:5000",
  docManUrl: "http://localhost:5001",
  matomoUrl: "https://matomo-4c2ba9-test.apps.silver.devops.gov.bc.ca/",
  environment: "development",
  keycloak_resource: "mines-application-local",
  keycloak_clientId: "minespace-local",
  keycloak_idir_idpHint: "local",
  keycloak_bceid_idpHint: "local",
  keycloak_vcauthn_idpHint: "local",
  keycloak_url: "https://test.oidc.gov.bc.ca/auth",
  siteminder_url: "https://logontest.gov.bc.ca",
  vcauthn_pres_req_conf_id: "minespace-access-0.1-dev",
};

export const WINDOW_LOCATION = `${window.location.origin}${process.env.BASE_PATH}`;

export const BCEID_LOGIN_REDIRECT_URI = `${WINDOW_LOCATION}/return-page?type=login`;
export const KEYCLOAK_LOGOUT_REDIRECT_URI = `${WINDOW_LOCATION}/return-page?type=logout`;
export const SITEMINDER_LOGOUT_REDIRECT_URI = `${WINDOW_LOCATION}/return-page?type=smlogout&retnow=1`;
