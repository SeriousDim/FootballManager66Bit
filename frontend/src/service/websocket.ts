import Stomp, {Frame} from 'stompjs';
import {EVENT_REFRESH, WS_URL_CONNECT} from '../const/api-config';

const ws = new WebSocket(WS_URL_CONNECT);
const stompClient = Stomp.over(ws);

const onConnect = function (frame: Frame | undefined) {
  stompClient.subscribe(EVENT_REFRESH, function (data) {

  });
};

stompClient.connect({}, onConnect);

export default stompClient;
