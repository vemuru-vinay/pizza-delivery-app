import bcrypt from 'bcryptjs';

const hashPassword = async () => {
  const plainPassword = 'admin123';
  const hashed = await bcrypt.hash(plainPassword, 10);
  console.log('Hashed password:', hashed);
};

hashPassword();
