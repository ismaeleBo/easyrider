import { RefObject, useCallback, useEffect } from 'react';
import { InteractionManager, TextInput } from 'react-native';

// The `autoFocus` prop of the `TextInput` doesn't work on Android, because of
// a bug with React Navigation, so we need to handle it manually. Check:
// - https://github.com/react-navigation/react-navigation/issues/9875
// - https://github.com/react-navigation/react-navigation/issues/10014
const useAutoFocus = (
  textInputRef: RefObject<TextInput>,
  autoFocus: boolean | undefined,
): void => {
  const focusTextInput = useCallback(() => {
    textInputRef.current?.focus();
  }, [textInputRef]);

  useEffect(() => {
    if (autoFocus) {
      InteractionManager.runAfterInteractions(focusTextInput);
    }
  }, [autoFocus, focusTextInput]);
};

export default useAutoFocus;
