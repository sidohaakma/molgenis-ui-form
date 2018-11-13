<a name="2.0.2"></a>
## 2.0.2
### Features
* Rename boolean i18 message keys to avoid clash with molgenis project
   - `form_bool_true` renamed to `form_boolean_true`
   - `form_bool_false` renamed to `form_boolean_false`
   - `form_bool_missing` renamed to `form_boolean_missing`

### Bugfixes
* [203 Hide all optional fields/show all fields not internationalized](https://github.com/molgenis/molgenis-ui-form/issues/203)
* [#233 Set the value to null on clearing a number field](https://github.com/molgenis/molgenis-ui-form/issues/233)
* [#226 Allow clearing of a date / date-time field](https://github.com/molgenis/molgenis-ui-form/issues/226)
* [#236 Age function is off by one year for future dates](https://github.com/molgenis/molgenis-ui-form/issues/236)

<a name="1.2.0"></a>
## 1.2.1 (18-10-2018)
### Bugfixes
* [#220 Molgenis alternative data format is seen as invalid](https://github.com/molgenis/molgenis-ui-form/issues/220)

<a name="1.2.0"></a>
## 1.2.0 (17-10-2018)
### Features
* Feature/map default entity values when mapping in create mode
   
### Bugfixes
* [#201 Selecting File does not trigger vue-from change detect](https://github.com/molgenis/molgenis-ui-form/issues/201)
* [#211 When using Safari browser Molgenis datatime format result is empty date picker ](https://github.com/molgenis/molgenis-ui-form/issues/211)

<a name="1.1.0"></a>
## 1.1.0 (24-09-2018)
### Features
* No features package version was set incorrectly 
### Bugfixes
* Changelog release date is now set

<a name="1.0.0"></a>
## 1.0.0 (24-09-2018)
### Features
* Add validation support for integer, long and decimal
    * Extend field type with 'integer', 'long' and 'decimal' types
    * Remove 'number' type ( ***breaking change***)
    * Add support for mapping int, long and decimal to EntityMapper
* Update dev/demo/e2e-test setup, add page per feature to improve development, debugging and e2e-test experience 
* Add showNonVisibleAttributes option to EntityMapper options 
    * If set to true maps non visible attribute to visible field
    * showNonVisibleAttributes is optional and defaults to false
    * If visible expression is set this takes precedence 
* Add support for unique field validation
    * string, integer, long, decimal and radio fields support unique value validation
    * Molgenis entity mapper support creating isUnique function for form multi-value attributes 

### Bugfixes
* #166 Date-time cannot be processed by MOLGENIS
* #195 Date field emits date-time even if only date part is set 
* #189 Vulnerability vue-form depends on extend 3.0.1
* #185 Vue forms require you to fill in the id field when it's AUTO    
       

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
