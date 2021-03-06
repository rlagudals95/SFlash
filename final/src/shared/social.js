import { config } from "./config";

export const API_BASE_URL = `${config.api}`;

export const OAUTH2_REDIRECT_URI = "https://sflash.net/oauth2/redirect";

export const NAVER_AUTH_URL =
    API_BASE_URL + "/oauth2/authorize/naver?redirect_uri=" + OAUTH2_REDIRECT_URI;
export const KAKAO_AUTH_URL =
    API_BASE_URL + "/oauth2/authorize/kakao?redirect_uri=" + OAUTH2_REDIRECT_URI;
export const GOOGLE_AUTH_URL =
    API_BASE_URL + "/oauth2/authorize/google?redirect_uri=" + OAUTH2_REDIRECT_URI;
