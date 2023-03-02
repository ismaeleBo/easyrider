import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import TextInput from 'easyrider/src/components/TextInput/TextInput';
import { useFormik } from 'formik';
import ButtonPrimary from 'easyrider/src/components/ButtonPrimary';
import * as Yup from 'yup';
import { useLanguage } from 'easyrider/src/hooks/useLanguage';
import { useSignupMutation } from 'easyrider/src/api';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  WelcomeStackParamList,
  WelcomeStackRouteNames,
} from 'easyrider/src/navigation/WelcomeStack/WelcomeStackParamList';

interface Address {
  country?: string;
  city?: string;
  street?: string;
  doorNumber?: string;
  postalCode?: string;
}

interface SignupFormValues {
  email?: string;
  phoneNumber?: string;
  name?: string;
  surname?: string;
  restaurantName?: string;
  password?: string;
  confirmPassword?: string;
  address?: Address;
}

const SignupForm = () => {
  const [t] = useLanguage();

  const getErrMessage = (fieldName: string): string => {
    return t('mandatoryFieldError', { name: fieldName });
  };

  const PSW_MIN_LENGTH = 8;

  const AddressSchema = Yup.object<Address>({
    country: Yup.string().required(getErrMessage(t('country'))),
    city: Yup.string().required(getErrMessage(t('city'))),
    street: Yup.string().required(getErrMessage(t('street'))),
    doorNumber: Yup.string().required(getErrMessage(t('doorNumber'))),
    postalCode: Yup.string().required(getErrMessage(t('postalCode'))),
  });

  const SignupFormSchema = Yup.object<SignupFormValues>({
    email: Yup.string()
      .email(t('invalidEmail'))
      .required(getErrMessage(t('email'))),
    name: Yup.string().required(getErrMessage(t('name'))),
    surname: Yup.string().required(getErrMessage(t('surname'))),
    phoneNumber: Yup.string().required(getErrMessage(t('phoneNumber'))),
    restaurantName: Yup.string().required(getErrMessage(t('restaurantName'))),
    address: AddressSchema,
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

  const [signup, { isLoading, isError, isSuccess }] = useSignupMutation();

  const navigation =
    useNavigation<NativeStackNavigationProp<WelcomeStackParamList>>();

  const submitForm = async (values: SignupFormValues) => {
    await signup(values);
  };

  useEffect(() => {
    if (isSuccess) {
      navigation.navigate(WelcomeStackRouteNames.SIGNUP_SUCCESS);
    }
  }, [isSuccess, navigation]);

  const { values, errors, handleSubmit, setFieldValue, isValid } = useFormik({
    initialValues: {
      email: undefined,
      phoneNumber: undefined,
      name: undefined,
      surname: undefined,
      restaurantName: undefined,
      address: {
        country: undefined,
        city: undefined,
        street: undefined,
        doorNumber: undefined,
        postalCode: undefined,
      },
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
        title={t('restaurantName')}
        errorMessage={errors.restaurantName}
        onChangeText={(restaurantName) =>
          setFieldValue('restaurantName', restaurantName)
        }
        value={values.restaurantName}
        marginBottom={20}
      />
      <TextInput
        title={t('phoneNumber')}
        errorMessage={errors.phoneNumber}
        onChangeText={(phoneNumber) =>
          setFieldValue('phoneNumber', phoneNumber)
        }
        value={values.phoneNumber}
        marginBottom={20}
      />
      <TextInput
        title={t('country')}
        errorMessage={errors.address?.country}
        onChangeText={(country) => setFieldValue('address.country', country)}
        value={values.address.country}
        marginBottom={20}
      />
      <TextInput
        title={t('city')}
        errorMessage={errors.address?.city}
        onChangeText={(city) => setFieldValue('address.city', city)}
        value={values.address.city}
        marginBottom={20}
      />
      <TextInput
        title={t('street')}
        errorMessage={errors.address?.street}
        onChangeText={(street) => setFieldValue('address.street', street)}
        value={values.address.street}
        marginBottom={20}
      />
      <TextInput
        title={t('doorNumber')}
        errorMessage={errors.address?.doorNumber}
        onChangeText={(doorNumber) =>
          setFieldValue('address.doorNumber', doorNumber)
        }
        value={values.address.doorNumber}
        marginBottom={20}
      />
      <TextInput
        title={t('postalCode')}
        errorMessage={errors.address?.postalCode}
        onChangeText={(postalCode) =>
          setFieldValue('address.postalCode', postalCode)
        }
        value={values.address.postalCode}
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
        disabled={!isValid || isLoading}
      />
      {isError && (
        <Text className='text-red-500 text-14 font-medium mt-8'>
          C'è stato un problema con la registrazione
        </Text>
      )}
    </View>
  );
};

export default SignupForm;
