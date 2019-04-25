// @flow

const generateUri = (
  search: ?string | ?Array<string>, uri: string, idAttribute: string,
  labelAttribute: string) => {
  if (search) {
    if (Array.isArray(search) && search.length > 0) {
      // Join array into a string
      const value = search.join(',')
      // Use =in= query
      uri = `${uri}?q=${idAttribute}=in=(${value}),${labelAttribute}=in=(${value})`
    } else if (typeof search === 'string') {
      const value = search
      uri = `${uri}?q=${idAttribute}=like=${value},${labelAttribute}=like=${value}`
    }
  }
  return uri
}

export default {
  generateUri
}
