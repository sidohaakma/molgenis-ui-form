import {isValidSchema} from '@/util/SchemaService'

describe('SchemaService', () => {
  describe('isValidSchema', () => {
    it('should return true if the schema is valid', () => {
      const validSchema = {
        fields: [{
          type: 'text',
          id: 'id1',
          label: 'label1',
          required: () => true,
          disabled: false,
          visible: () => true,
          validate: () => true
        }]
      }

      expect(isValidSchema(validSchema)).to.equal(true)
    })

    it('should throw an error if the schema is invalid', () => {
      const invalidSchema = {
        fields: [
          {
            type: 'text',
            id: 'id1',
            label: 'label1',
            required: () => true,
            disabled: false,
            visible: () => true,
            validate: () => true
          },
          {
            type: 'text',
            id: 'id1',
            label: 'otherLabel',
            required: () => true,
            disabled: false,
            visible: () => true,
            validate: () => true
          }]
      }

      const result = () => {
        isValidSchema(invalidSchema)
      }

      expect(result).to.throw('Identifiers for fields inside your schema must be unique!')
    })
  })
})
