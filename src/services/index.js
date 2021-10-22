import md5 from 'crypto-js/md5';

const GRAVATAR = 'https://www.gravatar.com/avatar/';
const EMAIL_TO_HASH = (email) => md5(email).toString();
const GRAVATAR_EMAIL = (email) => `${GRAVATAR}${EMAIL_TO_HASH(email)}`;

export default GRAVATAR_EMAIL;
