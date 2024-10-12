export const formData = {
  ng: {
    Number: {
      id: 'Number',
      label: 'Number',
      placeholder: 'Float/int',
      type: 'number',
      validationType: 'number',
      value: '2.56',

      validations: [
        // {
        //   type: 'required',
        //   params: ['this field is required'],
        // },
        // {
        //   type: 'min',
        //   params: [5, 'name cannot be less than 5 characters'],
        // },
        // {
        //   type: 'max',
        //   params: [10, 'name cannot be more than 10 characters'],
        // },
      ],
    },
    String: {
      id: 'String',
      label: 'String',
      placeholder: 'String',
      type: 'string',
      validationType: 'string',
      value: 'something',
      validations: [
        // {
        //   type: 'required',
        //   params: ['this field is required'],
        // },
      ],
    },
    Code: {
      id: 'Code',
      label: 'Code',
      placeholder: 'Float/int',
      type: 'code',
      validationType: 'string',
      value: 'text = "Hello world!"\nprint(text)',
      validations: [
        // {
        //   type: 'required',
        //   params: ['this field is required'],
        // },
      ],
    },
    Selectable: {
      id: 'Selectable',
      label: 'Selectable',
      placeholder: 'Select',
      type: 'selectable',
      validationType: 'string',
      value: '',
      options: [
        { value: 1, label: '1' },
        { value: 2, label: '2' },
        { value: 3, label: '3' },
      ],
      validations: [
        {
          type: 'required',
          params: ['this field is required'],
        },
      ],
    },
  },
};
