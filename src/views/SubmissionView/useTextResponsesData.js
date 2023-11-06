import { useCallback } from 'react';

import { StrictDict, useKeyedState } from '@edx/react-unit-test-utils';
import { useTextResponses } from 'data/services/lms/hooks/selectors';

import { useSaveResponse } from 'data/services/lms/hooks/actions';
import { MutationStatus } from 'data/services/lms/constants';

export const stateKeys = StrictDict({
  textResponses: 'textResponses',
  isDirty: 'isDirty',
});

const useTextResponsesData = () => {
  const textResponses = useTextResponses();

  const [isDirty, setIsDirty] = useKeyedState(stateKeys.isDirty, false);
  const [value, setValue] = useKeyedState(stateKeys.textResponses, textResponses);

  const saveResponseMutation = useSaveResponse();

  const saveResponse = useCallback(() => {
    setIsDirty(false);
    return saveResponseMutation.mutateAsync({ textResponses: value });
  }, [setIsDirty, saveResponseMutation, value]);

  const onChange = useCallback((index) => (textResponse) => {
    setValue(oldResponses => {
      const out = [...oldResponses];
      out[index] = textResponse;
      return out;
    });
    setIsDirty(true);
  }, [setValue, setIsDirty]);

  return {
    textResponses: value,
    onUpdateTextResponse: onChange,
    isDraftSaved: saveResponseMutation.status === MutationStatus.success && !isDirty,
    saveResponse,
    saveResponseStatus: saveResponseMutation.status,
  };
};

export default useTextResponsesData;