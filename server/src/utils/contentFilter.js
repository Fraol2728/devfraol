const BLOCKED_WORDS = [
  // English
  'fuck',
  'fucking',
  'fucker',
  'shit',
  'shitting',
  'bitch',
  'bitches',
  'cunt',
  'dick',
  'pussy',
  'cock',
  'asshole',
  'bastard',
  'motherfucker',
  'whore',
  'slut',
  'faggot',
  'retard',
  'nigger',
  'nigga',
  'prick',
  'wanker',
  'twat',
  'bollocks',
  'bullshit',
  // Hindi/Bengali romanized
  'madarchod',
  'behenchod',
  'bhenchod',
  'chutiya',
  'gaandu',
  'gandu',
  'haramzada',
  'harami',
  'randi',
  'bhosdike',
  'loda',
  'chut',
  'saala',
  'maderchod',
  'mc',
  'bc',
  'bkl',
  'bsdk',
];

const DISPOSABLE_EMAIL_DOMAINS = [
  'mailinator.com',
  'guerrillamail.com',
  'tempmail.com',
  'throwam.com',
  'yopmail.com',
  '10minutemail.com',
  'fakeinbox.com',
  'maildrop.cc',
  'trashmail.com',
  'getairmail.com',
  'mailnull.com',
  'spamgourmet.com',
  'sharklasers.com',
  'guerrillamailblock.com',
  'spam4.me',
];

const normalize = (text) =>
  text
    .toLowerCase()
    .replace(/0/g, 'o')
    .replace(/1/g, 'i')
    .replace(/3/g, 'e')
    .replace(/4/g, 'a')
    .replace(/5/g, 's')
    .replace(/[^a-z\s]/g, '')
    .trim();

const containsBlockedWord = (text) => {
  const normalized = normalize(text);
  return BLOCKED_WORDS.some((word) => {
    const pattern = new RegExp(`\\b${word}\\b`, 'i');
    return pattern.test(normalized) || normalized.includes(word);
  });
};

const isValidNameFormat = (name) => /^[a-zA-Z\u0080-\uFFFF\s''-]{2,100}$/.test(name.trim());

const hasExcessiveCaps = (text) => {
  const letters = text.replace(/[^a-zA-Z]/g, '');
  if (letters.length < 8) return false;
  return text.replace(/[^A-Z]/g, '').length / letters.length > 0.7;
};

const hasRepeatedChars = (text) => /(.)\1{4,}/.test(text);

const containsUrl = (text) => /https?:\/\/\S+|www\.\S+\.\S+/i.test(text);

const isDisposableEmail = (email) => {
  const domain = email.split('@')[1]?.toLowerCase();
  return !!domain && DISPOSABLE_EMAIL_DOMAINS.includes(domain);
};

const hasSpamPattern = (text) =>
  /\b(buy now|click here|free money|make money fast|earn \$|casino|bitcoin|crypto investment|guaranteed profit|you have won|claim your prize)\b/i.test(
    text,
  );

const checkField = (value, fieldName) => {
  if (containsBlockedWord(value)) {
    return `${fieldName} contains inappropriate language`;
  }
  if (hasExcessiveCaps(value)) {
    return `${fieldName} should not be in all caps`;
  }
  if (hasRepeatedChars(value)) {
    return `${fieldName} contains invalid repeated characters`;
  }
  if (hasSpamPattern(value)) {
    return `${fieldName} contains spam content`;
  }
  return null;
};

const filterContact = ({ name, email, subject, message }) => {
  const errors = [];

  if (!isValidNameFormat(name)) {
    errors.push({ field: 'name', message: 'Name can only contain letters and spaces' });
  } else {
    const nameErr = checkField(name, 'Name');
    if (nameErr) errors.push({ field: 'name', message: nameErr });
  }

  if (isDisposableEmail(email)) {
    errors.push({ field: 'email', message: 'Disposable email addresses are not accepted' });
  }

  const subjectErr = checkField(subject, 'Subject');
  if (subjectErr) errors.push({ field: 'subject', message: subjectErr });

  if (containsUrl(message)) {
    errors.push({ field: 'message', message: 'Links are not allowed in messages' });
  } else {
    const messageErr = checkField(message, 'Message');
    if (messageErr) errors.push({ field: 'message', message: messageErr });
  }

  return errors;
};

module.exports = { filterContact };
