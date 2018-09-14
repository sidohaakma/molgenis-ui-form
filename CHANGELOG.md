<a name="1.0.0"></a>
## 1.0.0 (??-??-????)
* Add validation support for integer, long and decimal
    * Extend field type with 'integer', 'long' and 'decimal' types
    * Remove 'number' type ( ***breaking change***)
    * Add support for mapping int, long and decimal to EntityMapper
* Update dev/demo/e2e-test setup, add page per feature to improve development, debugging and e2e-test experience 
       

<a name="0.12.0"></a>
## 0.12.0 (13-09-2018)
* EntityMapper: Add entityMapper option to run entityMapper in "update" or 'create' mode.
    * In create mode readonly attributes map to editable fields to allow creating row.
    * By default the mapper is run in 'update' mode (ensures backwards compatibility).
* EntityMapper: Non visible, auto-value attributes are not mapped to from fields
    * These fields can not be read or written by the user and therefore not part of the form.
       

<a name="0.11.4"></a>
## 0.11.4 (02-08-2018)
* Updated peer dependency to remove warnings from build

<a name="0.11.2"></a>
## 0.11.2 (02-07-2018)
* Fix issue ,no options in mref not displayed correctly

<a name="0.11.1"></a>
## 0.11.1 (02-07-2018)
* localize datepicker

<a name="0.11.0"></a>
## 0.11.0 (28-06-2018)
* add debounce on input and textarea type

<a name="0.10.3"></a>
## 0.10.3 (02-05-2018)
* Fix issue 82, Multi select validation does not trigger on input  
* Debounce input update event ( default 500 ms), can be changed through settings ('inputDebounceTime')

<a name="0.10.2"></a>
## 0.10.2 (18-04-2018)
* Add 'mg-ui-form-field' to generated fields, this allows app css to target fields for styling. 

<a name="0.10.1"></a>
## 0.10.1 (16-04-2018)
* fix issue with multiple namespaces ( not working with ie11)

<a name="0.10.0"></a>

<a name="0.1.0"></a>
## 0.10.0 (13-04-2018)
* Make ability to add new option to select configurable 
* Update for use with multiple namespaces, form uses the 'ui-form' namespace 
* Fix select styling

<a name="0.9.12"></a>
## pre 0.10.0 (13-04-2018)
* Render html form with validation based on json object structure
* Molgenis entity to form-object mapper
