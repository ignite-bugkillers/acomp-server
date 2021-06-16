export const authConfig = {
  secret: process.env.SECRET as string,
  expiresIn: '4h',
};
