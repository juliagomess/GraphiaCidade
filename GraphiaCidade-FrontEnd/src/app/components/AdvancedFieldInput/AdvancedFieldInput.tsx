import React from 'react';

import AdvancedAutoComplete from '~/components/AdvancedAutoComplete/AdvancedAutoComplete';
import AdvancedCheckbox from '~/components/AdvancedCheckbox/AdvancedCheckbox';
import AdvancedInput from '~/components/AdvancedInput/AdvancedInput';
import AdvancedSelect from '~/components/AdvancedSelect/AdvancedSelect';

interface IProps {
  type: 'autocomplete' | 'input' | 'select' | 'checkbox';
}

const AdvancedFieldInput: React.FC<IProps> = (props: IProps) => {
  return (
    <>
      {props.type === 'autocomplete' && <AdvancedAutoComplete {...props} />}
      {props.type === 'input' && <AdvancedInput {...props} />}
      {props.type === 'select' && <AdvancedSelect {...props} />}
      {props.type === 'checkbox' && <AdvancedCheckbox {...props} />}
    </>
  );
};

export default AdvancedFieldInput;
