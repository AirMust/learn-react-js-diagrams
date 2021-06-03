export const panel = {
  nodes: [
    {
      name: 'Cusom Node 1',
      ports: {
        '559b9c3e-9ec2-4fd4-bb1a-69c036f99d42': {
          name: 'Port1',
          formatData: 'number',
          isInput: false
        },
        '8fc5da74-09f0-4fd9-8728-9ca634b005ea': {
          name: 'Port2',
          formatData: 'stream',
          isInput: false
        },
        'd2c90dd7-3ad6-4cf1-8e90-4dca029ff2cd': {
          name: 'Port3',
          formatData: 'boolean',
          isInput: true
        },
        '9c4ae3f2-74d9-43df-896b-f161f3ad7717': {
          name: 'Port4',
          formatData: 'stream',
          isInput: false
        }
      }
    },
    {
      name: 'Cusom Node 2',
      ports: {
        'a6cfa947-d8bd-47a4-be30-6e0e728c2163': {
          name: 'Port1',
          formatData: 'number',
          isInput: true,
          required: false
        },
        '7a4a778c-7057-4bd9-89cc-befa18819674': {
          name: 'Port2',
          formatData: 'stream',
          isInput: true,
          required: false
        },
        '7a4a778c-7057-45d9-89cc-befa18819674': {
          name: 'Port3',
          formatData: 'stream',
          isInput: false,
          required: true
        }
      }
    },
    {
      name: 'Cusom Node 3',
      ports: {
        '26cfa947-d8bd-47a4-be30-6e0e728c2163': {
          name: 'Port1',
          formatData: 'number',
          isInput: true,
          required: true
        },
        '2a4a778c-7057-4bd9-89cc-befa18819674': {
          name: 'Port2FDSFSD',
          formatData: 'stream',
          isInput: true,
          required: true
        },
        '2a4a778c-7057-45d9-89cc-befa18819674': {
          name: 'Port3',
          formatData: 'stream',
          isInput: false,
          required: true
        }
      }
    }
  ],
  links: [
    {
      input: 'a6cfa947-d8bd-47a4-be30-6e0e728c2163',
      output: '559b9c3e-9ec2-4fd4-bb1a-69c036f99d42'
    },
    {
      input: '7a4a778c-7057-4bd9-89cc-befa18819674',
      output: '8fc5da74-09f0-4fd9-8728-9ca634b005ea'
    }
  ]
}
