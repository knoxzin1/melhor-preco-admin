import t from 'tcomb-form-native';

const LoginModel = t.struct({
  email: t.String,
  password: t.String,
});

const options = {
  fields: {
    email: {
      keyboardType: 'email-address',
      label: 'Email',
    },
    password: {
      secureTextEntry: true,
      label: 'Senha',
    },
  },
};

export {
  LoginModel,
  options,
};
