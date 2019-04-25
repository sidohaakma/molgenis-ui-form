import uriGenerator from '@/util/helpers/uriGenerator'

describe('uriGenerator', () => {
  const uri = '/api/v2/tablename'
  const id = 'idAttr'
  const label = 'labelAttr'

  it('should generate an uri without query when there is no search string',
    () => {
      const search = null
      const result = uriGenerator.generateUri(search, uri, id, label)
      expect(result).to.equal(uri)
    })

  it('should generate an uri with like query when there is a search string',
    () => {
      const search = 'blaat'
      const result = uriGenerator.generateUri(search, uri, id, label)
      const expected = `${uri}?q=${id}=like=${search},${label}=like=${search}`
      expect(result).to.equal(expected)
    })

  it('should generate an uri with in query when there is a search array',
    () => {
      const search = ['blaat1', 'blaat2']
      const searchString = 'blaat1,blaat2'
      const result = uriGenerator.generateUri(search, uri, id, label)
      const expected = `${uri}?q=${id}=in=(${searchString}),${label}=in=(${searchString})`
      expect(result).to.equal(expected)
    })

  it('should generate an uri without query when there is an empty search array',
    () => {
      const search = []
      const result = uriGenerator.generateUri(search, uri, id, label)
      expect(result).to.equal(uri)
    })
})
