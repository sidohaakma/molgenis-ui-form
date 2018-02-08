import isCompoundVisible from '../../../../../src/util/helpers/isCompoundVisible'

describe('Test isCompoundVisible', () => {
  it('should hide a field-group if all children are hidden', () => {
    const field = {
      type: 'field-group',
      visible: () => true,
      children: [
        {
          type: 'text',
          visible: () => false
        }
      ]
    }

    const data = {}
    const actual = isCompoundVisible(field, data)
    const expected = false

    expect(actual).to.equal(expected)
  })

  it('should show a field-group if one child is visible', () => {
    const field = {
      type: 'field-group',
      visible: () => true,
      children: [
        {
          type: 'text',
          visible: () => false
        },
        {
          type: 'text',
          visible: () => true
        }
      ]
    }

    const data = {}
    const actual = isCompoundVisible(field, data)
    const expected = true

    expect(actual).to.equal(expected)
  })

  it('should show a field-group if a nested field-group is hidden', () => {
    const field = {
      type: 'field-group',
      visible: () => true,
      children: [
        {
          type: 'text',
          visible: () => true
        },
        {
          type: 'field-group',
          visible: () => true,
          children: [
            {
              type: 'text',
              visible: () => false
            }
          ]
        }
      ]
    }

    const data = {}
    const actual = isCompoundVisible(field, data)
    const expected = true

    expect(actual).to.equal(expected)
  })

  it('should hide a field-group if a nested field-group is hidden', () => {
    const field = {
      type: 'field-group',
      visible: () => true,
      children: [
        {
          type: 'text',
          visible: () => false
        },
        {
          type: 'field-group',
          visible: () => true,
          children: [
            {
              type: 'text',
              visible: () => false
            }
          ]
        }
      ]
    }

    const data = {}
    const actual = isCompoundVisible(field, data)
    const expected = false

    expect(actual).to.equal(expected)
  })
})
