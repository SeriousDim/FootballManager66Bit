export const BACKEND_URL = 'http://127.0.0.1:8081';
export const TIMEOUT = 5000;

export const WS_URL = 'ws://127.0.0.1:8081';
export const WS_URL_CONNECT = WS_URL + '/ws-message';

export const PREFIX_TO_SUBSCRIBE = '/topic';
export const PREFIX_TO_SEND = '/ws';

export const EVENT_REFRESH = PREFIX_TO_SUBSCRIBE + '/refresh';
export const EVENT_POST_FOOTBALLER = PREFIX_TO_SEND + '/post_footballers';
