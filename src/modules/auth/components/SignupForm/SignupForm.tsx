import React from 'react';
import { View } from 'react-native';
import TextInput from 'easyrider/src/components/TextInput/TextInput';
import { useFormik } from 'formik';
import ButtonPrimary from 'easyrider/src/components/ButtonPrimary';
import * as Yup from 'yup';
import { useLanguage } from 'easyrider/src/hooks/useLanguage';

interface SignupFormValues {
  email?: string;
  name?: string;
  surname?: string;
  businessName?: string;
  password?: string;
  confirmPassword?: string;
}

const SignupForm = () => {
  const [t] = useLanguage();

  const getErrMessage = (fieldName: string): string => {
    return t('mandatoryFieldError', { name: fieldName });
  };

  const PSW_MIN_LENGTH = 8;

  const SignupFormSchema = Yup.object({
    email: Yup.string()
      .email()
      .required(getErrMessage(t('email'))),
    name: Yup.string().required(getErrMessage(t('name'))),
    surname: Yup.string().required(getErrMessage(t('surname'))),
    password: Yup.string()
      .min(
        PSW_MIN_LENGTH,
        t('passwordLengthError', { minLength: PSW_MIN_LENGTH }),
      )
      .required(getErrMessage(t('password'))),
    confirmPassword: Yup.string()
      .required(t('confirmPasswordError'))
      .oneOf([Yup.ref('password')], t('confirmPasswordNotValid')),
  }).required();

  const submitForm = (values: SignupFormValues) =>
    console.log('form submitted', values);

  const { values, errors, handleSubmit, setFieldValue, isValid } = useFormik({
    initialValues: {
      email: undefined,
      name: undefined,
      surname: undefined,
      password: undefined,
      confirmPassword: undefined,
    },
    validationSchema: SignupFormSchema,
    validateOnMount: true,
    onSubmit: submitForm,
  });

  return (
    <View className='w-full px-20 mt-20'>
      <TextInput
        title={t('email')}
        onChangeText={(email) => setFieldValue('email', email)}
        value={values.email}
        errorMessage={errors.email}
        autoCapitalize='none'
        marginBottom={20}
      />
      <TextInput
        title={t('name')}
        errorMessage={errors.name}
        onChangeText={(name) => setFieldValue('name', name)}
        value={values.name}
        marginBottom={20}
      />
      <TextInput
        title={t('surname')}
        errorMessage={errors.surname}
        onChangeText={(surname) => setFieldValue('surname', surname)}
        value={values.surname}
        marginBottom={20}
      />
      <TextInput
        title={t('password')}
        errorMessage={errors.password}
        onChangeText={(password) => setFieldValue('password', password)}
        value={values.password}
        marginBottom={20}
        autoCapitalize='none'
        password
      />
      <TextInput
        title={t('confirmPassword')}
        errorMessage={errors.confirmPassword}
        onChangeText={(confirmPassword) =>
          setFieldValue('confirmPassword', confirmPassword)
        }
        value={values.confirmPassword}
        marginBottom={50}
        autoCapitalize='none'
        password
      />
      <ButtonPrimary
        title='Crea account'
        onPress={handleSubmit}
        customWrapper='bg-red-100'
        customText='text-white'
        disabled={!isValid}
      />
    </View>
  );
};

export default SignupForm;
