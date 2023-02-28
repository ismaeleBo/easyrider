import React from 'react';
import { View } from 'react-native';
import TextInput from 'easyrider/src/components/TextInput/TextInput';
import { useFormik } from 'formik';

const SignupForm = () => {
  const submitForm = () => console.log('form submitted');

  const { values, errors, isSubmitting, handleSubmit, setFieldValue } =
    useFormik({
      initialValues: { email: undefined, name: undefined, password: undefined },
      onSubmit: submitForm,
    });
  return (
    <View className='w-full px-20 mt-20'>
      <TextInput
        onFocus={() => null}
        iconName='email-outline'
        placeholder='Email address'
        onChangeText={(email) => setFieldValue('email', email)}
        value={values.email}
        autoCapitalize='none'
        marginBottom={20}
      />
      <TextInput
        onFocus={() => null}
        iconName='email-outline'
        placeholder='Business name'
        onChangeText={(name) => setFieldValue('name', name)}
        value={values.name}
        marginBottom={20}
      />
      <TextInput
        onFocus={() => null}
        iconName='email-outline'
        placeholder='Password'
        onChangeText={(password) => setFieldValue('password', password)}
        value={values.password}
        marginBottom={20}
      />
    </View>
  );
};

export default SignupForm;
