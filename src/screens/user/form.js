export default {
  fields: {
    name: {
      label: 'NAME',
      error: null,
      value: '',
      defaultValue: '',
      required: true
    },
    accountType: {
      type: 'group',
      label: 'ACCOUNT TYPE',
      error: null,
      value: '',
      defaultValue: '',
      required: true,
      fields: {
        personal: {
          type: 'checkbox',
          label: 'Personal'
        },
        work: {
          type: 'checkbox',
          label: 'Work'
        }
      }
    },
    email: {
      label: 'EMAIL ID',
      error: null,
      value: '',
      defaultValue: '',
      required: true
    },
    password: {
      type: 'password',
      label: 'PASSWORD',
      error: null,
      value: '',
      defaultValue: '',
      required: true
    }
  }
}