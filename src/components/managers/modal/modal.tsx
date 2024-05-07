import { Modal, Paper, Stack } from '@mui/material';
import Form from '@rjsf/core';
import { RJSFSchema, UiSchema } from '@rjsf/utils';
import validator from '@rjsf/validator-ajv8';
import { create } from 'react-modal-promise';
import { v4 as uuid } from 'uuid';

const schema: RJSFSchema = {
  title: 'Todo',
  type: 'object',
  required: ['title'],
  properties: {
    title: {
      type: 'string',
      title: 'Neuron group name',
      default: 'ng-' + uuid().slice(0, 4),
    },
    isExc: { type: 'boolean', title: 'is excitatory?', default: false },
  },
};

const uiSchema: UiSchema = {
  'ui:submitButtonOptions': {
    submitText: 'Add',
  },
};

const log = (prefix: string) => console.log.bind(console, prefix);

// todo: resolve type issue
function ModalManager({
  isOpen,
  onResolve,
  onReject,
  ..._props
}: {
  isOpen: boolean;
  onResolve: (data: unknown) => void;
  onReject: () => void;
}) {
  return (
    <Modal open={isOpen} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClose={onReject}>
      <Paper sx={{ width: 450, height: '60vh', py: 1.5, px: 2 }}>
        <Stack>
          <button onClick={onReject}>❌</button>
          <Form
            schema={schema}
            uiSchema={uiSchema}
            validator={validator}
            onChange={log('changed')}
            onError={log('errors')}
            onSubmit={data => {
              onResolve({ thing: 'Æ', props: data.formData });
              log('submitted')(data);
            }}
          />
        </Stack>
      </Paper>
    </Modal>
  );
}

export const modalManager = create(ModalManager);
