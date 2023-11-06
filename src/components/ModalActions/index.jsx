import React from 'react';
import PropTypes from 'prop-types';

import { Button, StatefulButton } from '@edx/paragon';

import { MutationStatus } from 'data/services/lms/constants';
import useModalActionConfig from './useModalActionConfig';

const className = 'w-100';
const disabledStates = [MutationStatus.loading];

const ModalActions = ({ options }) => {
  const actions = useModalActionConfig({ options });
  const { primary, secondary } = actions || {};

  const actionButton = (variant, btnProps) => (btnProps.state
    ? <StatefulButton {...btnProps} {...{ className, disabledStates, variant }} />
    : <Button {...btnProps} {...{ className, variant }} />);

  return (
    <div>
      {secondary && actionButton('outline-primary', secondary)}
      {primary && actionButton('primary', primary)}
    </div>
  );
};
ModalActions.defaultProps = {
  options: {},
  step: null,
};
ModalActions.propTypes = {
  step: PropTypes.string,
  options: PropTypes.shape({
    save: PropTypes.func,
    saveStatus: PropTypes.string,
    submit: PropTypes.func,
    submitStatus: PropTypes.string,
  }),
};
export default ModalActions;
