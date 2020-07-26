import {
  DefaultButton,
  IIconProps,
  PrimaryButton,
  SpinButton,
  Stack,
  TextField,
  Toggle,
} from '@fluentui/react';
import { Position } from 'office-ui-fabric-react/lib/utilities/positioning';
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import styles from './ConfigurationScreen.css';
import configurationService from './configurationService';

type ConfigurationProps = {
  onSave?: () => void;
  onCancel?: () => void;
};

export default function ConfigurationScreen(props: ConfigurationProps) {
  const { getConfig, saveConfig } = configurationService();
  const [showAdvanced, setShowAdvanced] = useState(false);
  const { handleSubmit, control, setValue } = useForm();

  const config = getConfig();

  const onSubmit = (data) => {
    saveConfig({
      lyrics: {
        directory: data.directory,
      },
      server: {
        http: {
          port:
            data.httpPort !== undefined
              ? parseInt(data.httpPort, 10)
              : undefined,
        },
        ws: {
          port:
            data.wsPort !== undefined ? parseInt(data.wsPort, 10) : undefined,
        },
      },
    });

    if (props.onSave !== undefined) {
      props.onSave();
    }
  };

  const onChange = () => {
    setShowAdvanced(!showAdvanced);
  };
  const saveButtonIconProps: IIconProps = {
    iconName: 'save',
  };

  return (
    <Stack className={styles.content}>
      <div className={styles.header}>Configuração</div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.row}>
          <Controller
            as={TextField}
            name="directory"
            label="Diretório de letras"
            defaultValue={config.lyrics.directory}
            control={control}
          />
        </div>
        <div className={styles.row}>
          <Toggle
            label="Ativar configurações avançadas"
            inlineLabel
            onChange={onChange}
          />
        </div>
        {showAdvanced && (
          <div>
            <div className={styles.header2}>Avançado</div>
            <div className={styles.row}>
              <Controller
                as={SpinButton}
                name="httpPort"
                min={999}
                max={9999}
                label="Porta HTTP"
                labelPosition={Position.top}
                defaultValue={config.server.http.port}
                onIncrement={(value) => {
                  setValue('httpPort', parseInt(value, 10) + 1);
                }}
                onDecrement={(value) => {
                  setValue('httpPort', parseInt(value, 10) - 1);
                }}
                control={control}
              />
            </div>
            <div className={styles.row}>
              <Controller
                as={SpinButton}
                name="wsPort"
                min={999}
                max={9999}
                label="Porta WebSocket"
                labelPosition={Position.top}
                defaultValue={config.server.ws.port}
                onIncrement={(value) => {
                  setValue('wsPort', parseInt(value, 10) + 1);
                }}
                onDecrement={(value) => {
                  setValue('wsPort', parseInt(value, 10) - 1);
                }}
                control={control}
              />
            </div>
          </div>
        )}
        <div className={styles.actionRow}>
          <DefaultButton
            text="Cancelar"
            onClick={() => props.onCancel && props.onCancel()}
          />
          <PrimaryButton
            type="submit"
            text="Salvar"
            iconProps={saveButtonIconProps}
          />
        </div>
      </form>
    </Stack>
  );
}
