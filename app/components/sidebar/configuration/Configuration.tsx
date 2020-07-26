import { IconButton, IIconProps, Stack, Modal } from '@fluentui/react';
import { useBoolean, useId } from '@uifabric/react-hooks';
import React, { CSSProperties } from 'react';
import styles from './Configuration.css';
import ConfigurationScreen from './configuration-screen/ConfigurationScreen';

const configIcon: IIconProps = {
  iconName: 'Settings',
};

const styleContentButton: CSSProperties = {
  position: 'absolute',
  bottom: '30px',
  right: '0px',
};

export default function Configuration() {
  const [isModalOpen, { setTrue: showModal, setFalse: hideModal }] = useBoolean(
    false
  );
  const titleId = useId('title');

  return (
    <div>
      <Stack style={styleContentButton}>
        <IconButton
          onClick={showModal}
          className={styles.configButton}
          iconProps={configIcon}
        />
      </Stack>
      <Modal
        titleAriaId={titleId}
        isOpen={isModalOpen}
        onDismiss={hideModal}
        isBlocking={false}
      >
        <ConfigurationScreen onSave={hideModal} onCancel={hideModal} />
      </Modal>
    </div>
  );
}
