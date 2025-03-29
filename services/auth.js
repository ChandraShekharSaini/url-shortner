import jwt from 'jsonwebtoken';

const secretKey = 'sparsh@1234';

function setUser(user) {
  return jwt.sign(
    {
      email: user.email,
      role: user.role,
    },
    secretKey
  );
}

function getUser(token) {
  if (!token) {
    return null;
  }

  try {
    return jwt.verify(token, secretKey);
  } catch (err) {
    return null;
  }
}

export { setUser, getUser };
