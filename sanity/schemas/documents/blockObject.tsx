export default {
  name: 'blockObject',
  title: 'Block Object',
  type: 'object',
  fields: [
    {
      title: 'Block Text',
      name: 'blockText',
      type: 'array',
      of: [{ type: 'block' }],
    },
  ],
}
